import { Component, OnInit } from '@angular/core';

import {  FormControl, FormGroup, Validators } from '@angular/forms';
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

       'stateNameLabel': new FormControl({value: 'State Name', disabled: true}, Validators.required),
       'stateName': new FormControl({value: 'Uttar Pradesh', disabled: true}, Validators.required),

       'mpcLabel': new FormControl({value: 'Name of MPC/UA/NMPC', disabled: true}, Validators.required ),
       'mpcName': new FormControl( {value: 'Agra Municipality', disabled: true}, Validators.required),
       'grantTypeLabel': new FormControl({value: 'Type of grant', disabled: true}, Validators.required),
       'grantType': new FormControl( {value: 'Tied', disabled: true}, Validators.required)

    });
  }

  onSubmit(){

  }

}
