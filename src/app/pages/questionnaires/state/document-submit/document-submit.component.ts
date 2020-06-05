import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';

import { IQuestionnaireDocumentsCollection } from '../../model/document-collection.interface';

type fileKeys = keyof IQuestionnaireDocumentsCollection;
type userSelectedFile = {
  [key in fileKeys]?: FileList;
};

type emitValue = { [key in fileKeys]?: { name: string; url: string }[] };
@Component({
  selector: "app-document-submit",
  templateUrl: "./document-submit.component.html",
  styleUrls: ["./document-submit.component.scss"],
})
export class DocumentSubmitComponent implements OnInit {
  @Input()
  documents: IQuestionnaireDocumentsCollection;

  @Output()
  outputValues = new EventEmitter<emitValue>();

  @Output()
  previous = new EventEmitter<boolean>();
  userSelectedFiles: userSelectedFile = {};

  fileUploadTracker: {
    fileNameWithQuestionID?: string;
    percentage?: number;
    status?: string;
  } = {};

  uploadInProgress = false;

  questions = [
    {
      key: "State_Acts_Doc",
      question:
        "Latest copy of the State Municipal Corporation Act and State Municipalities Act",
    },
    {
      key: "State_Amendments_Doc",
      question:
        "Any notified amendments to the State Municipal Corporation Act and/or State Municipalities Act pertaining to provisions of the property tax and/or user charges",
    },
    {
      key: "City_Acts_Doc",
      question:
        "Any individual city wise Municipal Corporation Acts or Municipalities Acts",
    },
    {
      key: "State_Rules_Doc",
      question:
        "Latest copy of the State Municipal Corporation Act and State Municipalities Act",
    },
    {
      key: "City_Amendments_Doc",
      question:
        "Latest copy of the State Municipal Corporation Act and State Municipalities Act",
    },
  ];

  fileExnetsionAllowed = ["pdf", "ppt", "docx", "xlsx"];

  defaultDailogConfiuration: IDialogConfiguration = {
    message:
      "This is the last step. After uploading, You will not be allowed to change any answer. <br>Do you want to continue?",
    buttons: {
      confirm: {
        text: "Yes",
        callback: () => {
          this.startUpload();
          this._dialog.closeAll();
        },
      },
      cancel: { text: "NO" },
    },
  };
  defaultErrorMessageConfiguration: IDialogConfiguration = {
    message: "You need to upload atleast 1 file for the mandatory question.",
    buttons: {
      cancel: { text: "OK" },
    },
  };

  fileUploadCompleted = false;

  constructor(
    private dataEntryService: DataEntryService,
    private _dialog: MatDialog
  ) {}

  ngOnInit() {}

  onUploadButtonClick() {
    if (!this.hasUploadedMandatoryFile()) {
      return this.showErrorDialog();
    }

    this.showconfirmationDialog();
  }

  showconfirmationDialog() {
    const dailogboxx = this._dialog.open(DialogComponent, {
      data: this.defaultDailogConfiuration,
    });
  }

  showErrorDialog() {
    const dailogboxx = this._dialog.open(DialogComponent, {
      data: this.defaultErrorMessageConfiguration,
    });
  }

  startUpload() {
    const subscription: Observable<any>[] = [];
    const valueToEmit: emitValue = {};
    this.uploadInProgress = true;

    Object.keys(this.userSelectedFiles).forEach((fieldKey: fileKeys) => {
      const files = <FileList>this.userSelectedFiles[fieldKey];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        /**
         *  Keep all the subscription so that we can get notification when all the files are uploaded,
         *  and proceed further
         */
        const subs = this.dataEntryService
          .getURLForFileUpload(file.name, file.type)
          .pipe(
            map((res) => {
              const url = res["data"][0].url;
              if (valueToEmit[fieldKey]) {
                valueToEmit[fieldKey] = [
                  ...valueToEmit[fieldKey],
                  { name: file.name, url: res["data"][0].file_alias },
                ];
              } else {
                valueToEmit[fieldKey] = [
                  { name: file.name, url: res["data"][0].file_alias },
                ];
              }
              return url;
            }),
            switchMap((url) =>
              this.uploadFileToS3(file, url, `${file.name}_${fieldKey}`)
            )
          );
        subscription.push(subs);
      }
    });

    // After all the files are uploaded. Emit the values
    forkJoin(subscription).subscribe((res) => {
      this.fileUploadCompleted = true;
      this.uploadInProgress = false;
      this.outputValues.emit(valueToEmit);
    });
  }

  private uploadFileToS3(file: File, s3URL: string, fileID: string) {
    return this.dataEntryService.uploadFileToS3(file, s3URL).pipe(
      map((response: HttpEvent<any>) => {
        return this.logUploadProgess(response, fileID);
      })
    );
  }

  private logUploadProgess(event: HttpEvent<any>, fileAlias: string) {
    if (event.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round((100 * event.loaded) / event.total);
      this.fileUploadTracker[fileAlias] = {
        percentage: percentDone,
        fileNameWithQuestionID: fileAlias,
        status: percentDone < 100 ? "in-process" : "completed",
      };
    }
    return event;
  }

  fileChangeEvent(event: Event, key: fileKeys) {
    console.log(event.target["files"]);

    this.userSelectedFiles[key] = <any>(
      this.filterInvalidFiles(event.target["files"])
    );
    console.log(this.userSelectedFiles);
  }

  filterInvalidFiles(list: FileList) {
    const newList: File[] = [];
    for (let index = 0; index < list.length; index++) {
      const file = list[index];
      if (this.isValidFile(file) && index < 10) {
        newList.push(file);
      }
    }
    return newList;
  }

  private hasUploadedMandatoryFile() {
    return (
      this.userSelectedFiles.State_Acts_Doc &&
      this.userSelectedFiles.State_Acts_Doc.length
    );
  }

  private isValidFile(file: File) {
    const fileExtends = file.name.split(".").pop();
    console.log(
      file.name,
      fileExtends,
      this.fileExnetsionAllowed.includes(fileExtends)
    );

    return this.fileExnetsionAllowed.includes(fileExtends);
  }
}
