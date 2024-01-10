import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonService } from "../common.service";
import { WebFormComponent } from "../web-form.component";
import { CommonServicesService } from "src/app/fc-grant-2324-onwards/fc-shared/service/common-services.service";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { HttpEventType } from "@angular/common/http";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: "app-cf-annual-account",
  templateUrl: "./cf-annual-account.component.html",
  styleUrls: ["./cf-annual-account.component.scss"],
})
export class CfAnnualAccountComponent
  extends WebFormComponent
  implements OnInit, AfterViewInit
{
  constructor(
    commonService: CommonService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog,
    private commonServices: CommonServicesService,
    private dataEntryService: DataEntryService,
  ) {
    super(commonService, snackBar, matDialog);
   
    this.Years = JSON.parse(localStorage.getItem("Years"));
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.ulbId = this.userData?.ulb;
    if (!this.ulbId) {
      this.ulbId = localStorage.getItem("ulb_id");
    }
    this.actionfolderName = `${this.userData?.role}/2023-24/supporting_douments/annual_accounts/${this.ulbId}`
  }
  @Output() actionDataSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() reviewShortKeyArray = [];
  @Input() actionPayloadRes;
  @Input() canTakeAction: boolean = false;
  activeTab: object | any;
  errorInAction: boolean = false;
  isActionSubmitted: boolean = false;
  actionViewMode: boolean = false;
  actBtnDis: boolean = false;
  tabs = [
    {
      name: "Provisional Accounts for 2022-23",
      id: "1",
      title: "unAudited",
      isActive: true,
      reviewShortKey:'tab_unAudited',
      status: '',
      statusId:'',
      responseFile: {
        name:'',
        url: ''
      },
      responseFile_mohua: {
        name:'',
        url: ''
      }
    },
    {
      name: "Audited Accounts for 2021-22",
      id: "2",
      title: "audited",
      isActive: false,
      reviewShortKey:'tab_audited',
      status: '',
      statusId:'',
      responseFile: {
        name:'',
        url: ''
      },
      responseFile_mohua: {
        name:'',
        url: ''
      }
    },
  ];
  actionPayload = {
    form_level: 2,
    design_year: "",
    formId: 5,
    ulbs: [],
    responses: [

    ],
    multi: false,
    shortKeys: [
 
    ],
  };
  userData;
  Years;
  actionfolderName = '';
  ulbId='';
  errorMsg = "One or more required fields are empty or contains invalid data. Please check your input.";
  @Input() actionResFile;
  ngOnInit() {
    if (
      this.isViewMode &&
      this.viewFormTemplate != "template1" &&
      this.viewFormTemplate != "template2" &&
      this.viewFormTemplate != "template3"
    ) {
      this.viewFormTemplate = "template2";
    }
    if (this.questionresponse && typeof this.questionresponse != "object") {
      this.questionresponse = JSON.parse(this.questionresponse);
    }
    this.processQuestion(
      JSON.parse(JSON.stringify(this.questionresponse)),
      false
    );

    this.actionPayload = {
      form_level: 2,
      design_year: this.Years["2023-24"],
      formId: 5,
      ulbs: [this.ulbId],
      responses: [
        // {
        //   shortKey: "tab_audited",
        //   status: 5,
        //   rejectReason: "bb",
        //   responseFile: {
        //     url: "google.com",
        //     name: "098765431",
        //   },
        // },
        // {
        //   shortKey: "tab_unAudited",
        //   status: 4,
        //   rejectReason: "qwertyuiop",
        //   responseFile: {
        //     url: "google.com",
        //     name: "098765431",
        //   },
        // },
       
      ],
      multi: false,
      shortKeys: this.reviewShortKeyArray
    };
    this.actionPayload["responses"] = [...this.actionPayloadRes];
    console.log('action paylaodsss', this.actionPayload);
    console.log('action paylaodsss 123456', this.actionResFile);
  
   this.activeTab = this.tabs[0];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges", changes);
    // let {questionResponse, title, isViewMode, buttonText, isFormSubmittedSuccessfully, enableEditMode, showSubmitButton, viewFormTemplate, disclaimerMessage} = changes;
    let {
      questionResponse,
      title,
      isViewMode,
      buttonText,
      isFormSubmittedSuccessfully,
      enableEditMode,
      showSubmitButton,
      viewFormTemplate,
      disclaimerMessage,
      showDraftButton,
    } = changes;
    if (title && title.currentValue) {
      this.title = title.currentValue;
    }
    if (isViewMode && isViewMode.currentValue) {
      this.isViewMode = isViewMode.currentValue;
    }
    if (buttonText && buttonText.currentValue) {
      this.buttonText = buttonText.currentValue;
    }
    if (
      isFormSubmittedSuccessfully &&
      isFormSubmittedSuccessfully.currentValue
    ) {
      this.isFormSubmittedSuccessfully =
        isFormSubmittedSuccessfully.currentValue;
    }
    if (enableEditMode && enableEditMode.currentValue) {
      this.enableEditMode = enableEditMode.currentValue;
    }
    if (showSubmitButton && showSubmitButton.currentValue) {
      this.showSubmitButton = showSubmitButton.currentValue;
    }
    if (showDraftButton && showDraftButton.currentValue) {
      this.showDraftButton = showDraftButton.currentValue;
    }
    if (viewFormTemplate && viewFormTemplate.currentValue) {
      this.viewFormTemplate = viewFormTemplate.currentValue;
    }
    if (disclaimerMessage && disclaimerMessage.currentValue) {
      this.disclaimerMessage = disclaimerMessage.currentValue;
    }
    // let temp = ["enableEditMode", "showPreviewAnswer", "showFormChange", "isViewMode","showSubmitButton", "isFormSubmittedSuccessfully" ];
    let temp = [
      "enableEditMode",
      "showPreviewAnswer",
      "showFormChange",
      "isViewMode",
      "showSubmitButton",
      "isFormSubmittedSuccessfully",
      "showDraftButton",
    ];
    temp.forEach((el: any) => {
      let self: any = this;
      if (changes && changes[el] && changes[el].currentValue) {
        let value = changes[el].currentValue;
        console.log("editMode", value);
        if (typeof value == "string") {
          value = value.trim();
          if (value.toLowerCase() == "true" || value.toLowerCase() == "yes") {
            self[el] = true;
          } else {
            self[el] = false;
          }
          console.log("enableEditMode", this.enableEditMode);
        }
      }
    });
    if (
      changes &&
      changes.questionresponse &&
      changes.questionresponse.currentValue
    ) {
      this.questionresponse = changes.questionresponse.currentValue;
      console.log("typeOF", typeof this.questionresponse);
      if (this.questionresponse && typeof this.questionresponse != "object") {
        this.questionresponse = JSON.parse(this.questionresponse);
      }
      console.log("parse data", this.questionresponse);
      this.processQuestion(
        JSON.parse(JSON.stringify(this.questionresponse)),
        true
      );
    }
   
   // this.tabChangeAA(this.tabs[0], ""); 
  }
ngAfterViewInit(){
  this.tabChangeAA(this.tabs[0], "");
}
  tabChangeAA(tabData: any, type: string) {
    console.log("aaaa", tabData);
    this.tabs.forEach((el) => {
      el.isActive = false;
    });
    console.log('el el 43434', this.actionResFile);
    tabData.isActive = true;
    if(this.actionResFile){
    // for(let el in this.actionResFile){
       console.log('el el', tabData?.reviewShortKey);
       tabData = Object.assign( tabData, {responseFile: this.actionResFile[tabData?.reviewShortKey].responseFile}, {responseFile_mohua: this.actionResFile[tabData?.reviewShortKey].responseFile_mohua});
  //   }
    }
    this.activeTab = tabData;
   console.log('this.activeTab', this.activeTab);
   
  }
  formChangeDetect(e) {
    console.log("eeeeeee", e);
    if ((e?.status == "5" || e?.status == "7") && e?.rejectReason == "") {
      e.errorInAction = true;
    } else {
      e.errorInAction = false;
    }
    let fileIndex = this.actionPayload.responses.findIndex(({shortKey}) => shortKey === e.shortKey);
   if(e?.type == 'status') this.actionPayload.responses[fileIndex].status = e.status;
   if(e?.type == 'rejectReason') this.actionPayload.responses[fileIndex].rejectReason = e.rejectReason;
    console.log('this.actionPayload this.actionPayload', this.actionPayload);
    
  }
 
  saveAction() {
    this.commonServices
      .formPostMethod(this.actionPayload, "common-action/masterAction")
      .subscribe(
        (res: any) => {
          console.log("ressssss action", res);
          this.actBtnDis = true;
          this.isActionSubmitted = false;
          this.actionDataSubmit.emit(true);
          // this.getActionRes();
          swal('Saved', "Action submitted successfully", "success");
        },
        (error) => {
          console.log("ressssss action", error);
          this.actionDataSubmit.emit(false);
          this.isActionSubmitted = false;
        }
      );
  }

  uploadFile(event: { target: HTMLInputElement }, fileType: string, activeTab) {
    const maxFileSize = 5;
    const excelFileExtensions = ['xls', 'xlsx'];
    const file: File = event.target.files[0];
    if (!file) return;
    let isfileValid =  this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if(isfileValid == false){
      swal("Error","File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>?@ \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
       return;
    }
    const fileExtension = file.name.split('.').pop();
    if ((file.size / 1024 / 1024) > maxFileSize) return swal("File Limit Error", `Maximum ${maxFileSize} mb file can be allowed.`, "error");
    if (fileType === 'excel' && !excelFileExtensions.includes(fileExtension)) return swal("Error", "Only Excel File can be Uploaded.", "error");
    if (fileType === 'pdf' && fileExtension !== 'pdf') return swal("Error", "Only PDF File can be Uploaded.", "error");
    this.snackBar.open("Uploaing File...",'', {"duration": 10000});
    this.dataEntryService.newGetURLForFileUpload(file.name, file.type, this.actionfolderName).subscribe(s3Response => {
      const { url, path } = s3Response.data[0];
      console.log('url..', url)
      console.log('asdfgg', s3Response)
      this.dataEntryService.newUploadFileToS3(file, url).subscribe((res) => {
        if (res.type !== HttpEventType.Response) return;
      // this.activeTab.responseFile = { name: file.name, url: file_url };
        this.setFileInAction(file.name, path)
        console.log('this.actionPayload 222', this.actionPayload);
        this.snackBar.dismiss();
       console.log('form activeTab', this.activeTab);
        
      });
    }, 
    (err) => {
        console.log(err);
        this.snackBar.open("Unable to save the file..",'', {"duration": 2000});
        this.snackBar.dismiss();
    });
  }
  
  getActionIndex(shortKey){
    return shortKey.includes("unAudited") ? "unAudited" : shortKey.includes("audited") ? "audited" : ""; 
    
  }
  setFileInAction(name, url){
    if(this.userData?.role == 'STATE'){
      this.activeTab['responseFile']['name'] = name;
      this.activeTab['responseFile']['url'] = url;
    }else{
      this.activeTab['responseFile_mohua']['name'] = name;
      this.activeTab['responseFile_mohua']['url'] = url;
    }
    
    let typeOfFile = this.activeTab?.reviewShortKey.split("_")[1];
    let fileIndex = this.actionPayload?.responses.findIndex(({shortKey}) => this.getActionIndex(shortKey) == typeOfFile);
    this.actionPayload.responses[fileIndex].responseFile = {name: name,  url: url};
    console.log('this.actionPayload', this.actionPayload);
    console.log('typeOfFile', typeOfFile);
    for(let el of this.actionPayload.responses){
       if(el.shortKey.split('.').includes(typeOfFile)){
         el.responseFile.name = name;
         el.responseFile.url = url;
       }
     }
  }

  alertForFianlSubmit() {
    let errorInAction = false;
    for(let el of this.actionPayload.responses){
      if(!el.status){
        errorInAction = true;
        swal("Missing Data !", `${this.errorMsg}`, "error");
        break;
      }else if((el.status == 5 || el.status == 7) && (!el?.rejectReason)){
        errorInAction = true;
        swal("Missing Data !", `${this.errorMsg}`, "error");
        break;
      }else{
        errorInAction = false;
      }
    }
    if(errorInAction == true) return;
    swal("Confirmation !", `Are you sure you want to submit this action?`, "warning", {
      buttons: {
        Submit: {
          text: "Submit",
          value: "submit",
        },
        Cancel: {
          text: "Cancel",
          value: "cancel",
        },
      },
    }).then((value) => {
      switch (value) {
        case "submit":
          this.saveAction();
          break;
        case "cancel":
          break;
      }
    });
  }
}

