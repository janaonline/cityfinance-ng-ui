import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-ulb',
  templateUrl: './edit-ulb.component.html',
  styleUrls: ['./edit-ulb.component.scss']
})
export class EditUlbComponent implements OnInit {

  constructor() { }
  sideMenuItem;
  backRouter = '';
  nextRouter = '';
  ngOnInit(): void {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftStateMenuRes"));
    this.setRouter();
  }

  setRouter() {
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.url == "edit-ulb-profile") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
  }
}
