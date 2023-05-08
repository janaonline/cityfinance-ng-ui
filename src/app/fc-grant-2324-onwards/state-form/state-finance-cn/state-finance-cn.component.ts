import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-state-finance-cn',
  templateUrl: './state-finance-cn.component.html',
  styleUrls: ['./state-finance-cn.component.scss']
})
export class StateFinanceCnComponent implements OnInit {

  constructor() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
   }
  nextRouter;
  backRouter;
  sideMenuItem;
  ngOnInit(): void {
    this.setRouter();
  }

  setRouter() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.folderName == "sfc") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
  }

}
