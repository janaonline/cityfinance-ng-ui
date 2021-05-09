import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-annual-preview',
  templateUrl: './annual-preview.component.html',
  styleUrls: ['./annual-preview.component.scss']
})
export class AnnualPreviewComponent implements OnInit {

  constructor() { }

  years = JSON.parse(localStorage.getItem("Years"))
  @Input() parentData
  
  year2021
  year2019
  ngOnInit(): void {
    console.log(this.parentData);
    debugger
    if(this.years["2020-21"] == this.parentData[0].year){
      this.year2021 = this.parentData[0]
      this.year2019 = this.parentData[1]
    }else{
      this.year2021 = this.parentData[1]
      this.year2019 = this.parentData[0]
    }
  }
  downloadAsPDF(){

  }

}
