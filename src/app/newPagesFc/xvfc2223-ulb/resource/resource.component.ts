import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-resource",
  templateUrl: "./resource.component.html",
  styleUrls: ["./resource.component.scss"],
})
export class ResourceComponent implements OnInit {
  sideMenuItem:any;
  nextRouter;
  backRouter;
  constructor() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
  }

  resoucesData = [
    {
      imgurl: "../../../../assets/ulbform/overview/Picture3.png",
      link: "https://staging.cityfinance.in/assets/files/ULB%20Nodal%20Officers%20Manual%20for%20Claiming%20XV%20FC%20ULB%20Grants%20Oct%202021.pdf",
      fileName: `ULB Nodal Officers Manual for Claiming XV FC ULB Grants for 2021-22`,
      icon: "",
    },
    {
      imgurl: "../../../../assets/ulbform/overview/Picture3.png",
      link: "https://staging.cityfinance.in/assets/files/State%20Nodal%20Officers%20Manual%20for%20Claiming%20XV%20FC%20ULB%20Grants%20Oct%202021.pdf",
      fileName:
        "State Nodal Officers Manual for Claiming XV FC ULB Grants for 2021-22",
      icon: "",
    },
    {
      imgurl: "../../../../assets/ulbform/overview/Picture1.png",
      link: "https://staging.cityfinance.in/assets/files/XVFC%20VOL%20I%20Main%20Report%202021-26.pdf",
      fileName: "XV-FC VOL I Main Report 2021-26",
      icon: "",
    },
    {
      imgurl: "../../../../assets/ulbform/overview/Picture1.png",
      link: "https://staging.cityfinance.in/assets/files/XV-FC%20-VOL%20II%20Annexes.pdf",
      fileName: "XV-FC -VOL II Annexes 2021-26",
      icon: "",
    },
    {
      imgurl: "../../../../assets/ulbform/overview/Picture2.png",
      link: "https://staging.cityfinance.in/assets/files/FC-XV%20recommended%20Urban%20Local%20Body%20Final%20Operational%20Guidelines%20for%202021-26.pdf",
      fileName:
        "XV-FC recommended Urban Local Body Final Operational Guidelines for 2021-26XV-FC recommended Urban Local Body Final Operational Guidelines for 2021-26",
      icon: "",
    },
    {
      imgurl: "../../../../assets/ulbform/overview/Picture4.png",
      link: "https://staging.cityfinance.in/assets/files/13thFC-ManualGOIULB.pdf",
      fileName: "National Municipal Accounting Manual",
      icon: "",
    },
  ];
  // imageUrls = [
  //   "../../../../assets/ulbform/overview/Picture1.png",
  //   "../../../../assets/ulbform/overview/Picture2.png",
  //   "../../../../assets/ulbform/overview/Picture3.png",
  //   "../../../../assets/ulbform/overview/Picture4.png",
  //   "../../../../assets/ulbform/overview/Picture5.png",
  // ];
  ngOnInit(): void {
    for (const key in this.sideMenuItem) {
      console.log(`${key}: ${this.sideMenuItem[key]}`);
      this.sideMenuItem[key].forEach(element => {
        console.log('name name', element);
        if(element?.name == 'Resources'){
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
  }
  }
}
