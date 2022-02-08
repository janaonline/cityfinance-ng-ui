import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-npmc-untied',
  templateUrl: './npmc-untied.component.html',
  styleUrls: ['./npmc-untied.component.scss']
})
export class NpmcUntiedComponent implements OnInit {

  

  mpcTableData = [
    {
      state: "Andhra Pradesh",
      gtc: "No",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Arunachal Pradesh",
      gtc: "No",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Assam",
      gtc: "No",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Bihar",
      gtc: "No",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Chattisgarh",
      gtc: "Yes",
      mpcEligibility: "yes",
      claimed_data: "",
      status: "Under review by MoF",
    },
    {
      state: "Goa",
      gtc: "Yes",
      mpcEligibility: "Yes",
      claimed_data: "",
      status: "Grant released",
    },
    {
      state: "Gujarat",
      gtc: "Yes",
      mpcEligibility: "Yes",
      claimed_data: "",
      status: "Grant released",
    },
  ];
  

  mpcTableDataTwo = [
    {
      state: "Andhra Pradesh",
      gtc: "No",
      Audited_Annual_Accounts_2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Arunachal Pradesh",
      gtc: "No",
      Audited_Annual_Accounts_2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Assam",
      gtc: "No",
      Audited_Annual_Accounts_2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Bihar",
      gtc: "No",
      Audited_Annual_Accounts_2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Chattisgarh",
      gtc: "Yes",
      Audited_Annual_Accounts_2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Goa",
      gtc: "Yes",
      Audited_Annual_Accounts_2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
    {
      state: "Gujarat",
      gtc: "Yes",
      Audited_Annual_Accounts_2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      mpcEligibility: "",
      claimed_data: "",
      status: "",
    },
  ];
  




  installTabValue: any = "first";

  @Output()
  closeDialog = new EventEmitter();

  constructor() {}

  closeModal() {
    this.closeDialog.emit(true);
  }

  installTabFirst( ) {
    this.installTabValue = "first"
  }

  installTabSecond( ) {
    this.installTabValue = "second"
  }


  ngOnInit(): void {
  }

}
