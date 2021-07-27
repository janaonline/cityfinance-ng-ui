import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { services, targets } from '../../../users/data-upload/components/configs/water-waste-management';
import { IFinancialData, WaterManagement } from '../../../users/data-upload/models/financial-data.interface';
import { IUserLoggedInDetails } from "../../../models/login/userLoggedInDetails";
import { USER_TYPE } from "../../../models/user/userType";
import { UserUtility } from "../../../util/user/user";
import { ProfileService } from "../../../users/profile/service/profile.service";
import { IState } from "../../../models/state/state";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CommonService } from "src/app/shared/services/common.service";
import { Router } from '@angular/router';
import { WaterSupplyService } from './water-supply.service';
import { WaterSupplyPreviewComponent } from './water-supply-preview/water-supply-preview.component';
@Component({
  selector: 'app-water-supply',
  templateUrl: './water-supply.component.html',
  styleUrls: ['./water-supply.component.scss']
})
export class WaterSupplyComponent implements OnInit {
  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  tableData: any;
  currentSort = 1;
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };
  listFetchOption = {
    filter: null,
    sort: null,
    role: null,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };
  loading = false;
  filterObject;
  // fcFormListSubscription: Subscription;
  nodataFound = false;
  apiData = false;
  errMessage = '';
  constructor(
    private _commonService: CommonService,
    private profileService: ProfileService,
    private _router: Router,
    private dialog: MatDialog,
    private _WaterSupplyService: WaterSupplyService
  ) {
    this.initializeUserType();
    this.fetchStateList();
    this.initializeLoggedInUserDataFetch();
  }
  waterWasteManagementForm: FormGroup;

  focusTargetKey: any = {}
  focusTargetKeyForErrorMessages: any = {}
  targets = targets;
  // @ViewChild("template") template;
  benchmarks = []
  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;
  detailsOfUa;
  uasList;
  ngOnInit() {
    this.uasList = Object.values(JSON.parse(sessionStorage.getItem("UasList")))
    console.log(this.uasList)



    this.services.forEach(data => {
      this.focusTargetKey[data.key + 'baseline'] = false
      this.targets.forEach(item => {
        this.focusTargetKey[data.key + item.key] = false
      })
    })
    this.services.forEach(data => {
      this.focusTargetKeyForErrorMessages[data.key + 'baseline'] = false
      this.targets.forEach(item => {
        this.focusTargetKeyForErrorMessages[data.key + item.key] = false
      })
    })

    this.benchmarks = this.services.map((el) => (parseInt(el.benchmark)))
    console.log(this.benchmarks);
    console.log('target', this.targets)
    console.log('serv', this.services);
    console.log('basline', this.focusTargetKey)
    // this.getwaterSuppyData();


  }
  // getwaterSuppyData() {
  //   this._WaterSupplyService.getslbsData()
  //     .subscribe((res) => {
  //       console.log('response', res)
  //       let ulbdetails: any = res;
  //       this.detailsOfUa = ulbdetails.data;
  //       console.log(this.detailsOfUa);

  //       this.uasList.forEach(el => {
  //         this.detailsOfUa.forEach(el2 => {
  //           if (el.name == el2.uaName) {
  //             console.log('match', el.name)
  //             el['data'] = el2;
  //           } else {
  //             el['data'] = null;
  //           }
  //         })

  //       })
  //       console.log(this.uasList)
  //     })
  // }

  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
      console.log('res', res)
    });
  }
  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    // this.searchUsersBy(this.filterForm.value);
  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
    console.log(this._router.url);
  }
  private initializeLoggedInUserDataFetch() {
    //  = this.profileService.getUserLoggedInDetails();
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;
      console.log("hi", data);
    });
    if (!this.userLoggedInDetails) {
      return this._router.navigate(["/login"]);
    }
    switch (this.userLoggedInDetails.role) {
      case USER_TYPE.STATE:
      case USER_TYPE.ULB:
        return this.fetchStateList();
    }
  }

  public isCollapsed: boolean[] = [];
  message = 'expanded';

  collapsed(i): void {
    this.message = 'collapsed';
    console.log('collapsed', i)
  }

  collapses(i): void {
    this.message = 'collapses';
  }

  expanded(i): void {
    this.message = 'expanded';
  }

  expands(i): void {
    this.message = 'expands';
  }
  uaDetails;
  openDialog(template, uaDetails) {
    console.log(uaDetails)
    this.uaDetails = uaDetails
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(template, {
      height: "auto",
      width: "600px"
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialog2(template1, uaDetails) {
    this.uaDetails = uaDetails
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(template1, {
      height: "auto",
      width: "600px"
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onPreview() {
    let dialogRef = this.dialog.open(WaterSupplyPreviewComponent, {
      height: "100%",
      width: "90%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getData = null
  totalULBsInUA = 0;
  totalCompletedUlb = 0
  totalPendingUlb = 0
  approvedStatusData = []
  statusData = []
  foldCard(index, ua_id) {
    console.log(ua_id)
    this._WaterSupplyService.getslbsData(ua_id).subscribe(
      (res) => {
        console.log(res['data'])
        let data = res['data']
        this.statusData = []
        this.approvedStatusData = []
        this.getData = res['data']
        this.totalULBsInUA = data[1]?.completedAndpendingSubmission.length +
          data[1]?.pendingCompletion.length +
          data[1]?.underStateReview.length +
          data[0]?.total

        this.totalCompletedUlb = data[0]?.total;

        this.totalPendingUlb = data[1]?.completedAndpendingSubmission.length +
          data[1]?.pendingCompletion.length +
          data[1]?.underStateReview.length
        for (let key in this.getData[1]) {
          if (key === 'completedAndpendingSubmission') {
            if (this.getData[1][key].length > 0) {
              this.getData[1][key].forEach(el => {
                this.statusData.push(
                  {
                    name: el.name,
                    censusCode: el.censusCode,
                    sbCode: el.sbCode,
                    status: 'Completed And Pending Submission'
                  }
                )
              })

            }

          } else if (key === 'pendingCompletion') {
            if (this.getData[1][key].length > 0) {
              this.getData[1][key].forEach(el => {
                this.statusData.push(
                  {
                    name: el.name,
                    censusCode: el.censusCode,
                    sbCode: el.sbCode,
                    status: 'Pending Completion'
                  }
                )
              })

            }

          } else if (key === 'underStateReview') {
            if (this.getData[1][key].length > 0) {
              this.getData[1][key].forEach(el => {
                this.statusData.push(
                  {
                    name: el.name,
                    censusCode: el.censusCode,
                    sbCode: el.sbCode,
                    status: 'Under State Review'
                  }
                )
              })

            }

          }
        }
        this.getData[0].ulbData.forEach(el => {
          this.approvedStatusData.push({
            name: el.name,
            censusCode: el.censusCode,
            sbCode: el.sbCode
          })
        })

      },
      (err) => {
        this.getData = null
      }
    )
    this.isCollapsed[index] = !this.isCollapsed[index];
    console.log(this.isCollapsed.length, this.uasList);

    for (let i = 0; i <= this.uasList.length; i++) {
      console.log(i);
      if (i != index) {
        this.isCollapsed[i] = false;
      }
    }

  }

}


