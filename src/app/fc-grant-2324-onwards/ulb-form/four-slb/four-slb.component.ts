import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-four-slb',
  templateUrl: './four-slb.component.html',
  styleUrls: ['./four-slb.component.scss']
})
export class FourSlbComponent implements OnInit {

  constructor() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuULB"));
   }
  nextRouter;
  backRouter;
  sideMenuItem;
  ngOnInit(): void {
    this.setRouter();
  }

  setRouter() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuULB"));
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.name == "SLBs for Water Supply and Sanitation") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
  }

}
