import { Component, OnInit } from '@angular/core';

import {  FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-entry-list2',
  templateUrl: './entry-list2.component.html',
  styleUrls: ['./entry-list2.component.scss']
})
export class EntryList2Component implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialog) { }
  utilizationReport: FormGroup;

  ngOnInit() {


    this.utilizationReport = this.fb.group({
      //  'grantsYear' : new FormControl({value:'', disabled: true}),

       'stateName': new FormControl({value: 'Uttar Pradesh', disabled: true}, Validators.required),
       'mpcName': new FormControl( {value: 'Agra Municipality', disabled: true}, Validators.required),
       'grantType': new FormControl( {value: 'Tied', disabled: true}, Validators.required),
       'prevInstallInput': new FormControl( {value: '', disabled: false}, Validators.required),
       'grantRecInput': new FormControl( {value: '', disabled: false}, Validators.required),
       'expendInput': new FormControl( {value: '', disabled: false}, Validators.required),
       'closeBalInput': new FormControl( {value: '', disabled: false}, Validators.required),

      // -------tabel-input----
      utilizationTabel: this.fb.array([this.fb.group({
        'tdcatInput': new FormControl( {value: 'Category', disabled: true}, Validators.required),
        'tdProjectName': new FormControl( {value: '', disabled: false}, Validators.required),
        'tdDesc': new FormControl( {value: '', disabled: false}, Validators.required),
        'tdCap': new FormControl( {value: '', disabled: false}, Validators.required),
        'tdLat': new FormControl( {value: '', disabled: false}, Validators.required),
        'tdLong': new FormControl( {value: '', disabled: false}, Validators.required),
        'tdProjCost': new FormControl( {value: '', disabled: false}, Validators.required),
        'tdExpend': new FormControl( {value: '', disabled: false}, Validators.required),

      })]),

      'name': new FormControl( {value: '', disabled: false}, Validators.required),
      'desi': new FormControl( {value: '', disabled: false}, Validators.required)
    });


  }
  get tabelRows() {
    return this.utilizationReport.get('utilizationTabel') as FormArray;
  }

  onSubmit(){
    alert("Submit and Next?")
     console.log(this.utilizationReport);
  }

  onPreview(){
    const dialogRef = this.dialog.open(EntryList2Component);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 addRow(){
  this.tabelRows.push(this.fb.group({

    'tdcatInput': new FormControl( {value: 'Category', disabled: true}, Validators.required),
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


