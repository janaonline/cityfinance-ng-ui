import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../../shared/services/common.service';
import { DataEntryService } from '../data-entry.service';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {

  states: any = [];
  years: any = [];
  ulbs: any = [];
  ledgerForm: FormGroup;
  submitted = false;
  @ViewChild("fileInput") fileInput;
  
  constructor(private formBuilder: FormBuilder, private commonService: CommonService, 
    private dataEntryService: DataEntryService, private utilService: UtilityService) { }

  ngOnInit() {
    this.years = ['2015-16', '2016-17', '2017-18']

    // this.ledgerForm = this.formBuilder.group({
    //   state: ['', Validators.required],
    //   ulb: ['', Validators.required],
    //   year: [this.years[0], Validators.required],	
    //   wards: ['', Validators.required],	
    //   population: ['', Validators.required],	
    //   area: ['', Validators.required],	
    //   audit_status: ['', Validators.required],
    //   audit_firm: ['', Validators.required],
    //   partner_name: ['', Validators.required],
    //   icai_membership_number: ['', Validators.required],
    //   created_at: ['', Validators.required],
    //   created_by: ['', Validators.required],
    //   verified_at: ['', Validators.required],
    //   verified_by: ['', Validators.required],
    //   reverified_at: ['', Validators.required],
    //   reverified_by: ['', Validators.required],
    //   file: [null, Validators.required]
    // });

    this.ledgerForm = this.formBuilder.group({
      state: ['', Validators.required],
      ulb: ['', Validators.required],
      year: [this.years[0], Validators.required],	
      file: [null, Validators.required]
    });

    this.commonService.states.subscribe(res => {
      this.states = res;
      this.ledgerForm.value.state = this.states[0];
    })
    this.commonService.loadStates(false);


  }

  get lf() { 
    return this.ledgerForm.controls; 
  }

  loadUlbs(){
    if(this.ledgerForm.value.state && this.ledgerForm.value.state.code){
      this.commonService.getUlbByState(this.ledgerForm.value.state.code).subscribe(res => {
        this.ulbs = res['data']['ulbs'];
        this.ledgerForm.value.ulb = this.ulbs[0];
      })
    }
    
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    let file = this.fileInput.nativeElement;
    if (this.ledgerForm.invalid || !(file.files && file.files[0]) ){
      return;
    }
    let formData = this.utilService.jsonToFormData(this.ledgerForm.value, ['file', 'state', 'ulb'], new FormData());
    formData.append('file', file.files[0]);
    formData.append('stateCode', this.ledgerForm.value.state.code);
    formData.append('stateName', this.ledgerForm.value.state.name);
    formData.append('ulbCode', this.ledgerForm.value.ulb.code);
    formData.append('ulbName', this.ledgerForm.value.ulb.name);
    formData.append('wards', this.ledgerForm.value.ulb.wards);
    formData.append('population', this.ledgerForm.value.ulb.population);
    formData.append('area', this.ledgerForm.value.ulb.area);

    this.dataEntryService.createEntry(formData).subscribe(res => {
      if(res['success']){
        alert('Successfully added');
        this.submitted = false;
        // this.ledgerForm.reset();
      } else{
        alert(res['msg']);
      }
    })
      
  }



}
