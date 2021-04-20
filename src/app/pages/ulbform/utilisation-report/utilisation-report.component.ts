import { Component, OnInit } from '@angular/core';

import { ChangeDetectorRef } from '@angular/core';


import {  FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { IUserLoggedInDetails } from '../../../models/login/userLoggedInDetails';
import { USER_TYPE } from '../../../models/user/userType';
import { UserUtility } from '../../../util/user/user';
import { ProfileService } from '../../../users/profile/service/profile.service';
import { IState } from '../../../models/state/state';
import { MatDialog } from '@angular/material/dialog';
import { UtiReportService } from './uti-report.service'
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { PreviewUtiFormComponent } from './preview-uti-form/preview-uti-form.component';
import { textChangeRangeIsUnchanged } from 'typescript';
@Component({
  selector: 'app-utilisation-report',
  templateUrl: './utilisation-report.component.html',
  styleUrls: ['./utilisation-report.component.scss']
})
export class UtilisationReportComponent implements OnInit {


  constructor(private fb: FormBuilder, public dialog: MatDialog, private cd: ChangeDetectorRef,
    private _commonService: CommonService,private profileService: ProfileService,private _router: Router,
    private UtiReportService: UtiReportService ) {
    this.initializeUserType();

   // this.fetchStateList();
    this.initializeLoggedInUserDataFetch();


  }

  utilizationReport: FormGroup;
  utilizationForm: FormGroup;
  submitted = false;
  // tabularProject:any = [{
  //   id : 0
  // }];
   totalclosingBal:Number = 0;
   projectCost = 0;
   projectExp = 0;
   selectedFile;
   categories;
   editable;
 formDataResponce;
   states: { [staeId: string]: IState };
   userLoggedInDetails: IUserLoggedInDetails;
   loggedInUserType: USER_TYPE;
   userTypes = USER_TYPE;

   errMessage;

   private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
      this.initializeReport();
     this.getResponse();
    });
  }

   ngOnInit() {

           this.UtiReportService.getCategory()
                  .subscribe((resdata) => {
                     this.categories = resdata;
                     console.log(resdata);
                  });

        }
   public getResponse(){
    this.UtiReportService.fetchPosts()
    .subscribe((res) => {
  //  this.formDataResponce = res;
    this.preFilledData(res);
       console.log(res);
    },error =>{
      console.log(error);
    });
   }
 private preFilledData(res){
  this.editable = res.isDraft;
    this.deleteRow(0);
    this.addPreFilledSimple(res);
    res.projects.forEach(project => {
      this.addPreFilledRow(project);
    });
  }
  addPreFilledSimple(data){
      this.utilizationReport.patchValue({
      name: data.name,
      designation: data.designation,
      grantPosition:{
        unUtilizedPrevYr: data.grantPosition.unUtilizedPrevYr,
        receivedDuringYr : data.grantPosition.receivedDuringYr,
        expDuringYr: data.grantPosition.expDuringYr,
        closingBal: data.grantPosition.closingBal
      }

      })
      this.totalclosingBal = data.grantPosition.closingBal;
      if(!this.editable)
      this.utilizationReport.disable();
  }


  public initializeReport(){

    this.utilizationForm = this.fb.group({
      stateName : new FormControl(this.states[this.userLoggedInDetails.state]?.name, Validators.required),
      ulb : new FormControl( this.userLoggedInDetails.name, Validators.required),
      grantType : new FormControl('Tied', Validators.required),
   });

    this.utilizationReport = this.fb.group({
      grantPosition: this.fb.group({
        unUtilizedPrevYr: ['', Validators.required],
        receivedDuringYr: ['', Validators.required],
        expDuringYr: ['', Validators.required],
        closingBal : []
      })
      ,

   projects: this.fb.array([this.fb.group({
        category: ['', Validators.required],
        name: ['', Validators.required],
        description: ['', Validators.required],
       // 'imgUpload' : new FormControl(''),
        photos: this.fb.group({
          url: ['']
        }),
        capacity: ['', Validators.required],
        location: this.fb.group({
          lat: ['', Validators.required],
          long : ['', Validators.required],
        }),

        cost: ['', Validators.required],
        expenditure: ['', Validators.required],
        // name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      })]),

      name: ['', Validators.required],
      designation: ['', Validators.required]

    });
   // this.utilizationReport.disable();
  }

  get utiReportFormControl() {
    return this.utilizationReport.controls;
  }

  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
  }
  get tabelRows() {

   return this.utilizationReport.get('projects') as FormArray;

  }
  calAmount(setFormControl){
    // alert("hello")
    this.totalclosingBal = Number(this.utilizationReport.value.grantPosition.unUtilizedPrevYr) +
    Number(this.utilizationReport.value.grantPosition.receivedDuringYr) -
    Number(this.utilizationReport.value.grantPosition.expDuringYr);

    let controlValue = (+this.utilizationReport.value.grantPosition[setFormControl]).toFixed(2);
  //  this.unUtiValue = (+this.utilizationReport.value.grantPosition.unUtilizedPrevYr).toFixed(2);

    this.patchValue(controlValue, setFormControl);
  }

  patchValue(controlValue, setFormControl) {
   console.log(controlValue);
   console.log(typeof(controlValue));
if(  !isNaN(controlValue) ) {
 this.utilizationReport.controls['grantPosition']['controls'][setFormControl].patchValue(controlValue);
}
else{
 this.utilizationReport.controls['grantPosition']['controls'][setFormControl].setValue('');
}

  //  this.utilizationReport.controls['grantPosition']['controls']['receivedDuringYr'].setValue(this.recValue);

  }


   totalProCost(i){
     this.projectCost =0;
    for(let j=0; j < this.tabelRows.length; j++){
     // console.log(this.projectCost + +this.utilizationReport.controls.projects.value[j].cost)
      this.projectCost = this.projectCost + +this.utilizationReport.controls.projects.value[j].cost;

    }
 }
  totalExpCost(i) {
    this.projectExp =0;
    for(let j=0; j < this.tabelRows.length; j++){
    this.projectExp = this.projectExp + Number(this.utilizationReport.controls.projects.value[j].expenditure);
   // console.log(this.projectExp);
    }
  }

  onSubmit(){
    alert("Submit and Next?")

  }


  onPreview(){
  let  formdata= {
      state_name  : this.utilizationForm.controls.stateName.value,
      ulbName  : this.utilizationForm.controls.ulb.value,
      grntType  : this.utilizationForm.controls.grantType.value,
      unUtiPreYear : this.utilizationReport.controls['grantPosition']['controls']['unUtilizedPrevYr'].value,
      abc  : this.utilizationReport.controls['grantPosition']['controls']['receivedDuringYr'].value,
      bcd : this.utilizationReport.controls['grantPosition']['controls']['expDuringYr'].value,
      total_bal : this.totalclosingBal
 }
 console.log(formdata);
    const dialogRef = this.dialog.open(PreviewUtiFormComponent,
       {data: [this.utilizationForm.value, this.utilizationReport.value, this.totalclosingBal,this.projectCost,this.projectExp],
      height: '100%', width: '100%',
      panelClass: 'no-padding-dialog' } );
    // this.hidden = false;
     dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
   //   this.hidden = true;

    });
  }

 addRow(){

  this.tabelRows.push(this.fb.group({
    category : ['', Validators.required],
    name: ['',[Validators.required, Validators.maxLength(50)]],
    description: ['',[Validators.required, Validators.maxLength(200)]],
    photos: this.fb.group({
      url: ['']
    }),
    capacity: ['', Validators.required],
    location: this.fb.group({
      lat: ['', Validators.required],
      long : ['', Validators.required],
    }),
    cost: ['', Validators.required],
    expenditure: ['', Validators.required],
       }));

  }
  addPreFilledRow(data){
    this.tabelRows.push(this.fb.group({
      category : [data.category, Validators.required],
      name: [data.name,[Validators.required, Validators.maxLength(50)]],
      description: [data.description,[Validators.required, Validators.maxLength(200)]],
      photos: this.fb.group({
        url: ['']
      }),
      capacity: [data.capacity, Validators.required],
      location: this.fb.group({
        lat: [data.location.lat, Validators.required],
        long : [data.location.long, Validators.required],
      }),
      cost: [data.cost, Validators.required],
      expenditure: [data.expenditure, Validators.required],
         }));
      if(!this.editable)
      this.tabelRows.disable();
  }

  deleteRow(i){
    this.tabelRows.removeAt(i);
    this.totalProCost(i);
    this.totalExpCost(i);
  }
  private initializeLoggedInUserDataFetch() {
    //  = this.profileService.getUserLoggedInDetails();
    UserUtility.getUserLoggedInData().subscribe((data) => {
      if(this.userLoggedInDetails){
        return ;
      }
      this.userLoggedInDetails = data;

      if (!this.userLoggedInDetails) {
        return this._router.navigate(["/login"]);
      }
      switch (this.userLoggedInDetails.role) {
        case USER_TYPE.STATE:
        case USER_TYPE.ULB:
          return this.fetchStateList();
      }
    });


  }

  // saveAsDraft(){
  //   console.log(this.utilizationReport);
  // }

  saveAndNext(){
    this.submitted = true;
    console.log(this.utilizationReport);
    console.log(this.utilizationReport.value);

    let fd = this.utilizationReport.value;
        fd.isDraft = true;
        fd.financialYear = '5ea036c2d6f1c5ee2e702e9e';
        fd.designYear ='5ea036c2d6f1c5ee2e702e9e';
        fd.grantType = 'Tied';
        fd.grantPosition.closingBal = this.totalclosingBal;



    this.UtiReportService.createAndStorePost(fd)
                  .subscribe((res) => {
                     console.log(res);
                     alert('Record submitted successfully.')
                  },
                  error =>{
                     alert("An error occured.")
                     this.errMessage = error.message;
                     console.log(this.errMessage);
                  });
  }
  onFileChange(event){
    this.selectedFile =<File>event.target;
    console.log(this.selectedFile);
  }

}
