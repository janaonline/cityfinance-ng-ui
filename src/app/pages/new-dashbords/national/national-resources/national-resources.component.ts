import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/shared/services/common.service";

@Component({
  selector: 'app-national-resources',
  templateUrl: './national-resources.component.html',
  styleUrls: ['./national-resources.component.scss']
})
export class NationalResourcesComponent implements OnInit {

  constructor(
    protected _commonService: CommonService,
    private router: Router
  ) {
    this._commonService.getPublicFileList().subscribe((res)=>{
      this.whatNewData = res
      console.log(this.whatNewData)
    })
  }
  whatNewData=[]
  // cardData = [
  //   {
  //     label: "Digital Property Tax Toolkit",
  //     imgUrl: '../../../../assets/new_dashBord_ftr_hdr/shutterstock_546307051/shutterstock_546307051.png',
  //     link: ''
  //    },
  //    {
  //     label: "Municipal Borrowing Readiness Toolkit",
  //     imgUrl: '../../../../assets/new_dashBord_ftr_hdr/Group 15745/Group 15745.png',
  //     link: ''
  //    },
  //    {
  //     label: "Case study on Use of SHG for Property Tax Collection in…",
  //     imgUrl: '../../../../assets/new_dashBord_ftr_hdr/Group 15744/Group 15744.png',
  //     link: ''
  //    },
  // ]
  ngOnInit(): void {
  }

}
