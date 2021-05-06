import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/shared/services/common.service';
import {PreviewSlbComponentComponent} from '../preview-slb-component/preview-slb-component.component'

@Component({
  selector: 'app-ulbform-preview',
  templateUrl: './ulbform-preview.component.html',
  styleUrls: ['./ulbform-preview.component.scss']
})
export class UlbformPreviewComponent  implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private commonService: CommonService ) {

  }
  ulbName ='';



  ngOnInit(): void {
    console.log("pre", this.data)
    let ulbRecord = JSON.parse(localStorage.getItem('userData'));
    this.ulbName = ulbRecord.name;
    console.log(ulbRecord);



  }
  downloadAsPDF(){

  }


}
