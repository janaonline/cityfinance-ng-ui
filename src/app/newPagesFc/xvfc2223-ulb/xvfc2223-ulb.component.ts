import { Component, OnInit } from '@angular/core';
import { NewCommonService } from "../../shared2223/services/new-common.service";
@Component({
  selector: "app-xvfc2223-ulb",
  templateUrl: "./xvfc2223-ulb.component.html",
  styleUrls: ["./xvfc2223-ulb.component.scss"],
})
export class Xvfc2223UlbComponent implements OnInit {
  // leftMenu: any = {
  //   success: true,
  //   data: {
  //     "": [
  //       {
  //         _id: "62aa29ac82b30b29a283a841",
  //         isActive: true,
  //         name: "Overview",
  //         category: "",
  //         url: "overview",
  //         role: "ULB",
  //         position: 1,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //     ],
  //     "Entry Level Conditions": [
  //       {
  //         _id: "62aa1bbec9a98b2254632a86",
  //         isActive: true,
  //         name: "Grant Transfer Certificate",
  //         category: "Entry Level Conditions",
  //         url: "grant-tra-certi",
  //         role: "ULB",
  //         position: 1,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1b04729673217e5ca3aa",
  //         isActive: true,
  //         name: "Annual Accounts",
  //         category: "Entry Level Conditions",
  //         url: "annual_acc",
  //         role: "ULB",
  //         position: 2,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1c96c9a98b2254632a8a",
  //         isActive: true,
  //         name: "Detailed Utilisation Report",
  //         category: "Entry Level Conditions",
  //         url: "utilisation-report",
  //         role: "ULB",
  //         position: 3,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1cc9c9a98b2254632a8e",
  //         isActive: true,
  //         name: "Linking of PFMS Account",
  //         category: "Entry Level Conditions",
  //         url: "pfms_acc",
  //         role: "ULB",
  //         position: 4,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1ceac9a98b2254632a92",
  //         isActive: true,
  //         name: "Property Tax Operationalisation",
  //         category: "Entry Level Conditions",
  //         url: "ptax",
  //         role: "ULB",
  //         position: 5,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //     ],
  //     "Performance Conditions": [
  //       {
  //         _id: "62aa1dadc9a98b2254632aa6",
  //         isActive: true,
  //         name: "SLBs for Water Supply and Sanitation",
  //         category: "Performance Conditions",
  //         url: "slbs",
  //         role: "ULB",
  //         position: 1,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1dc0c9a98b2254632aaa",
  //         isActive: true,
  //         name: "Open Defecation Free (ODF)",
  //         category: "Performance Conditions",
  //         url: "odf",
  //         role: "ULB",
  //         position: 2,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //       {
  //         _id: "62aa1dd6c9a98b2254632aae",
  //         isActive: true,
  //         name: "Garbage Free City (GFC)",
  //         category: "Performance Conditions",
  //         url: "gfc",
  //         role: "ULB",
  //         position: 3,
  //         year: "606aafb14dff55e6c075d3ae",
  //         code: "ULB2022-23",
  //         icon: "",
  //         __v: 0,
  //       },
  //     ],
  //   },
  // };
  leftMenu: any;
  constructor(private newCommonService: NewCommonService) {
    this.getSideBar();
  }

  ngOnInit(): void {
    console.log("left responces..", this.leftMenu);
  }
  getSideBar() {
    this.newCommonService.getULBLeftMenu().subscribe((res: any) => {
      console.log("left responces..", res);
      this.leftMenu = res;
    });
  }
}
