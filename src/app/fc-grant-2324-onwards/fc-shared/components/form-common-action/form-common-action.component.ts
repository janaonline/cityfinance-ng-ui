import { HttpEventType } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: "app-form-common-action",
  templateUrl: "./form-common-action.component.html",
  styleUrls: ["./form-common-action.component.scss"],
})
export class FormCommonActionComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dataEntryService: DataEntryService,
    private _snackBar: MatSnackBar
  ) {
    this.initializeForm();
    this.formValueChange();
    this.getStatusId();
  }

  Years = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));
  questionResponse: any = {
    timestamp: 1621316934,
    success: true,
    message: "Form Questionare!",
    data: [
      {
        _id: "5f4656c92daa9921dc1173aa",
        formId: 466,
        language: [
          {
            _id: "64212205cc09cd11d2152955",
            lng: "en",
            question: [
              {
                information: "",
                _id: "642120e6e6aa5311d3f5f8b9",
                order: "1",
                answer_option: [
                  {
                    name: "Approve",
                    did: [],
                    viewSequence: "1",
                    coordinates: [],
                    _id: "1",
                  },
                  {
                    name: "Return",
                    did: [],
                    viewSequence: "2",
                    coordinates: [],
                    _id: "2",
                  },
                ],
                title: "Review Status",
                hint: "Status is mandatory",
                resource_urls: [],
                label: "1",
                shortKey: "status",
                viewSequence: "1",
                child: [
                  {
                    type: "1",
                    value: "^([2])$",
                    order: "2",
                  },
                ],
                parent: [],
                validation: [
                  {
                    error_msg: "",
                    _id: "1",
                  },
                ],
                restrictions: [],
                input_type: "5",
                weightage: [],
                editable: false,
              },
              {
                information: "",
                _id: "6421217ce6aa5311d3f5f90c",
                order: "2",
                answer_option: [],
                title: "Reject Reason",
                hint: "",
                resource_urls: [],
                label: "2",
                shortKey: "state_rejectReason",
                viewSequence: "2",
                child: [],
                parent: [
                  {
                    value: "^([2])$",
                    type: "5",
                    order: "1",
                  },
                ],
                pattern: "",
                validation: [
                  {
                    error_msg: "",
                    _id: "1",
                  },
                ],
                restrictions: [],
                min: 1,
                max: null,
                input_type: "1",
                editable: false,
                weightage: [],
              },
              {
                information: "",
                _id: "642121d2cc09cd11d2152918",
                order: "3",
                answer_option: [],
                title: "Remarks",
                hint: "",
                resource_urls: [],
                label: "3",
                shortKey: "remarks",
                viewSequence: "3",
                child: [],
                parent: [],
                pattern: "",
                validation: [],
                restrictions: [],
                min: 1,
                max: null,
                input_type: "1",
                editable: false,
                weightage: [],
              },
              {
                information: "",
                _id: "64212205cc09cd11d2152953",
                answer_option: [],
                title: "Supporting Documents",
                hint: "",
                order: "4",
                resource_urls: [],
                label: "4",
                shortKey: "order4",
                viewSequence: "4",
                child: [],
                parent: [],
                min: null,
                max: null,
                minRange: null,
                maxRange: null,
                pattern: "",
                validation: [
                  {
                    error_msg: "",
                    _id: "81",
                    value: "10240",
                  },
                  {
                    error_msg: "",
                    _id: "82",
                    value: "1",
                  },
                ],
                restrictions: [],
                input_type: "11",
                editable: false,
                weightage: [],
              },
            ],
            title: "State Action",
            buttons: [],
          },
        ],
        groupOrder: 37,
        createDynamicOption: [],
        getDynamicOption: [],
      },
    ],
  };
  //action payload..............
  actionPostBody = {
    form_level: 2,
    design_year: "606aafc14dff55e6c075d3ec",
    formId: 4,
    ulbs: ["5dcfca53df6f59198c4ac3d5"],
    responses: [
      {
        shortKey: "form_level",
        status: 3,
        rejectReason: "qwdftyui",
        responseFile: {
          url: "dbjkf",
          name: "1123456",
        },
      },
    ],
    multi: false,
    shortKeys: ["form_level"],
  };
  statusForm: FormGroup;
  @Input() canTakeAction:boolean = false;
  @Input() actionData : any;
  @Input() viewMode: boolean = false;
  @Input() uploadFolderName:string = ''
  @Output() formChangeEventEmit = new EventEmitter<string>();
  actBtnDis = false;
  responceFile = {
    name: '',
    url: ''
  };
  statusIdForApprove:number = null;
  statusIdForReject:number = null;
  activeClassApprove = false;
  activeClassReturn = false;
  @Input() errorInAction = false;
  @Input() isActionSubmitted = false;
  ngOnInit(): void {
    
  }

  initializeForm() {
    this.statusForm = this.formBuilder.group({
     shortKey: "form_level",
      status: "",
      rejectReason: "",
      responseFile: this.formBuilder.group({
        url: [""],
        name: [""],
      }),
    });
  }
  formValueChange() {
    this.statusForm.valueChanges.subscribe((value) => {
      console.log("value has changed:", value);
      this.actionData = value;
      console.log(this.actionData);
      if (value.status == 4 || value.status == 6) {
        this.activeClassApprove = true;
        this.activeClassReturn = false;
        if(value?.rejectReason) this.errorInAction = false;
      } else if (value.status == 5 || value.status == 7) {
        this.activeClassReturn = true;
        this.activeClassApprove = false;
        if(!value?.rejectReason) this.errorInAction = true;
      }
    //   this.toggle = value;
    //   console.log(this.toggle);
      this.formChangeEventEmit.emit(this.statusForm.value);
    });
  }
  get formControl() {
    return this.statusForm.controls;
  }
  uploadFile(event: { target: HTMLInputElement }, fileType: string,  reset: boolean = false) {
    const maxFileSize = 5;
    const excelFileExtensions = ['xls', 'xlsx'];
    const file: File = event.target.files[0];
    if (!file) return;
    let isfileValid =  this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if(isfileValid == false){
      swal("Error","File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>? \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
       return;
    }
    const fileExtension = file.name.split('.').pop();
    if ((file.size / 1024 / 1024) > maxFileSize) return swal("File Limit Error", `Maximum ${maxFileSize} mb file can be allowed.`, "error");
    if (fileType === 'excel' && !excelFileExtensions.includes(fileExtension)) return swal("Error", "Only Excel File can be Uploaded.", "error");
    if (fileType === 'pdf' && fileExtension !== 'pdf') return swal("Error", "Only PDF File can be Uploaded.", "error");
    this._snackBar.open("Uploaing File...",'', {"duration": 10000});
    this.dataEntryService.newGetURLForFileUpload(file.name, file.type, this.uploadFolderName).subscribe(s3Response => {
      const { url, file_url } = s3Response.data[0];
      console.log('url..', url)
      console.log('asdfgg', s3Response)
      this.dataEntryService.newUploadFileToS3(file, url).subscribe((res) => {
        if (res.type !== HttpEventType.Response) return;
        this.formControl.responseFile.patchValue({ name: file.name, url: file_url });
        this.responceFile = { name: file.name, url: file_url };
        this._snackBar.dismiss();
        console.log('form', this.formControl?.responseFile?.value?.name);
        
      });
    }, 
    (err) => {
        console.log(err);
        this._snackBar.open("Unable to save the file..",'', {"duration": 2000});
        this._snackBar.dismiss();
    });
  }
  removeUploadedFile(){
    this.formControl.responseFile.patchValue({ name: '', url: '' });
    this.responceFile = { name: '', url: ''};
  }

  getStatusId(){
     if(this.userData?.role == 'STATE'){
       this.statusIdForApprove = 4;
       this.statusIdForReject = 5;
     }else if(this.userData?.role == 'MoHUA'){
       this.statusIdForApprove = 6;
       this.statusIdForReject = 7;
     }
  }
}
