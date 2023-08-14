import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-common-state-dashboard',
  templateUrl: './common-state-dashboard.component.html',
  styleUrls: ['./common-state-dashboard.component.scss']
})
export class CommonStateDashboardComponent implements OnInit {

  constructor() { }

  @Input() stateInfo = {
    title: '',
    name: '',
    id: '',
    data: [
      {
        key: 'totalUlbs',
        label: 'Total ULBs',
        icon: '../../../../assets/dashboard-state/16-location.svg',
        tooltip: '',
        value: '50'
      },
      {
        key: 'nonMillionCities',
        label: 'Non Million Cities',
        icon: '../../../../assets/dashboard-state/XMLID_1248_.svg',
        tooltip: '',
        value: '50'
      },
      {
        key: 'millionPlusUAs',
        label: 'Million Plus UAs',
        icon: '../../../../assets/dashboard-state/sustainable.svg',
        tooltip: '',
        value: '20'
      },
      {
        key: 'UlbInMillionPlusUA',
        label: 'ULBs in Million-Plus UAs',
        icon: '../../../../assets/dashboard-state/16-location.svg',
        tooltip: '',
        value: '40'
      },


    ]
  };
  @Input() citiesType;
  @Input() stateId: string;
  @Input() designYear: string;
  @Input() allData;
  @Input() formDataCompleted: boolean = false;
  @Output() cityTabClick = new EventEmitter<any | object>();
  selectedItem: string = 'nmpc_untied';
  viewMode: string = 'tab1';
  params: object | any;
  installmentType: string = '1';
  selectedCity: object | any;
  ngOnInit(): void {
    console.log('abcd', this.citiesType);
    // this.selectedCity = this.citiesType?.data[0];
    this.cityTabChange(this.citiesType?.data[0])
  }

  cityTabChange(item) {
    console.log(item)
    this.selectedItem = item?.formType
    this.viewMode = item?.viewMode
    this.selectedCity = item;
    const passValue = {
      data: item,
      formType: this.selectedItem,
      type: 'cityTabChange'
    }
    this.cityTabClick.emit(passValue);
  }
  installmentChange(instl){
    this.selectedCity?.installments?.forEach((elem)=>{
      elem.isActive = false;
    });
    instl["isActive"] = true;
    const passValue = {
      data: instl,
      formType: this.selectedItem,
      type: 'installmentsChange'
    }
    this.cityTabClick.emit(passValue);
  }

  navigateToPage(data) {
    const passValue = {
      data: data,
      type: 'pageNavigation'
    }
    this.cityTabClick.emit(passValue);
  }
  keepOriginalOrder = (a, b) => b.key - a.key;

  claimGrant(){
    // need to discuss --- with client

    
    // swal("Saved", "Claimed Grant !!!!.", "success");
  }
}
