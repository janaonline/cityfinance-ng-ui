import { Component, OnInit } from '@angular/core';
import { PropertyTaxService } from './property-tax.service';

@Component({
  selector: 'app-property-tax',
  templateUrl: './property-tax.component.html',
  styleUrls: ['./property-tax.component.scss']
})
export class PropertyTaxComponent implements OnInit {

  userData = JSON.parse(localStorage.getItem("userData"));

  constructor(
    private propertyTaxService: PropertyTaxService
  ) { }

  ngOnInit(): void {

    this.loadData();
  }

  get design_year() {
    const years = JSON.parse(localStorage.getItem("Years"));
    return years?.['2023-24'];
  }

  get ulbId() {
    return this.userData?.ulb;
  }


  loadData() {
    this.propertyTaxService.getForm(this.ulbId, this.design_year, '6').subscribe(res => {
      console.log('response', res);
    });
  }


}
