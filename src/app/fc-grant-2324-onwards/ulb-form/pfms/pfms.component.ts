import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pfms',
  templateUrl: './pfms.component.html',
  styleUrls: ['./pfms.component.scss']
})
export class PfmsComponent implements OnInit {

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
        if (element?.name == "Linking of PFMS Account") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
  }

}
