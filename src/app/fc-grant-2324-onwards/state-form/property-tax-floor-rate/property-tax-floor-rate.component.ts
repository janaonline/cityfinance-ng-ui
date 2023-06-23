import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-tax-floor-rate',
  templateUrl: './property-tax-floor-rate.component.html',
  styleUrls: ['./property-tax-floor-rate.component.scss']
})
export class PropertyTaxFloorRateComponent implements OnInit {

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
        if (element?.folderName == "property_tax_notification") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
  }
}
