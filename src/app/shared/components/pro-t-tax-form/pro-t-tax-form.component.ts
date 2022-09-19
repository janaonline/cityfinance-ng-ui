import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';
const swal: SweetAlert = require("sweetalert");
import { SweetAlert } from "sweetalert/typings/core";
import { HttpEventType, HttpParams } from '@angular/common/http';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";
import { ToWords } from "to-words";
const toWords = new ToWords();


@Component({
  selector: 'app-pro-t-tax-form',
  templateUrl: './pro-t-tax-form.component.html',
  styleUrls: ['./pro-t-tax-form.component.scss']
})
export class ProTTaxFormComponent implements OnInit {
  propertyTaxForm: FormGroup;
  submitted :boolean = false
  isDisabled:boolean = false;
  activeClass: boolean = false;
  dataValue
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private ptService: NewCommonService,
    private dataEntryService: DataEntryService
  ) {
    this.getUlbDesignYear();
    this.initializeForm();
   }
   design_year
   yearValue
   ulbData
   ulbId
   getUlbDesignYear(){
    this.design_year = JSON.parse(localStorage.getItem("Years"));
    this.yearValue = this.design_year["2022-23"];
    this.ulbData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.ulbData);
    this.ulbId = this.ulbData?.ulb;
    if (!this.ulbId) {
      this.ulbId = localStorage.getItem("ulb_id");
    }
    console.log('this.ulbId------->', this.ulbId)
  }

  get f() { return this.propertyTaxForm.controls; }
  
  initializeForm(){
    const arr = [
      
        {
            "year":"2018-19",
            "value":0
        },
         {
            "year":"2019-20",
            "value":0
        },
         {
            "year":"2020-21",
            "value":0
        }
    
    ]
    this.propertyTaxForm = this.formBuilder.group({
      ulb: this.ulbId,
      design_year: this.yearValue,
      method: ["", Validators.required],
      other: ["", Validators.required],
noOfProp_1819:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)]] ,
noOfProp_1920:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)]] ,
noOfProp_2021:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)]] ,
noOfPropTaxReg_1819:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
noOfPropTaxReg_1920:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
noOfPropTaxReg_2021:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
noOfPropBilled_1819:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
noOfPropBilled_1920:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
noOfPropBilled_2021:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
noOfPropTaxPaid_1819:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
noOfPropTaxPaid_1920:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
noOfPropTaxPaid_2021:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
taxDemand_1819:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
taxDemand_1920:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
taxDemand_2021:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
taxCollected_1819:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
taxCollected_1920:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
taxCollected_2021:["", [Validators.required, Validators.maxLength(10), Validators.minLength(0)] ] ,
      isDraft: "",
    });
    console.log(this.propertyTaxForm)
  }
  onload(){
    this.getPtoData();
  }
 
  submitForm(){
    console.log(this.propertyTaxForm)
    if(this.propertyTaxForm.status == "INVALID"){
      swal('Error',   "One or more required fields are empty or contains invalid data. Please check your input.", 'error')
    }else{
      this.onSubmit();
    }
    for(let key in this.propertyTaxForm.value){

    }
  }

  formDataPto;
  getPtoData(){
    const params = {
      ulb: this.ulbId,
      design_year: this.yearValue,
    };
    console.log(params)
    //call api and subscribe and patch here
    this.ptService.getPropertyTaxOpenData(params).subscribe((res:any)=>{
      console.log(res)
      this.dataValue = res;
      this.formDataPto = res?.data;
      res?.data?.isDraft == false ? this.propertyTaxForm.disable() :  this.propertyTaxForm.enable()
      res?.data?.isDraft == false ? this.isDisabled = true : this.isDisabled = false
      
      this.patchFunction();
      
    },
      (error) => {
        console.log(error);
        if (this.ulbData?.role != "ULB") {
          this.isDisabled = true;
        }

      }
    )
  }
  amount2Type
numToWord(amountObj){
  console.log(amountObj)
  this.amount2Type = toWords.convert(Number(amountObj?.value), {
    currency: true,
    doNotAddOnly: true,
  });
  Object.assign(amountObj, {words : this.amount2Type})
  // amountObj.push({words : this.amount2Type})
}
  patchFunction(){
    console.log(this.dataValue)
    // this.showStateAct = true
   
    this.propertyTaxForm.patchValue({
      ulb: this.dataValue?.data?.ulb,
      design_year: this.dataValue?.data?.design_year,
      method: this.dataValue?.data?.method,
      other: this.dataValue?.data?.other,
      isDraft: this.dataValue?.data?.isDraft,
      noOfProp_1819:this.dataValue?.data?.noOfProp_1819,
noOfProp_1920:this.dataValue?.data?.noOfProp_1920,
noOfProp_2021:this.dataValue?.data?.noOfProp_2021,
noOfPropTaxReg_1819:this.dataValue?.data?.noOfPropTaxReg_1819,
noOfPropTaxReg_1920:this.dataValue?.data?.noOfPropTaxReg_1920,
noOfPropTaxReg_2021:this.dataValue?.data?.noOfPropTaxReg_2021,
noOfPropBilled_1819:this.dataValue?.data?.noOfPropBilled_1819,
noOfPropBilled_1920:this.dataValue?.data?.noOfPropBilled_1920,
noOfPropBilled_2021:this.dataValue?.data?.noOfPropBilled_2021,
noOfPropTaxPaid_1819:this.dataValue?.data?.noOfPropTaxPaid_1819,
noOfPropTaxPaid_1920:this.dataValue?.data?.noOfPropTaxPaid_1920,
noOfPropTaxPaid_2021:this.dataValue?.data?.noOfPropTaxPaid_2021,
taxDemand_1819:this.dataValue?.data?.taxDemand_1819,
taxDemand_1920:this.dataValue?.data?.taxDemand_1920,
taxDemand_2021:this.dataValue?.data?.taxDemand_2021,
taxCollected_1819:this.dataValue?.data?.taxCollected_1819,
taxCollected_1920:this.dataValue?.data?.taxCollected_1920,
taxCollected_2021:this.dataValue?.data?.taxCollected_2021,
    
        });
  }
  ngOnInit(): void {
    this.getUlbPropertyTaxDropdown();
    this.onload()
  }
  dropdownItems
  getUlbPropertyTaxDropdown(){
    this.ptService.getPropertyTaxDropdownList().subscribe((res:any)=>{
      console.log('dropdownList', res)
       this.dropdownItems = res?.data
       console.log('this.dropdownItems', this.dropdownItems)
    })
  }

  addValidator(event){
    if(event == 'Other'){
      this.setValidators('other');
    }else{
      this.removeValidatorsOneByOne('other');
    }
    
  }

  numberLimitV(e, input) {
    // console.log("sss", e, input);
    const functionalKeys = ["Backspace", "ArrowRight", "ArrowLeft", "Tab"];

    if (functionalKeys.indexOf(e.key) !== -1) {
      return;
    }

    const keyValue = +e.key;
    if (isNaN(keyValue)) {
      e.preventDefault();
      return;
    }

    const hasSelection =
      input?.selectionStart !== input?.selectionEnd &&
      input?.selectionStart !== null;
    let newValue;
    if (hasSelection) {
      newValue = this.replaceSelection(input, e.key);
    } else {
      newValue = input?.value + keyValue?.toString();
    }

    if (+newValue < 0  || newValue.length > 10) {
      e.preventDefault();
    }
  }

  private replaceSelection(input, key) {
    const inputValue = input?.value;
    const start = input?.selectionStart;
    const end = input?.selectionEnd || input?.selectionStart;
    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }


  setValidators(formFieldName: string) {
    this.propertyTaxForm.controls[formFieldName].setValidators([
      Validators.required,
    ]);
    this.propertyTaxForm.controls[formFieldName].updateValueAndValidity();
  }
  removeValidatorsOneByOne(formFieldName: string) {
    this.propertyTaxForm.controls[formFieldName].setValidators(null);
    this.propertyTaxForm.controls[formFieldName].updateValueAndValidity();
  }
  alertFormFinalSubmit() {
    this.submitted = true;
    this.activeClass = true;
    
    console.log('this.propertyTaxForm?.value', this.propertyTaxForm?.value)
    if (this.propertyTaxForm.invalid) {
      swal(
        "Missing Data !",
        "One or more required fields are empty or contains invalid data. Please check your input.",
        "error"
      );
      return;
    } else {
      swal(
        "Confirmation !",
        `Are you sure you want to submit this form? Once submitted,
       it will become uneditable and will be sent to Mohua for Review.
        Alternatively, you can save as draft for now and submit it later.`,
        "warning",
        {
          buttons: {
            Submit: {
              text: "Submit",
              value: "submit",
            },
            Draft: {
              text: "Save as Draft",
              value: "draft",
            },
            Cancel: {
              text: "Cancel",
              value: "cancel",
            },
          },
        }
      ).then((value) => {
        switch (value) {
          case "submit":
            this.onSubmit();
            break;
       
          case "cancel":
            break;
        }
      });
      // this.onSubmit('submit');
    }
  }
  clickedSave 
  onSubmit(){
    console.log('this.propertyTaxForm?.value', this.propertyTaxForm?.value)
    console.log(this.propertyTaxForm.value);
    let body = {
      ...this.propertyTaxForm.value,
      isDraft: false,
    };
    console.log(body)
    console.log('submitted',this.propertyTaxForm.value)
    this.submitted =true;

    this.ptService.postPropertyTaxOpenData(body).subscribe((res :any)=>{
      console.log(res)
      this.clickedSave = false;

      if (res && res.status) {
        this.clickedSave = false;
        this.isDisabled = true;
        console.log(res)
 this.propertyTaxForm.disable()
        swal("Saved", "Data saved successfully", "success");
      } else {
        swal("Error", res?.message ? res?.message : "Error", "error");
      }
    },
    (error) => {
      console.error("err", error);
      swal("Error", error ? error : "Error", "error");
    })
  }

}
