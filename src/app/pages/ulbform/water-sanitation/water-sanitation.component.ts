import { Component, OnInit } from '@angular/core';

import { UploadPlansService } from 'src/app/pages/ulbform/water-sanitation/upload-plans.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-water-sanitation',
  templateUrl: './water-sanitation.component.html',
  styleUrls: ['./water-sanitation.component.scss']
})
export class WaterSanitationComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileName;
  fileInfos?: Observable<any>;

  constructor(private uploadService: UploadPlansService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();

  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
    this.upload();
  }
  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
        this.fileName = file.name;
      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

}
