import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface SignedUrlApiResponse {
    success: boolean;
    message: string;
    data?: {
        signedUrl?: string;
    };
}

interface CacheEntry {
    expiresAt: number;
    value$: Observable<string>;
}

@Injectable({
    providedIn: 'root'
})
export class S3Service {
    // Keep this lower than backend expiry (backend = 3600s here)
    private readonly cacheTtlMs = 55 * 60 * 1000;
    private readonly signedUrlCache = new Map<string, CacheEntry>();

    constructor(private http: HttpClient) { }

    getSignedUrl(filePath: string): Observable<string> {
        const path = (filePath || '').trim();
        if (!path) return of('');

        if (this.isAbsoluteHttpsUrl(path)) {
            return of(path);
        }

        const now = Date.now();
        const cached = this.signedUrlCache.get(path);

        if (cached && cached.expiresAt > now) {
            return cached.value$;
        }

        // Replace with your real API endpoint + payload shape
        const request$ = this.http
            .post<SignedUrlApiResponse>(`${environment.api.url}get-signed-url`, { fileUrl: path })
            .pipe(
                map((res) => res?.data?.signedUrl?.trim() || ''),
                catchError(() => of('')),
                shareReplay(1)
            );

        this.signedUrlCache.set(path, {
            expiresAt: now + this.cacheTtlMs,
            value$: request$
        });

        return request$;
    }

    private isAbsoluteHttpsUrl(value: string): boolean {
        try {
            const url = new URL(value);
            return url.protocol === 'https:';
        } catch {
            return false;
        }
    }
}