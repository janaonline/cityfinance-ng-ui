import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  Optional,
  Inject,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../snack-bar/snack-bar.component";
import { FileUploadService } from "./file-upload-services/file-upload.service";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent implements OnInit {
  @ViewChild("fileDropRef") fileDropRef: any;
  // @Input() parentForm: FormGroup;
  // fileUploadId: any;
  public files: File[] = [];
  @Input() fileList: any = []; // old files to show pre selected.
  // @Input() type: string;
  @Input() acceptableType: string = ""; //acceptable type for input tag;
  @Input() multipleSelection: boolean = false; // allow multi select or not;
  @Input() maxFileUpload: Number | undefined; // Max number of file can be uploaded;
  @Input() allowedFileTypes: string[] = []; //first check point. file type in ts;
  @Input() checkType: boolean = false; // validation;
  @Input() template: "dragdrop" | "browse" = "dragdrop"; // template type;
  @Input() maxFileSize = 10490000; // max file size allowed (default 10 MB);
  
  @Output() afterSelectionMethod: EventEmitter<any> = new EventEmitter<any>();


  selectedUrl: string = "";
  imageUrl: any = "";
  mimeType: string = "";
  isProgress = false;
  project_name = sessionStorage.getItem("project_name");
  allImageTypeFileNotExistMsg = "Only Image type file allowed";
  isFileUploaded = false;

  fileProgress: any = {};

  iconList = [
    { type: "xlsx", icon: "fa fa-file-excel-o" },
    { type: "xls", icon: "fa fa-file-excel-o" },
    { type: "pdf", icon: "fa fa-file-pdf-o" },
    { type: "image", icon: "fa fa-file-image-o" },
    { type: "zip", icon: "fa fa-file-zip-o" },
  ];

  constructor(
    private _snackBar: MatSnackBar,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit() {
    console.log("here", this.fileList);
    if (
      !this.template ||
      (this.template != "dragdrop" && this.template != "browse")
    ) {
      this.template = "dragdrop";
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("filechanges", changes)
    this.fileList = [];
    if (
      changes.fileList &&
      changes.fileList &&
      changes.fileList.currentValue &&
      changes.fileList.currentValue[0]
    ) {
      this.mimeType = "";
      this.fileList = JSON.parse(JSON.stringify(changes.fileList.currentValue));
      this.fileList.forEach((el: any) => {
        el[`display`] = true;
      });
      this.imageUrl =
        changes.fileList.currentValue.length &&
        changes.fileList.currentValue[0].url;
      let mimeType =
        changes.fileList.currentValue[0].length &&
        changes.fileList.currentValue[0].hasOwnProperty("type")
          ? changes.fileList.currentValue[0].type
          : changes.fileList.currentValue[0].mimeType
          ? changes.fileList.currentValue[0].mimeType
          : changes.fileList.currentValue[0].mime;
      if (mimeType.match(/image\/*/) != null) {
        this.mimeType = "image";
      }
      // this.preview(changes.fileList.currentValue)
      // this.isProgress = false
    }
  }

  selectFile() {
    let element = document.getElementById("filedrag");
    return element && element.click();
  }

  sendFileForUploading(f: any) {
    if (f.length) {
      //this.fileList = [];
      this._snackBar.open(f.length + " File(s) selected!", undefined, {
        duration: 2000,
      });
      for (const item of f) {
        item.mime = item.type;
        // this.fileList = [item]
        this.uploadImage([item]);
        this.preview([item]);
        this.fileUploadService.afterMethodFileSelect.next([item]);
        this.files = [item];
      }
    }
    this.fileList.map((m: any) => this.files.push(m));
    console.log("this.fileList", this.fileList);
    console.log("after uploading files", f, this.fileList, this.files);
  }

  onFilesChange(f: any) {
    if(f.files){
      f = f.files;
    }
    if (
      this.maxFileUpload &&
      (this.fileList && this.fileList.length + f.length) > this.maxFileUpload
    ) {
      this.openSnackBar([`Maximum ${this.maxFileUpload} files could be uploaded`], 3000);
      return;
    }

    if (!this.multipleSelection) {
      f = [f[0]];
    }
    let prepareFileList = [];
    for (const item of f) {
      prepareFileList.push(item);
    }
    let allImageTypeExist = prepareFileList.every((item) =>
      item.type.includes("image")
    );
    if (this.acceptableType == "image/*") {
      if (allImageTypeExist) {
        this.sendFileForUploading(f);
      } else {
        this.openSnackBar([this.allImageTypeFileNotExistMsg], 3000);
      }
    } else if (this.checkType) {
      let accepted = prepareFileList.every((item) =>
        this.allowedFileTypes.includes(item.type)
      );
      console.log("accepted", accepted);
      if (accepted) {
        this.sendFileForUploading(f);
      } else {
        this.openSnackBar([`Selected file type is not allowed`], 3000);
      }
    } else {
      this.sendFileForUploading(f);
    }
  }

  deleteFile(index: any) {
    this.fileList.splice(index, 1);
    this.files = this.fileList;
    let defaultFileName = "";
    let defaultFileType = "";
    if (this.fileList && this.fileList.length) {
      defaultFileName = this.fileList[0].name;
      defaultFileType = this.fileList[0].type;
    }
    this._snackBar.open("File was deleted!", undefined, {
      duration: 2000,
    });
    this.fileDropRef.nativeElement.value = "";
    this.afterSelectionMethod.emit({
      url: this.selectedUrl,
      name: defaultFileName,
      mime: defaultFileType,
      fileList: this.fileList,
    });
  }

  preview(files: any) {
    this.mimeType = "";
    if (files.length === 0) return;
    var mimeType = files[0].hasOwnProperty("type") ? files[0].type : files[0].mimeType ? files[0].mimeType : files[0].mime;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    // this.imageUrl = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.mimeType = "image";
      this.imageUrl = reader.result;
    };
  }

  getFileExtension(file: any) {
    let type = "";
    if (file.hasOwnProperty("type")) {
      type = file.type;
    } else if (file.hasOwnProperty("mimeType")) {
      type = file.mimeType;
    } else {
      type = file.mime;
    }

    let ext = type.split("/")[0];
    if (ext != "image") ext = type.split("/")[1];
    let obj = this.iconList.filter((row:any) => {
      if (row.type === ext) {
        return true;
      }
      return false;
    });
    if (obj.length > 0) {
      let icon = obj[0].icon;
      return icon;
    } else {
      return "fa fa-file-alt";
    }
  }

  checkFileType(files:any) {
    // console.log("erre",files)
    if (files.length === 0)
      return;

    var mimeType = files[0].hasOwnProperty('type') ? files[0].type : files[0].mimeType ? files[0].mimeType : files[0].mime;
    if (mimeType.match(/image\/*/)) {
      return true;
    }
  }

  uploadImage(files: any) {
    // this.openSnackBar(['Updating Form Icon..'], 5000);
    this.isFileUploaded = true;
    // this._snackBar.open(`Uploading File...`);
    let image: any = {
      type: files[0].type,
      fileName: files[0].name,
      file: files[0],
    };
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = (_event) => {
      image["imageUrl"] = reader.result;
    };
    this.setDocuments(image);
  }

  async setDocuments(imgObject: any) {
    try {
      console.log("imgObject", imgObject);
      // this.isProgress = true;
      const custom = true;
      const label = `${imgObject.fileName}`;
      imgObject["name"] = label.replace(/ /g, "_");
      let response = await this.fileUploadService.uploadDataTos3(
        imgObject.name,
        imgObject.type,
        custom,
        label,
        imgObject.file.size,
        {},
        this.maxFileSize
      );
      console.log("response", response);
      if (response && response["success"]) {
        this.isProgress = true;
        this.selectedUrl = response["data"][0]["file_url"];
        imgObject["selectedUrl"] = this.selectedUrl;
        imgObject["url"] = this.selectedUrl;
        imgObject[`fileId`] = response.fileId;
        imgObject[`mimeType`] = imgObject.type;
        imgObject[`display`] = false;
        this.fileList.push(imgObject);
        let fileId = imgObject.fileId;
        try {
          this.fileDropRef.nativeElement.value = "";
          let imageResponse;
          this.fileProgress[fileId] = { subscription: {}, progress: null };
          this.fileProgress[fileId].subscription = this.fileUploadService
            .uploadFileUrl(response["data"][0]["url"], imgObject.file, fileId)
            .subscribe(
              (next: any) => {
                console.log(fileId, next);
                this.fileProgress[fileId].progress = next && next.progress;
                if (next && next.success) {
                  let index = this.fileList.findIndex(
                    (el: any) => el.fileId == fileId
                  );
                  if (index > -1) {
                    this.fileList[index][`display`] = true;
                  }
                  this.fileProgress[fileId] = undefined;
                  this.afterSelectionMethod.emit({
                    url: this.selectedUrl,
                    name: imgObject.name,
                    mime: imgObject.type,
                    fileList: this.fileList,
                  });
                }
              },
              (error: any) => {
                console.log(error);
                let message = "Error occurred while uploading file";
                this.fileProgress[fileId] = undefined;
                let index = this.fileList.findIndex(
                  (el:any) => el.fileId == error.fileId
                );
                if (index > -1) {
                  this.fileList[index][`error`] = true;
                  this.fileList[index][`display`] = true;
                }
                this.openSnackBar([message], 3000);
              }
            );
          this.isProgress = false;
          console.log("imageResponse", imageResponse);
          this.selectedUrl = response["data"][0]["file_url"];
          console.log("ffff", this.selectedUrl, imgObject);
          this.isFileUploaded = false;
          this._snackBar.dismiss();
        } catch (e) {
          this.fileDropRef.nativeElement.value = "";
          this.isFileUploaded = false;
          this.isProgress = false;
          let error: any = e ? e : "Unable to save image";
          this.openSnackBar([error], 3000);
          console.error(e);
        }
      } else {
        this.fileDropRef.nativeElement.value = "";
        this.isFileUploaded = false;
        this.isProgress = false;
      }
    } catch (e) {
      this.fileDropRef.nativeElement.value = "";
      this.isFileUploaded = false;
      this.isProgress = false;
      let error: any = e ? e : "Unable to save image";
      this.openSnackBar([error], 3000);
    }
  }

  cancelUpload(fileId: any) {
    console.log(fileId);
    if (
      this.fileProgress[fileId] &&
      this.fileProgress[fileId][`subscription`]
    ) {
      this.fileProgress[fileId].subscription.unsubscribe();
    }
    let index = this.fileList.findIndex((el: any) => el.fileId == fileId);
    if (index > -1) {
      this.fileList.splice(index, 1);
      let defaultFileName = "";
      let defaultFileType = "";
      if (this.fileList && this.fileList.length) {
        defaultFileName = this.fileList[0].name;
        defaultFileType = this.fileList[0].type;
      }
      this._snackBar.open("File upload canceled!", undefined, {
        duration: 2000,
      });
      this.fileDropRef.nativeElement.value = "";
      this.fileProgress[fileId] = undefined;
      // this.afterSelectionMethod.emit({ url: this.selectedUrl, name: defaultFileName, mime: defaultFileType, fileList: this.fileList });
    }
  }

  openSnackBar(data: string[], duration: any) {
    this._snackBar.openFromComponent(SnackBarComponent, { data, duration });
  }
}
