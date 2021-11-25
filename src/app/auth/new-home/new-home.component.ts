import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators'
@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {

  constructor() { }
  globalFilter = new FormControl();
  streets: string[] = ['Champs-Élysées 1', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]>;

  myInterval = 3000;
  activeSlideIndex = false;
  p_indi = true;
  m_indi = false;
  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;

  slides = [
    {
      image: '../../../assets/new_dashBord_ftr_hdr/modiji/Group 15517.png',
      text: `"It’s our mission to strengthen our cities to meet the challenges of 21st century"`,
       name: 'Narendra Modi',
       designation: 'Prime Minister of India',
       class: 'prim-img',
       textCls: 'p-t'
    },
    {
      image: '../../../assets/new_dashBord_ftr_hdr/ministerji/Group 15517.png',
      text: `"Municipalities need to lay a foundation of robust financial management for both,
       enhancing own revenues, as well as tapping the capital market through municipal bonds"`,
       name: 'Hardeep Singh Puri',
       designation: 'Hon’ble Union Minister of Housing and Urban Affairs',
       class: 'min-img',
       textCls: 'm-t'
    },
  ];
  whatNewData = [
    {
      image: '../../../assets/new_dashBord_ftr_hdr/shutterstock_546307051/shutterstock_546307051.png',
      fileName: '',
      label: 'Digital Property Tax Toolkit',
      text: ''

    },
    {
      image: '../../../assets/new_dashBord_ftr_hdr/Group 15744/Group 15744.png',
      fileName: '',
      label: 'XV FC Report for 2020-21',
      text: ''

    },
    {
      image: '../../../assets/new_dashBord_ftr_hdr/Group 15745/Group 15745.png',
      fileName: '',
      label: 'Municipal Performance Index',
      text: ''
    }


  ];

  ngOnInit(): void {
    this.filteredStreets = this.globalFilter.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }
  private _filter(value: string): string[] {
    // console.log('value', value)
    if(value != ''){
      const filterValue = this._normalizeValue(value);
      return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
    }

  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  carouselClass(e) {
    console.log('crrrrr', e)
    if(e == 0){
      this.p_indi = true;
      this.m_indi = false;
    }
    if(e == 1){
      this.m_indi = true;
      this.p_indi = false;
    }
  }
}
