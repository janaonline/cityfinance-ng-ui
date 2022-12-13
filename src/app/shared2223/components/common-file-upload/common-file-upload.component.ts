import { HttpEventType } from "@angular/common/http";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from "@angular/core";
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
  constructor(private dataEntryService: DataEntryService) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
  }
  //number to word
  // converter = require("number-to-words");
  userData;
  @Input() quesName;
  @Input() quesType;
  @Input() isDisabled;
  @Input() dataFromParentN;
  @Input() itemObj;
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
    excel: {
      file: null,
      url: null,
      name: null,
      error: null,
      progress: null,
    },

    status: "",
    rejectReason: "",
    // status: this.stateAction,
    //  rejectReason: this.rejectReason,
  };
  dataAuditor = {
    pdf: {
      file: null,
      url: null,
      name: null,
      error: null,
      progress: null,
    },
    status: "",
    rejectReason: "",
    // status: this.stateAction,
    //  rejectReason: this.rejectReason,
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
    // debugger;
    console.log("isDisabled", this.isDisabled);

    if (this.quesName == "Auditor Report" || this.quesName == 'Supporting Document') {
      this.showExcel = false;
    } else {
      this.showExcel = true;
    }
    console.log("this.dataFromParent", this.dataFromParentN);

    if (this.dataFromParentN) {
      this.data = this.dataFromParentN;
      //   //  this.stateAction = this.data?.status;
      //   //  this.rejectReason = this.data?.rejectReason;
    }
    if (
      this.quesType == "input" &&
      (this.amountObj?.value != "" || this.amountObj?.value != null)
    ) {
      this.amountKeyUp("onLoad");
    }
  }
  ngOnChanges(changes: SimpleChange) {
    // console.log("chnages", changes);
    // console.log("chnages isDisabled", this.isDisabled);
    if (this.delFileType) {
      this.clearFile(this.delFileType, "onLoad");
    }
    if (this.dataFromParentN) {
      this.data = this.dataFromParentN;
     // console.log("changes..........", this.dataFromParentN);
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
        // this.amountObj.value = parseFloat(this.amountObj.value);
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
    if (this.compName == "AnnualAccount" && type == "click" && this.userData?.role == 'ULB')
      sessionStorage.setItem("changeInAnnualAcc", "true");
  }
  async fileChangeEvent(event, fileType) {
    let isfileValid =  this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if(isfileValid == false){
      swal("Error","File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>? \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
       return;
    }
    console.log(fileType, event);
    console.log("aaa", event.target.files[0].size);
    let files;
    let fileSize = event?.target?.files[0]?.size / 1048576; //size in mb
    console.log("aaa", fileSize);
    if (fileSize < 20) {
      if (typeof event != "boolean") files = event.target.files[0];
      else files = this.data[fileType].file;
      let fileExtension = files.name.split(".").pop();
      console.log(fileExtension, fileType);
      if (fileType == "excel") {
        if (fileExtension == "xls" || fileExtension == "xlsx") {
          this.uploadFile(files, files.name, files.type, fileType);
        } else {
          return swal("Error", "Only Excel File can be Uploaded.", "error");
        }
      } else if (fileType == "pdf") {
        if (fileExtension == "pdf") {
          this.uploadFile(files, files.name, files.type, fileType);
        } else {
          console.log("error type", event);
          swal("Error", "Only PDF File can be Uploaded.", "error");
          return;
        }
      } else {
        return;
      }
    } else {
      swal("File Limit Error", "Maximum 20 mb file can be allowed.", "error");
      return;
    }
  }
  Year = JSON.parse(localStorage.getItem("Years"));
  uploadFile(file, name, type, fileType) {
    console.log("this.data", this.data);
    let ulbId = this.userData?.ulbCode;
    let formName = 'annual_accounts'
    if (!ulbId) {
      ulbId = localStorage.getItem("ulb_id");
      let formName = 'annual_accounts'
     }
    this.data[fileType].progress = 20;
    let folderName = `${this.userData?.role}/2022-23/${formName}/${ulbId}`
    this.dataEntryService.newGetURLForFileUpload(name, type, folderName).subscribe(
      (s3Response) => {
        this.data[fileType].progress = 50;
        const res = s3Response.data[0];
        this.data[fileType].name = name;
        this.uploadFileToS3(
          file,
          res["url"],
          res["file_url"],
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
          if (this.compName == "AnnualAccount" && this.userData?.role == 'ULB')
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
  clearFile(fileType, type) {
    if (this.isDisabled) {
      return;
    }
    for (const key in this.data[fileType]) {
      this.data[fileType][key] = null;
    }
    this.getFileUploadResult.emit(this.data);
    if (type == "click" && this.userData?.role == 'ULB') {
      sessionStorage.setItem("changeInAnnualAcc", "true");
    }
  }
}
