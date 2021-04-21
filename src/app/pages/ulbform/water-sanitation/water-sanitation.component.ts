import { Component, OnInit } from '@angular/core';

import { UploadPlansService } from 'src/app/pages/ulbform/water-sanitation/upload-plans.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-water-sanitation',
  templateUrl: './water-sanitation.component.html',
  styleUrls: ['./water-sanitation.component.scss']
})
export class WaterSanitationComponent implements OnInit {

  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};

  fileProcessingTracker: {
    [fileIndex: number]: {
      status: "in-process" | "completed" | "FAILED";
      message: string;
    };
  } = {};
  filesToUpload: Array<File> = [];

  constructor(private formBuilder: FormBuilder,
    private dataEntryService: DataEntryService) { }

  ngOnInit(): void {


  }
//   uploadFile(file: File, fileIndex: number) {
//     this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
//       (s3Response) => {
//         const fileAlias = s3Response["data"][0]["file_alias"];
//         const s3URL = s3Response["data"][0].url;
//         this.uploadFileToS3(
//           file,
//           s3URL,
//           fileAlias,
//          this.bulkEntryForm.get("year").value,
//          fileIndex
//         );
//       },
//       (err) => {
//         if (!this.fileUploadTracker[fileIndex]) {
//           this.fileUploadTracker[fileIndex] = {
//             status: "FAILED",
//           };
//         } else {
//           this.fileUploadTracker[fileIndex].status = "FAILED";
//         }
//       }
//     );
//   }
//   private uploadFileToS3(
//     file: File,
//     s3URL: string,
//     fileAlias: string,
//     financialYear: string,
//     fileIndex: number
//   ) {
//     this.dataEntryService
//       .uploadFileToS3(file, s3URL)
//       // Currently we are not tracking file upload progress. If it is need, uncomment the below code.
//       // .pipe(
//       //   map((response: HttpEvent<any>) =>
//       //     this.logUploadProgess(response, file, fileAlias, fileIndex)
//       //   )
//       // )
//       .subscribe(
//         (res) => {
//           if (res.type === HttpEventType.Response) {
//             this.dataEntryService
//               .sendUploadFileForProcessing(fileAlias, financialYear)
//               .subscribe((res) => {
//              //   this.startFileProcessTracking(
//                   file,
//                   res["data"]["_id"],
//                   fileIndex
//                 );
//               });
//           }
//         },
//         (err) => {
//           this.fileUploadTracker[fileIndex].status = "FAILED";
//         }
//       );
//   }

  fileChangeEvent(fileInput: Event) {
//     this.resetFileTracker();
//     const filesSelected = <Array<File>>fileInput.target["files"];
//     this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
  }
//   resetFileTracker() {
//     this.filesToUpload = [];
//    // this.filesAlreadyInProcess = [];
//     this.fileProcessingTracker = {};
//    // this.submitted = false;
//     this.fileUploadTracker = {};
//   }
//   filterInvalidFilesForUpload(filesSelected: File[]) {
//     const validFiles = [];
//     for (let i = 0; i < filesSelected.length; i++) {
//       const file = filesSelected[i];
//       const fileExtension = file.name.split(`.`).pop();
//       if (fileExtension === "pdf") {
//         validFiles.push(file);
//       }
//     }
//     return validFiles;
//   }
// }


}
