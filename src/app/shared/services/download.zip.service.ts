import {
    HttpClient,
    HttpEvent,
    HttpEventType,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import JSZip from 'jszip';

export class DownloadModel {
    url: string = '';
    // fileSize: number = 0;
    name: string = '';
}

export interface DownloadStatus<T> {
    progress: number;
    state: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'SENT';
    body: T | null;
    httpEvent: HttpEvent<unknown> | null;
    downloadModel: DownloadModel;
}

export interface ZipStatus<T> {
    progress: number;
    state: 'PENDING' | 'DOWNLOADING' | 'DOWNLOADED' | 'ZIPPING' | 'DONE';
    body: {
        downloadModel: DownloadModel,
        downloaded: Blob | null
    }[];
    zipFile: Blob | null;
    httpEvent: HttpEvent<unknown> | null;
}

@Injectable({ providedIn: 'root' })
export class DownloadService {
    constructor(private httpClient: HttpClient) {
    }

    public downloadMultiple(downloadLinks: DownloadModel[]): Observable<DownloadStatus<Blob>[]> {
        return combineLatest(downloadLinks.map((downloadModel): Observable<DownloadStatus<Blob>> => {
            return this.httpClient.get(downloadModel.url, {
                reportProgress: true,
                observe: 'events',
                responseType: 'blob'
            }).pipe(
                scan((uploadStatus: DownloadStatus<Blob>, httpEvent: HttpEvent<Blob>, index: number): DownloadStatus<Blob> => {
                    if (this.isHttpResponse(httpEvent)) {

                        return {
                            progress: 100,
                            state: 'DONE',
                            body: httpEvent.body,
                            httpEvent,
                            downloadModel
                        };
                    }

                    if (this.isHttpSent(httpEvent)) {

                        return {
                            progress: 0,
                            state: 'PENDING',
                            body: null,
                            httpEvent,
                            downloadModel

                        };
                    }

                    if (this.isHttpUserEvent(httpEvent)) {

                        return {
                            progress: 0,
                            state: 'PENDING',
                            body: null,
                            httpEvent,
                            downloadModel
                        };
                    }

                    if (this.isHttpHeaderResponse(httpEvent)) {

                        return {
                            progress: 0,
                            state: 'PENDING',
                            body: null,
                            httpEvent,
                            downloadModel
                        };
                    }

                    if (this.isHttpProgressEvent(httpEvent)) {

                        return {
                            progress: 0,
                            // progress: Math.round((100 * httpEvent.loaded) / downloadModel.fileSize),
                            state: 'IN_PROGRESS',
                            httpEvent,
                            body: null,
                            downloadModel
                        };
                    }


                    console.log(httpEvent);

                    throw new Error('unknown HttpEvent');

                }, { state: 'PENDING', progress: 0, body: null, httpEvent: null } as DownloadStatus<Blob>));
        }
        )
        );

    }

    zipMultiple(downloadMultiple: Observable<DownloadStatus<Blob>[]>): Observable<ZipStatus<Blob>> {

        return new Observable<ZipStatus<Blob>>(((subscriber) => {

            downloadMultiple.pipe(
                scan((uploadStatus: ZipStatus<Blob>, httpEvent: DownloadStatus<Blob>[], index: number): ZipStatus<Blob> => {
                    if (httpEvent.some((x) => x.state === 'SENT')) {
                        return {
                            state: 'PENDING',
                            body: [],
                            httpEvent: null,
                            progress: httpEvent.reduce((prev, curr) => prev + curr.progress, 0) / httpEvent.length / 2,
                            zipFile: null
                        };
                    }
                    if (httpEvent.some((x) => x.state === 'PENDING')) {
                        return {
                            state: 'PENDING',
                            body: [],
                            httpEvent: null,
                            progress: httpEvent.reduce((prev, curr) => prev + curr.progress, 0) / httpEvent.length / 2,
                            zipFile: null
                        };
                    }

                    if (httpEvent.some((x) => x.state === 'IN_PROGRESS')) {
                        return {
                            state: 'DOWNLOADING',
                            body: [],
                            httpEvent: null,
                            progress: httpEvent.reduce((prev, curr) => prev + curr.progress, 0) / httpEvent.length / 2,
                            zipFile: null
                        };
                    }

                    if (httpEvent.every((x) => x.state === 'DONE')) {
                        return {
                            state: 'DOWNLOADED',
                            body: httpEvent.map(x => {
                                return {
                                    downloadModel: x.downloadModel,
                                    downloaded: x.body
                                };
                            }),
                            httpEvent: null,
                            progress: 50,
                            zipFile: null
                        };
                    }

                    throw new Error('ZipStatus<Blob> unhandled switch case');

                }, { state: 'PENDING', progress: 0, body: [], httpEvent: null, zipFile: null } as ZipStatus<Blob>)
            ).subscribe({
                next: (zipStatus) => {
                    if (zipStatus.state !== 'DOWNLOADED') {
                        subscriber.next(zipStatus);
                    } else {
                        this.zip(zipStatus.body.map(x => {
                            return {
                                fileData: x.downloaded as Blob,
                                fileName: x.downloadModel.name
                            };
                        })).subscribe({
                            next: (data) => {
                                // console.log('zipping next');
                                subscriber.next(data);
                            },
                            complete: () => {
                                // console.log('zipping complete');
                                subscriber.complete();
                            },
                            error: (error) => {
                                console.log('zipping error');

                            }
                        });

                    }
                },
                complete: () => {
                    console.log('zip$ source complete: ');

                },
                error: (error) => {
                    console.log('zip$ source error: ', error);
                }
            });


        }));

    }

    private zip(files: { fileName: string, fileData: Blob }[]): Observable<ZipStatus<Blob>> {
        return new Observable((subscriber) => {
            const zip = new JSZip();

            files.forEach(fileModel => {
                zip.file(fileModel.fileName, fileModel.fileData);
            });

            zip.generateAsync({ type: "blob", streamFiles: true }, (metadata) => {
                subscriber.next({
                    state: 'ZIPPING',
                    body: [],
                    httpEvent: null,
                    progress: Math.trunc(metadata.percent / 2) + 50,
                    zipFile: null
                });

            }).then(function (content) {
                subscriber.next({
                    state: 'DONE',
                    body: [],
                    httpEvent: null,
                    progress: 100,
                    zipFile: content
                });

                subscriber.complete();
            });
        });
    }

    private isHttpSent<T>(event: HttpEvent<T>): event is HttpResponse<T> {
        return event.type === HttpEventType.Sent;
    }

    private isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
        return event.type === HttpEventType.Response;
    }


    private isHttpHeaderResponse<T>(event: HttpEvent<T>): event is HttpHeaderResponse {
        return event.type === HttpEventType.ResponseHeader;
    }


    private isHttpUserEvent<T>(event: HttpEvent<T>): event is HttpUserEvent<T> {
        return event.type === HttpEventType.User;
    }

    private isHttpProgressEvent(event: HttpEvent<Blob>): event is HttpProgressEvent {
        return (
            event.type === HttpEventType.DownloadProgress ||
            event.type === HttpEventType.UploadProgress
        );
    }
}