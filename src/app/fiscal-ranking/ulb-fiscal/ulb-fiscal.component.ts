import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ulb-fiscal',
  templateUrl: './ulb-fiscal.component.html',
  styleUrls: ['./ulb-fiscal.component.scss']
})
export class UlbFiscalComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  stepperArray = [
    {
      label: `Basic ULB Details`,
      key: 'basicDet',
      id: 's1',
      icon: '',
      text: ''
    },
    {
      label: `Expenditure Performance Parameters`,
      key: 'expPer',
      id: 's2',
      icon: '',
      text: ''
    },
    {
      label: `Revenue Mobilization Parameters`,
      key: 'revMob',
      id: 's3',
      icon: '',
      text: ''
    },
    {
      label: `Fiscal Governance Parameters`,
      key: 'fisGov',
      id: 's4',
      icon: '',
      text: ''
    },
    {
      label: `Upload Financial Documents`,
      key: 'upFy',
      id: 's5',
      icon: '',
      text: ''
    },
    {
      label: `Contact Information`,
      key: 'conInfo',
      id: 's6',
      icon: '',
      text: ''
    },
    {
      label: `Self Declaration`,
      key: 'selDec',
      id: 's7',
      icon: '',
      text: ''
    },

  ]
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
