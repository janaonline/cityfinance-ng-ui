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

    this.fetchStateList();
    this.initializeLoggedInUserDataFetch();


  }

  utilizationReport: FormGroup;
   hidden = true;
   closingBal:Number = 0;
   projectCost = 0;
   projectExp = 0;
   photos:any;
   categories;
   states: { [staeId: string]: IState };
   userLoggedInDetails: IUserLoggedInDetails;
   loggedInUserType: USER_TYPE;
   userTypes = USER_TYPE;

   private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
      this.initializeReport();
    });
  }



   onFileChange(event) {

  }


      ngOnInit() {

           this.UtiReportService.getConfig()
                  .subscribe((resdata) => {
                                 this.categories = resdata;
                        console.log(resdata);
                  });
        }

  public initializeReport(){
    this.utilizationReport = this.fb.group({
      //  'grantsYear' : new FormControl({value:'', disabled: true}),

      stateName : new FormControl(this.states[this.userLoggedInDetails.state]?.name, Validators.required),
      ulb : new FormControl( this.userLoggedInDetails.name, Validators.required),
      grantType : new FormControl('Tied', Validators.required),
      unUtilizedPrevYr: new FormControl( {value: '', disabled: false}, Validators.required),
      receivedDuringYr: new FormControl( {value: '', disabled: false}, Validators.required),
      expDuringYr: new FormControl( {value: '', disabled: false}, Validators.required),
      //  'closingBal': new FormControl( {value: '', disabled: false}, Validators.required),

      // -------tabel-input----
      utilizationTabel: this.fb.array([this.fb.group({
        category: new FormControl( {value: 'Category', disabled: false}, Validators.required),
        project_name: new FormControl( {value: '', disabled: false}, Validators.required),
        desctiption: new FormControl( {value: '', disabled: false}, Validators.required),
       // 'imgUpload' : new FormControl(''),
        file: [{ value: this.photos}, Validators.required],
        capacity: new FormControl( {value: '', disabled: false}, Validators.required),
        lat: new FormControl( {value: '', disabled: false}, Validators.required),
        long : new FormControl( {value: '', disabled: false}, Validators.required),
        project_cost: new FormControl( {value: '', disabled: false}, Validators.required),
        expenditure: new FormControl( {value: '', disabled: false}, Validators.required),
        // name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      })]),

      name: new FormControl( {value: '', disabled: false}, Validators.required),
      designation: new FormControl( {value: '', disabled: false}, Validators.required),

    });
  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
  }
  get tabelRows() {
    return this.utilizationReport.get('utilizationTabel') as FormArray;
  }
  calAmount(){
    // alert("hello")
    this.closingBal = Number(this.utilizationReport.controls.unUtilizedPrevYr.value) +
    Number(this.utilizationReport.controls.receivedDuringYr.value) - Number(this.utilizationReport.controls.expDuringYr.value);
  }

   totalProCost(i){
     this.projectCost =0;
    for(let j=0; j < this.tabelRows.length; j++){
     // console.log(this.projectCost + +this.utilizationReport.controls.utilizationTabel.value[j].project_cost)
      this.projectCost = this.projectCost + +this.utilizationReport.controls.utilizationTabel.value[j].project_cost;

    }
 }
  totalExpCost(i) {
    this.projectExp =0;
    for(let j=0; j < this.tabelRows.length; j++){
    this.projectExp = this.projectExp + Number(this.utilizationReport.controls.utilizationTabel.value[j].expenditure);
   // console.log(this.projectExp);
    }
  }

  onSubmit(){
    alert("Submit and Next?")
     console.log(this.utilizationReport);
  }

  onPreview(){
    const dialogRef = this.dialog.open(PreviewUtiFormComponent,
       {data: [this.utilizationReport.value, this.closingBal,this.projectCost,this.projectExp],
      height: '100%', width: '100%',
      panelClass: 'no-padding-dialog' } );
     this.hidden = false;
     dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.hidden = true;

    });
  }

 addRow(){
  console.log(this.photos);
  this.tabelRows.push(this.fb.group({

    category : new FormControl( {value: 'Category', disabled: false}, Validators.required),
    project_name: new FormControl( {value: '', disabled: false}, Validators.required),
    desctiption: new FormControl( {value: '', disabled: false}, Validators.required),
    file: [{ value: this.photos}, Validators.required],
    capacity: new FormControl( {value: '', disabled: false}, Validators.required),
    lat : new FormControl( {value: '', disabled: false}, Validators.required),
    long : new FormControl( {value: '', disabled: false}, Validators.required),
    project_cost: new FormControl( {value: '', disabled: false}, Validators.required),
    expenditure: new FormControl( {value: '', disabled: false}, Validators.required),


       }));

  }

  deleteRow(i){
    this.tabelRows.removeAt(i);
    this.totalProCost(i);
    this.totalExpCost(i);
  }
  private initializeLoggedInUserDataFetch() {
    //  = this.profileService.getUserLoggedInDetails();
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;
    });
    if (!this.userLoggedInDetails) {
      return this._router.navigate(["/login"]);
    }
    switch (this.userLoggedInDetails.role) {
      case USER_TYPE.STATE:
      case USER_TYPE.ULB:
        return this.fetchStateList();
    }
  }

  saveAsDraft(){
    console.log(this.utilizationReport);
  }
  saveAndNext(){
    console.log(this.utilizationReport.value);
  }


}
