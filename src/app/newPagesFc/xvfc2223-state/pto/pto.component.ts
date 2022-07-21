import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';

@Component({
  selector: 'app-pto',
  templateUrl: './pto.component.html',
  styleUrls: ['./pto.component.scss']
})
export class PtoComponent implements OnInit {
  ptoForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private newService: NewCommonService) { 
    this.initializeForm();
  }

  ngOnInit(): void {
    this.onload();
  }
  initializeForm(){
    this.ptoForm = this.formBuilder.group({
      actPage: '',
      state: '',
      design_year: '',
      comManual: this.formBuilder.group({
        url: '',
        name: '',
      }),
      floorRate: this.formBuilder.group({
        url: '',
        name: '',
      }),
      stateNotification: this.formBuilder.group({
        url: '',
        name: '',
      }),
   
    });
  }
  onload(){
    this.getPtoData();
  }
  getPtoData(){
    //call api and subscribe and patch here
    // this.newService.getPtoData().subscribe((res)=>{
    //   console.log(res)
    //   this.patchFunction(res);
    // })
  }
  patchFunction(data){

  }
  onSubmit(){
    console.log('submitted')
  }
  onDraft(){
    console.log('saved as draft')
  }
}
