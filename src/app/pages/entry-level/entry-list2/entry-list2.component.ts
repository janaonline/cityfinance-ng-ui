import { Component, OnInit } from '@angular/core';

import {  FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { UtlizationRepotPreviewComponent } from './utlization-repot-preview/utlization-repot-preview.component';
// import { utilizationreportpreview } from './utilization-report-preview';


@Component({
  selector: 'app-entry-list2',
  templateUrl: './entry-list2.component.html',
  styleUrls: ['./entry-list2.component.scss']
})


export class EntryList2Component implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialog) { }
  utilizationReport: FormGroup;
   hidden = true;
   closeBalInput:Number;

  ngOnInit() {


    this.utilizationReport = this.fb.group({
      //  'grantsYear' : new FormControl({value:'', disabled: true}),

       'stateName': new FormControl( 'Uttar Pradesh', Validators.required),
       'mpcName': new FormControl( 'Agra Municipality', Validators.required),
       'grantType': new FormControl('Tied', Validators.required),
       prevInstallInput: new FormControl( {value: '', disabled: false}, Validators.required),
       grantRecInput: new FormControl( {value: '', disabled: false}, Validators.required),
       expendInput: new FormControl( {value: '', disabled: false}, Validators.required),
      //  'closeBalInput': new FormControl( {value: '', disabled: false}, Validators.required),

      // -------tabel-input----
      utilizationTabel: this.fb.array([this.fb.group({
        'tdcatInput': new FormControl( {value: 'Category', disabled: false}, Validators.required),
        'tdProjectName': new FormControl( {value: '', disabled: false}, Validators.required),
        'tdDesc': new FormControl( {value: '', disabled: false}, Validators.required),
        'imgUpload' : new FormControl(''),
        'tdCap': new FormControl( {value: '', disabled: false}, Validators.required),
        'tdLat': new FormControl( {value: '', disabled: false}, Validators.required),
        'tdLong': new FormControl( {value: '', disabled: false}, Validators.required),
        'tdProjCost': new FormControl( {value: '', disabled: false}, Validators.required),
        'tdExpend': new FormControl( {value: '', disabled: false}, Validators.required),
        // name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      })]),

      'name': new FormControl( {value: '', disabled: false}, Validators.required),
      'desi': new FormControl( {value: '', disabled: false}, Validators.required),

    });


  }
  get tabelRows() {
    return this.utilizationReport.get('utilizationTabel') as FormArray;
  }
  calAmount(){
    // alert("hello")
    this.closeBalInput = Number(this.utilizationReport.controls.prevInstallInput.value) +
    Number(this.utilizationReport.controls.grantRecInput.value) - Number(this.utilizationReport.controls.expendInput.value);
  }


  onSubmit(){
    alert("Submit and Next?")
     console.log(this.utilizationReport);
  }

  onPreview(){
    const dialogRef = this.dialog.open(UtlizationRepotPreviewComponent, {data: [this.utilizationReport.value, this.closeBalInput],
      height: '100%', width: '100%',} );
     this.hidden = false;
     dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.hidden = true;
    });
  }

 addRow(){
  this.tabelRows.push(this.fb.group({

    'tdcatInput': new FormControl( {value: 'Category', disabled: false}, Validators.required),
    'tdProjectName': new FormControl( {value: '', disabled: false}, Validators.required),
    'tdDesc': new FormControl( {value: '', disabled: false}, Validators.required),
    'tdCap': new FormControl( {value: '', disabled: false}, Validators.required),
    'tdLat': new FormControl( {value: '', disabled: false}, Validators.required),
    'tdLong': new FormControl( {value: '', disabled: false}, Validators.required),
    'tdProjCost': new FormControl( {value: '', disabled: false}, Validators.required),
    'tdExpend': new FormControl( {value: '', disabled: false}, Validators.required),


       }));

  }



  deleteRow(i){
    this.tabelRows.removeAt(i);
  }

}


