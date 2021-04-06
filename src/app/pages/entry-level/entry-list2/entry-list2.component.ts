import { Component, OnInit } from '@angular/core';

import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
@Component({
  selector: 'app-entry-list2',
  templateUrl: './entry-list2.component.html',
  styleUrls: ['./entry-list2.component.scss']
})
export class EntryList2Component implements OnInit {
  utilizationReport: FormGroup;
  constructor() { }

  ngOnInit() {
    this.utilizationReport = new FormGroup({
       'grantsYear' : new FormControl({value:'', disabled: true}),
       'stateNameLabel': new FormControl({value: 'State Name', disabled: true}, Validators.required),
       'stateName': new FormControl({value: 'Uttar Pradesh', disabled: true}, Validators.required),

       'mpcLabel': new FormControl({value: 'Name of MPC/UA/NMPC', disabled: true}, Validators.required ),
       'mpcName': new FormControl( {value: 'Agra Municipality', disabled: true}, Validators.required),
       'grantTypeLabel': new FormControl({value: 'Type of grant', disabled: true}, Validators.required),
       'grantType': new FormControl( {value: 'Tied', disabled: true}, Validators.required),
       'prevInstallLabel': new FormControl( {value: 'i. Unutilized from previous installments', disabled: true}, Validators.required),
       'prevInstallInput': new FormControl( {value: '', disabled: false}, Validators.required),
       'grantRecLabel': new FormControl( {value: 'ii. Tied Grant received during the year', disabled: true}, Validators.required),
       'grantRecInput': new FormControl( {value: '', disabled: false}, Validators.required),
       'expendLabel': new FormControl( {value: 'iii. Expenditure incurred during the year', disabled: true}, Validators.required),
       'expendInput': new FormControl( {value: '', disabled: false}, Validators.required),
       'closeBalLabel': new FormControl( {value: 'Closing balance at the end of year ( i + ii - iii )', disabled: true}, Validators.required),
       'closeBalInput': new FormControl( {value: '', disabled: false}, Validators.required),
       'tdcatInput': new FormControl( {value: '', disabled: true}, Validators.required),
       'tdProjectName': new FormControl( {value: '', disabled: false}, Validators.required),
       'tdDesc': new FormControl( {value: '', disabled: false}, Validators.required),
       'tdCap': new FormControl( {value: '', disabled: false}, Validators.required),
       'tdLat': new FormControl( {value: '', disabled: false}, Validators.required),
       'tdLong': new FormControl( {value: '', disabled: false}, Validators.required),
       'tdProjCost': new FormControl( {value: '', disabled: false}, Validators.required),
       'tdExpend': new FormControl( {value: '', disabled: false}, Validators.required),
       'name': new FormControl( {value: '', disabled: false}, Validators.required),
       'desi': new FormControl( {value: '', disabled: false}, Validators.required)


    });
  }

  onSubmit(){
     console.log(this.utilizationReport);
  }

  onPreview(){
        alert(this.utilizationReport);
  }

}
