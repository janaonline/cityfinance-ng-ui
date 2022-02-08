import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-npmc-tied',
  templateUrl: './npmc-tied.component.html',
  styleUrls: ['./npmc-tied.component.scss']
})
export class NpmcTiedComponent implements OnInit {

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
      State: "Andhra Pradesh",
      GTCOf1stInst2021_22: "",
      AuditedAnnualAccounts2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      DetailedUtilizationReport:"",
      Eligibility: "",
      claimedData: "",
      Status: "",
    },
    {
      State: "Arunachal Pradesh",
      GTCOf1stInst2021_22: "",
      AuditedAnnualAccounts2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      DetailedUtilizationReport:"",
      Eligibility: "",
      claimedData: "",
      Status: "",
    },
    {
      State: "Assam",
      GTCOf1stInst2021_22: "",
      AuditedAnnualAccounts2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      DetailedUtilizationReport:"",
      Eligibility: "",
      claimedData: "",
      Status: "",
    },
    {
      State: "Bihar",
      GTCOf1stInst2021_22: "",
      AuditedAnnualAccounts2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      DetailedUtilizationReport:"",
      Eligibility: "",
      claimedData: "",
      Status: "",
    },
    {
      State: "Chattisgarh",
      GTCOf1stInst2021_22: "",
      AuditedAnnualAccounts2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      DetailedUtilizationReport:"",
      Eligibility: "",
      claimedData: "",
      Status: "",
    },
    {
      State: "Goa",
      GTCOf1stInst2021_22: "",
      AuditedAnnualAccounts2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      DetailedUtilizationReport:"",
      Eligibility: "",
      claimedData: "",
      Status: "",
    },
    {
      State: "Gujarat",
      GTCOf1stInst2021_22: "",
      AuditedAnnualAccounts2019_20: "",
      Provisional_Annual_Accounts_2020_21: "",
      DetailedUtilizationReport:"",
      Eligibility: "",
      claimedData: "",
      Status: "",
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
