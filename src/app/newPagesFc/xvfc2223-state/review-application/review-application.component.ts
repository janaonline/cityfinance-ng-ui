import { Component, OnInit } from '@angular/core';
import {NewCommonService} from '../../../shared2223/services/new-common.service'
@Component({
  selector: 'app-review-application',
  templateUrl: './review-application.component.html',
  styleUrls: ['./review-application.component.scss']
})
export class ReviewApplicationComponent implements OnInit {

  constructor(
    private commonService: NewCommonService
  ) { }

  ngOnInit(): void {
    this.onLoad();

  }
  title = ''
params = {
  role : "ULB",
  design_year: "606aafb14dff55e6c075d3ae"
};
formId=''
data
  onLoad(){
    if(this.params['role'] == 'ULB') {
      this.title = 'Review Grant Application'
    }else if(this.params['role'] == 'STATE'){
      this.title = 'Review State Forms'
    }
    this.commonService.getFormList(this.params).subscribe((res)=>{
this.data = res['data']
    }, (err)=>{
      alert(err.message)
    } )
  }

  setFormId(event){
    this.formId = event.target.value 
  }

}
