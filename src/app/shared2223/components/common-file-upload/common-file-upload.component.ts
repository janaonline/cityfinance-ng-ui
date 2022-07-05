import { HttpEventType } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { ToWords } from "to-words";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
const toWords = new ToWords();
@Component({
  selector: "app-common-file-upload",
  templateUrl: "./common-file-upload.component.html",
  styleUrls: ["./common-file-upload.component.scss"],
})
export class CommonFileUploadComponent implements OnInit {
  constructor(private dataEntryService: DataEntryService) {}
  converter = require("number-to-words");
  @Input() quesName;
  @Input() quesType;
  @Input() isDisabled;
  @Input() dataFromParent;
  @Output()
  getFileUploadResult = new EventEmitter();
  @Output()
  fillAmount = new EventEmitter();
  @Input()
  delFileType;
  showPdf = true;
  showExcel = true;
  data = {
    pdf: {
      file: null,
      url: null,
      name: null,
      error: null,
      progress: null,
    },
    excel: { file: null, url: null, name: null, error: null, progress: null },
    //status: this.stateAction,
    // rejectReason: this.rejectReason,
  };
  @Input() amountObj;
  @Input() itemError;
  @Input() compName;
  amount1Type;
  amount2Type;
  maxNumber = "999999999999999.99";
  pdfError = "Pdf not uploaded!";
  inputNumberError = "Fields can not be blank!";
  ngOnInit(): void {
    if (this.quesName == "Auditors Report") {
      this.showExcel = false;
    } else {
      this.showExcel = true;
    }
    if (this.dataFromParent) {
      this.data = this.dataFromParent;
      //  this.stateAction = this.data?.status;
      //  this.rejectReason = this.data?.rejectReason;
    }
    if (
      this.quesType == "input" &&
      (this.amountObj?.value != "" || this.amountObj?.value != null)
    ) {
      this.amountKeyUp("onLoad");
    }
  }
  ngOnChanges() {
    if (this.delFileType) {
      this.clearFile(this.delFileType);
    }
    if (this.dataFromParent) {
      this.data = this.dataFromParent;
      console.log("changes..........", this.dataFromParent);
    }
  }

  amountKeyUp(type) {
    //  this.amount1Type = this.converter.toWords(this.amountObj?.value);
    if (this.amountObj.value && this.amountObj.value != "") {
      if (this.amountObj.value < 999999999999999.99) {
        this.amount2Type = toWords.convert(Number(this.amountObj?.value), {
          currency: true,
          doNotAddOnly: true,
        });
        this.itemError = false;
        if (type == "click") this.amountObj.error = false;
      } else if (this.amountObj.value > 999999999999999.99) {
        this.amountObj.error = true;
        if (type == "click") this.itemError = false;
      }
    } else {
      this.amount2Type = "";
      if (type == "click") this.itemError = true;
    }
    this.fillAmount.emit(this.amountObj);
    if (this.compName == "AnnualAccount" && type == "click")
      sessionStorage.setItem("changeInAnnualAcc", "true");
  }
  async fileChangeEvent(event, fileType) {
    console.log(fileType);
    let files;
    if (typeof event != "boolean") files = event.target.files[0];
    else files = this.data[fileType].file;
    let fileExtension = files.name.split(".").pop();
    console.log(fileExtension);
    if (fileType == "excel") {
      if (fileExtension == "xls" || fileExtension == "xlsx") {
        this.uploadFile(files, files.name, files.type, fileType);
      } else {
        return swal("Only Excel File can be Uploaded.");
      }
    } else if (fileType == "pdf") {
      if (fileExtension == "pdf") {
        this.uploadFile(files, files.name, files.type, fileType);
      }
    } else {
      return swal("Only PDF File can be Uploaded.");
    }
  }

  uploadFile(file, name, type, fileType) {
    this.data[fileType].progress = 20;
    this.dataEntryService.getURLForFileUpload(name, type).subscribe(
      (s3Response) => {
        this.data[fileType].progress = 50;
        const res = s3Response.data[0];
        this.data[fileType].name = name;
        this.uploadFileToS3(
          file,
          res["url"],
          res["file_alias"],
          name,
          fileType
        );
      },
      (err) => {
        console.log(err);
        this.data[fileType].file = file;
        this.data[fileType].error = true;
      }
    );
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    name,
    fileType
  ) {
    this.data[fileType].progress = 60;
    this.dataEntryService.uploadFileToS3(file, s3URL).subscribe(
      (res) => {
        this.data[fileType].progress = 70;
        if (res.type === HttpEventType.Response) {
          this.data[fileType].progress = 100;
          this.data[fileType].file = file;
          this.data[fileType].url = fileAlias;
          if (this.compName == "AnnualAccount")
            sessionStorage.setItem("changeInAnnualAcc", "true");
          this.getFileUploadResult.emit(this.data);
        }
      },
      (err) => {
        this.data[fileType].file = file;
        this.data[fileType].error = true;
      }
    );
  }
  clearFile(fileType) {
    if (this.isDisabled) {
      return;
    }
    for (const key in this.data[fileType]) {
      this.data[fileType][key] = null;
    }
    this.getFileUploadResult.emit(this.data);
  }
}
