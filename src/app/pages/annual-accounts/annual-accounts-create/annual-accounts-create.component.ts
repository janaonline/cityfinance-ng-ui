import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { AnnualAccountsService } from "../annual-accounts.service";
import { IStateULBCovered } from "src/app/shared/models/stateUlbConvered";
import { CommonService } from "src/app/shared/services/common.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-annual-accounts-create",
  templateUrl: "./annual-accounts-create.component.html",
  styleUrls: ["./annual-accounts-create.component.scss"],
})
export class AnnualAccountsCreateComponent implements OnInit {
  @Input() viewData;
  validateForm!: FormGroup;
  stateList: IStateULBCovered[] = [];
  ulbList: any[];
  documents = {
    financial_year_2015_16: {
      pdf: [],
      excel: [],
    },
    financial_year_2016_17: {
      pdf: [],
      excel: [],
    },
    financial_year_2017_18: {
      pdf: [],
      excel: [],
    },
    financial_year_2018_19: {
      pdf: [],
      excel: [],
    },
  };
  viewMode = false;
  ulb: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private annualAccountsService: AnnualAccountsService,
    private dataEntryService: DataEntryService,
    private _commonService: CommonService,
    public snackBar: MatSnackBar
  ) {
    this.fetchStateList();
  }

  ngOnInit() {
    if (this.viewData != undefined) {
      this.viewMode = true;
    }

    this.validateForm = this.fb.group({
      state: [{ value: null, disabled: this.viewMode }, [Validators.required]],
      bodyType: [
        { value: null, disabled: this.viewMode },
        [Validators.required],
      ],
      ulb: [{ value: null, disabled: this.viewMode }],
      ulbType: [{ value: null, disabled: "true" }],
      parastatalName: [{ value: null, disabled: this.viewMode }],
      person: [{ value: null, disabled: this.viewMode }],
      designation: [{ value: null, disabled: this.viewMode }],
      email: [{ value: null, disabled: this.viewMode }, [Validators.email]],
    });
    if (this.viewMode) {
      this.setSelectedData();
      this.fetchUlbList(this.viewData.state);
    }
  }

  setSelectedData() {
    this.validateForm.patchValue({
      state: this.viewData.state,
      bodyType: this.viewData.bodyType,
      ulb: this.viewData.ulb,
      ulbType: this.viewData.ulbType,
      parastatalName: this.viewData.parastatalName,
      person: this.viewData.person,
      designation: this.viewData.designation,
      email: this.viewData.email,
    });
  }

  fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
    });
  }

  fetchUlbList(stateId) {
    this.ulbList = null;
    this._commonService.getULBByStateCode(stateId).subscribe((res) => {
      if (res["data"]) {
        res["data"] = res["data"].sort((stateA, stateB) =>
          stateA.name > stateB.name ? 1 : -1
        );
      }
      this.ulbList = res["data"];
    });
  }

  loadUlb(event) {
    this.fetchUlbList(event.value);
  }

  updateUlbType(event) {
    this.ulb = this.ulbList.find((item) => item._id == event.value);
    this.validateForm.patchValue({ ulbType: this.ulb.ulbType.name });
  }

  resetBodyValues() {
    this.validateForm.patchValue({
      ulbType: null,
      ulb: null,
      parastatalName: null,
    });
  }

  submitForm(): void {
    this.validateForm.value["documents"] = this.documents;

    this.annualAccountsService
      .createAnnualAccounts(this.validateForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.snackBar.open("Annual Accounts Updated", "Success!", {
            duration: 3000,
          });
          this.validateForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  upload(event, type, year) {
    const fileName = event.target.files[0].name;
    const fileType = event.target.files[0].type;

    this.dataEntryService.getURLForFileUpload(fileName, fileType).subscribe(
      (response) => {
        const s3Url = response["data"][0].url;
        const finalUrl = response["data"][0].file_alias;
        this.dataEntryService
          .uploadFileToS3(event.target.files[0], s3Url)
          .subscribe(
            (response) => {
              if (response["body"]) {
                this.documents[year][type] = [
                  { name: fileName, url: finalUrl },
                ];
                console.log(this.documents);
              }
            },
            (error) => {
              console.log(error);
            }
          );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
