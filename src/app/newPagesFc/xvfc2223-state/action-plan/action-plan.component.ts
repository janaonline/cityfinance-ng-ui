import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { Router, NavigationStart, Event } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SweetAlert } from "sweetalert/typings/core";
import { UserUtility } from "src/app/util/user/user";
import { USER_TYPE } from "src/app/models/user/userType";
import { IUserLoggedInDetails } from "../../../models/login/userLoggedInDetails";
import { ProfileService } from "src/app/users/profile/service/profile.service";
import { FasDirective } from "angular-bootstrap-md";
const swal: SweetAlert = require("sweetalert");
import * as fileSaver from "file-saver";
import { StateformsService } from "src/app/pages/stateforms/stateforms.service";
import { ActionplanserviceService } from "src/app/pages/stateforms/action-plan-ua/actionplanservice.service";
import { ActionplanspreviewComponent } from "src/app/pages/stateforms/action-plan-ua/actionplanspreview/actionplanspreview.component";

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.scss']
})
export class ActionPlanComponent implements OnInit {
  userLoggedInDetails: IUserLoggedInDetails;
  // loggedInUserType: USER_TYPE;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType = this.loggedInUserDetails.role;

  uasData = JSON.parse(sessionStorage.getItem("UasList"));
  Year = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));

  data = null;
  yearCode = "2021-22";
  ulbNames = {};
  saveBtnText = "NEXT";
  routerNavigate = null;
  uaCodes = {};
  showLoader = true;
  projectCategories = [];
  @ViewChild("template") template;
  @ViewChild("template1") template1;
  dialogRefForNavigation;
  actionRes = [];
  constructor(
    public stateformsService: StateformsService,
    public actionplanserviceService: ActionplanserviceService,
    private _router: Router,
    private dialog: MatDialog,
    private profileService: ProfileService,

  ) {
    this.initializeUserType();
    this._router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url === "/" || event.url === "/login") {
          sessionStorage.setItem("changeInActionPlans2223", "false");
          return;
        }
        const change = sessionStorage.getItem("changeInActionPlans2223");
        if (change === "true" && this.routerNavigate === null) {
          this.dialog.closeAll();
          this.routerNavigate = event;
          const currentRoute = this._router.routerState;
          this._router.navigateByUrl(currentRoute.snapshot.url, {
            skipLocationChange: true,
          });
          this.openModal(this.template);
        }
      }
    });
  }
  disableAllForms = false;
  actionFormDisable = false;
  isStateSubmittedForms = "";
  allStatus;
  formDisable = false;
  backButtonClicked = false
  dummyData2 = { 
    uaData: [
      {
          "rejectReason": "",
          "status": "",
          "ua": "6130d5a5f9c6d7756b174484",
          "projectExecute": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_28/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": null,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  }
              }
          ],
          "sourceFund": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_28/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": null,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": null,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              }
          ],
          "yearOutlay": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_28/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              }
          ],
          "name": "Indore U.A.",
          "ulbList": [
              "Indore Municipal Corporation",
              "Parastatal Agency"
          ],
          "code": "MP/UA_28/2021-22",
          "fold": false
      },
      {
          "rejectReason": "",
          "status": "",
          "ua": "6130d5a5f9c6d7756b17448a",
          "projectExecute": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Improvement of existing water supply",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "AMRUT Phase -II\n",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 66000,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "Bhopal Municipal Corporation",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "Drinking Water",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "New project",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "Improvement of facility of water supply",
                      "isEmpty": false,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 2,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/2",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Upper lake",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "Development & renovation work of walkway, ghats, Greenery, Fencing, pitching. Disilting and Installation of fountains and repair, Deployment of labor for cleaning of lake, O&M of Vehicles, ",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 780,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "Bhopal Municipal Corporation",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "Rejuvenation of Water Bodies",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "Augmentation of existing infrastructure",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "Rejuvenation of water bodies",
                      "isEmpty": false,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 3,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/3",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvnation of Shahpura lake",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "Development & renovation work of walkway, ghats, Greenery, Fencing, pitching. Disilting and Installation of fountains and repair, Deployment of labor for cleaning of lake, O&M of Vehicles, ",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 165,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "Bhopal Municipal Corporation",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "Rejuvenation of Water Bodies",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "Augmentation of existing infrastructure",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "Rejuvenation of water bodies",
                      "isEmpty": false,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 4,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/4",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvnation of Neelbadh Lale",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "Development & renovation work of walkway, ghats, Greenery, Fencing, pitching. Disilting and Installation of fountains and repair, Deployment of labor for cleaning of lake, O&M of Vehicles, ",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 155,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "Bhopal Municipal Corporation",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "Rejuvenation of Water Bodies",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "Augmentation of existing infrastructure",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "Rejuvenation of water bodies",
                      "isEmpty": false,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/5",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Maholi damkheda STP",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "AMRUT PHASE 1",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 3200,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "Bhopal Municipal Corporation",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "Water Recycling",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "Any ongoing projects under existing schemes",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "35 MLD STP",
                      "isEmpty": false,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 6,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/6",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Sankkhedi STP",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "Amrut Phase -1",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 5700,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "Bhopal Municipal Corporation",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "Water Recycling",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "Any ongoing projects under existing schemes",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "32 MLD STP",
                      "isEmpty": false,
                      "lastValidation": true
                  }
              }
          ],
          "sourceFund": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Improvement of existing water supply",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 66000,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 13200,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 52800,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": 66000,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 13200,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 13200,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 13200,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 13200,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 13200,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 2,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/2",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Upper lake",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 780,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 780,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": 780,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 150,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 140,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 155,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 160,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 175,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 3,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/3",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvnation of Shahpura lake",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 165,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 165,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": 165,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 30,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 30,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 30,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 35,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 40,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 4,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/4",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvnation of Neelbadh Lale",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 155,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 155,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": 155,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 20,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 30,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 30,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 35,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 40,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/5",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Maholi damkheda STP",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 3200,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 640,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 2560,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": 3200,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 640,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 640,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 640,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 640,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 640,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 6,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/6",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Sankkhedi STP",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 5700,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 1140,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 4560,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": 5700,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 1140,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 1140,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 1140,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 1140,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 1140,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              }
          ],
          "yearOutlay": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Improvement of existing water supply",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 66000,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 20,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 13200,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 2640,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 2640,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 2640,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 2640,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 2640,
                      "isEmpty": false,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 2,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/2",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Upper lake",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 780,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 100,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 780,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 150,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 140,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 155,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 160,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 175,
                      "isEmpty": false,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 3,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/3",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvnation of Shahpura lake",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 165,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 100,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 165,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 30,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 30,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 30,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 35,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 40,
                      "isEmpty": false,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 4,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/4",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvnation of Neelbadh Lale",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 155,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 100,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 155,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 20,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 30,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 30,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 35,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 40,
                      "isEmpty": false,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/5",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Maholi damkheda STP",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 3200,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 20,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 640,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 128,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 128,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 128,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 128,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 128,
                      "isEmpty": false,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 6,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_31/2021-22/6",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Sankkhedi STP",
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 5700,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 20,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 1140,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 228,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 228,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 228,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 228,
                      "isEmpty": false,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 228,
                      "isEmpty": false,
                      "lastValidation": true
                  }
              }
          ],
          "name": "Bhopal U.A.",
          "ulbList": [
              "Bhopal Municipal Corporation",
              "Parastatal Agency"
          ],
          "code": "MP/UA_31/2021-22",
          "fold": true
      },
      {
          "rejectReason": "",
          "status": "",
          "ua": "6130d5a5f9c6d7756b17448b",
          "projectExecute": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_32/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": null,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  }
              }
          ],
          "sourceFund": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_32/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": null,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": null,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              }
          ],
          "yearOutlay": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_32/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              }
          ],
          "name": "Gwalior U.A.",
          "ulbList": [
              "Gwalior Municipal Corporation",
              "Morar Cantt"
          ],
          "code": "MP/UA_32/2021-22"
      },
      {
          "rejectReason": "",
          "status": "",
          "ua": "6130d5a5f9c6d7756b17448c",
          "projectExecute": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Ranitaal Lake",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "De-silting/De-weeding, pathways,Provision of aeration instruments, green corridor, water sports, developments of ghats & vendor hub etc",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 7.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "Jabalpur Municipal Corporation",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "Rejuvenation of Water Bodies",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "Augmentation of existing infrastructure",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "NA",
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 2,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/2",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Sangram Sagar Lake",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "De-silting/De-weeding, pathways,provision of solor lighting, Provision of aeration instruments, green corridor, water sports, STP , development of ghat etc",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 4.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "Jabalpur Municipal Corporation",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "Rejuvenation of Water Bodies",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "Augmentation of existing infrastructure",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "NA",
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 3,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/3",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Madhotal, near ISBT",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "De-silting/De-weeding, pathways, walkway, railing, provision of solor lighting, decorative lighting, Provision of aeration instruments, green corridor, plantation, water sports, laying of pipe line for treated water supply  etc..",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 9,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "Jabalpur Municipal Corporation",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "Rejuvenation of Water Bodies",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "New project",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "NA",
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 4,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/4",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Recycling & Reuse of waste water.",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "Laying of underground sewer line, construction of STPs, House connection & recycling - reuse of waste water in balance area of jabalpur city.",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 704.21,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "Jabalpur Municipal Corporation",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "Sanitation",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "Augmentation of existing infrastructure",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "172000",
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/5",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Drinking water for balance area of the city",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Details": {
                      "value": "Laying of rising main, distribution main, house connection, construction of WTP, construction of OHT etc.",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 265,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Executing_Agency": {
                      "value": "Jabalpur Municipal Corporation",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Parastatal_Agency": {
                      "value": "N/A",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Sector": {
                      "value": "Drinking Water",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Type": {
                      "value": "Augmentation of existing infrastructure",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Estimated_Outcome": {
                      "value": "82500",
                      "isEmpty": null,
                      "lastValidation": true
                  }
              }
          ],
          "sourceFund": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Ranitaal Lake",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 7.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 7.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": 7.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0.25,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 4,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 3.25,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 2,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/2",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Sangram Sagar Lake",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 4.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 4.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": 4.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0.2,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 2.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 1.8,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 3,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/3",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Madhotal, near ISBT",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 9,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 211.26,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 492.95,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": 704.21,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 140.84,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 246.47,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 316.89,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 4,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/4",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Recycling & Reuse of waste water.",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 704.21,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": null,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/5",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Drinking water for balance area of the city",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 265,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "XV_FC": {
                      "value": 79.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Other": {
                      "value": 185.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Total": {
                      "value": 265,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0.53,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 92.75,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 119.25,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              }
          ],
          "yearOutlay": [
              {
                  "index": {
                      "value": 1,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/1",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Ranitaal Lake",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 7.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 100,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 7.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 2,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/2",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Sangram Sagar Lake",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 4.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 100,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 4.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 3,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/3",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Rejuvenation of Madhotal, near ISBT",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 9,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 2300,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 211.26,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 4,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/4",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Recycling & Reuse of waste water.",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 704.21,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              },
              {
                  "index": {
                      "value": 5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Code": {
                      "value": "MP/UA_33/2021-22/5",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Project_Name": {
                      "value": "Drinking water for balance area of the city",
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Cost": {
                      "value": 265,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Funding": {
                      "value": 30,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "Amount": {
                      "value": 79.5,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2021-22": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2022-23": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2023-24": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2024-25": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  },
                  "2025-26": {
                      "value": 0,
                      "isEmpty": null,
                      "lastValidation": true
                  }
              }
          ],
          "name": "Jabalpur U.A.",
          "ulbList": [
              "Jabalpur Municipal Corporation",
              "Jabalpur Cantt"
          ],
          "code": "MP/UA_33/2021-22"
      }
  ]
  };
  dummyData={
    "_id": "61d57874e44a151ac3fcbb4e",
    "design_year": "606aaf854dff55e6c075d219",
    "state": "5dcf9d7416a06aed41c748ef",
    "__v": 0,
    "actionTakenBy": "5fcf3801ff874c1ad9774c8a",
    "createdAt": "2022-01-04T08:56:47.920Z",
    "isActive": true,
    "isDraft": true,
    "modifiedAt": "2022-01-12T10:52:46.018Z",
    "status": "PENDING",
    "uaData": [
        {
            "rejectReason": "",
            "status": "",
            "ua": "6130d5a5f9c6d7756b174484",
            "projectExecute": [
                {
                    "Project_Code": "MP/UA_28/2021-22/1",
                    "Project_Name": "",
                    "Details": "",
                    "Cost": null,
                    "Executing_Agency": "",
                    "Parastatal_Agency": "",
                    "Sector": "",
                    "Type": "",
                    "Estimated_Outcome": ""
                }
            ],
            "sourceFund": [
                {
                    "Project_Code": "MP/UA_28/2021-22/1",
                    "Project_Name": "",
                    "Cost": null,
                    "XV_FC": 0,
                    "Other": 0,
                    "Total": null,
                    "2021-22": 0,
                    "2022-23": 0,
                    "2023-24": 0,
                    "2024-25": 0,
                    "2025-26": 0
                }
            ],
            "yearOutlay": [
                {
                    "Project_Code": "MP/UA_28/2021-22/1",
                    "Project_Name": "",
                    "Cost": 0,
                    "Funding": 0,
                    "Amount": 0,
                    "2021-22": 0,
                    "2022-23": 0,
                    "2023-24": 0,
                    "2024-25": 0,
                    "2025-26": 0
                }
            ]
        },
        {
            "rejectReason": "",
            "status": "",
            "ua": "6130d5a5f9c6d7756b17448a",
            "projectExecute": [
                {
                    "Project_Code": "MP/UA_31/2021-22/1",
                    "Project_Name": "Improvement of existing water supply",
                    "Details": "AMRUT Phase -II\n",
                    "Cost": 66000,
                    "Executing_Agency": "Bhopal Municipal Corporation",
                    "Parastatal_Agency": "N/A",
                    "Sector": "Drinking Water",
                    "Type": "New project",
                    "Estimated_Outcome": "Improvement of facility of water supply"
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/2",
                    "Project_Name": "Rejuvenation of Upper lake",
                    "Details": "Development & renovation work of walkway, ghats, Greenery, Fencing, pitching. Disilting and Installation of fountains and repair, Deployment of labor for cleaning of lake, O&M of Vehicles, ",
                    "Cost": 780,
                    "Executing_Agency": "Bhopal Municipal Corporation",
                    "Parastatal_Agency": "N/A",
                    "Sector": "Rejuvenation of Water Bodies",
                    "Type": "Augmentation of existing infrastructure",
                    "Estimated_Outcome": "Rejuvenation of water bodies"
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/3",
                    "Project_Name": "Rejuvnation of Shahpura lake",
                    "Details": "Development & renovation work of walkway, ghats, Greenery, Fencing, pitching. Disilting and Installation of fountains and repair, Deployment of labor for cleaning of lake, O&M of Vehicles, ",
                    "Cost": 165,
                    "Executing_Agency": "Bhopal Municipal Corporation",
                    "Parastatal_Agency": "N/A",
                    "Sector": "Rejuvenation of Water Bodies",
                    "Type": "Augmentation of existing infrastructure",
                    "Estimated_Outcome": "Rejuvenation of water bodies"
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/4",
                    "Project_Name": "Rejuvnation of Neelbadh Lale",
                    "Details": "Development & renovation work of walkway, ghats, Greenery, Fencing, pitching. Disilting and Installation of fountains and repair, Deployment of labor for cleaning of lake, O&M of Vehicles, ",
                    "Cost": 155,
                    "Executing_Agency": "Bhopal Municipal Corporation",
                    "Parastatal_Agency": "N/A",
                    "Sector": "Rejuvenation of Water Bodies",
                    "Type": "Augmentation of existing infrastructure",
                    "Estimated_Outcome": "Rejuvenation of water bodies"
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/5",
                    "Project_Name": "Maholi damkheda STP",
                    "Details": "AMRUT PHASE 1",
                    "Cost": 3200,
                    "Executing_Agency": "Bhopal Municipal Corporation",
                    "Parastatal_Agency": "N/A",
                    "Sector": "Water Recycling",
                    "Type": "Any ongoing projects under existing schemes",
                    "Estimated_Outcome": "35 MLD STP"
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/6",
                    "Project_Name": "Sankkhedi STP",
                    "Details": "Amrut Phase -1",
                    "Cost": 5700,
                    "Executing_Agency": "Bhopal Municipal Corporation",
                    "Parastatal_Agency": "N/A",
                    "Sector": "Water Recycling",
                    "Type": "Any ongoing projects under existing schemes",
                    "Estimated_Outcome": "32 MLD STP"
                }
            ],
            "sourceFund": [
                {
                    "Project_Code": "MP/UA_31/2021-22/1",
                    "Project_Name": "Improvement of existing water supply",
                    "Cost": 66000,
                    "XV_FC": 13200,
                    "Other": 52800,
                    "Total": 66000,
                    "2021-22": 13200,
                    "2022-23": 13200,
                    "2023-24": 13200,
                    "2024-25": 13200,
                    "2025-26": 13200
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/2",
                    "Project_Name": "Rejuvenation of Upper lake",
                    "Cost": 780,
                    "XV_FC": 780,
                    "Other": 0,
                    "Total": 780,
                    "2021-22": 150,
                    "2022-23": 140,
                    "2023-24": 155,
                    "2024-25": 160,
                    "2025-26": 175
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/3",
                    "Project_Name": "Rejuvnation of Shahpura lake",
                    "Cost": 165,
                    "XV_FC": 165,
                    "Other": 0,
                    "Total": 165,
                    "2021-22": 30,
                    "2022-23": 30,
                    "2023-24": 30,
                    "2024-25": 35,
                    "2025-26": 40
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/4",
                    "Project_Name": "Rejuvnation of Neelbadh Lale",
                    "Cost": 155,
                    "XV_FC": 155,
                    "Other": 0,
                    "Total": 155,
                    "2021-22": 20,
                    "2022-23": 30,
                    "2023-24": 30,
                    "2024-25": 35,
                    "2025-26": 40
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/5",
                    "Project_Name": "Maholi damkheda STP",
                    "Cost": 3200,
                    "XV_FC": 640,
                    "Other": 2560,
                    "Total": 3200,
                    "2021-22": 640,
                    "2022-23": 640,
                    "2023-24": 640,
                    "2024-25": 640,
                    "2025-26": 640
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/6",
                    "Project_Name": "Sankkhedi STP",
                    "Cost": 5700,
                    "XV_FC": 1140,
                    "Other": 4560,
                    "Total": 5700,
                    "2021-22": 1140,
                    "2022-23": 1140,
                    "2023-24": 1140,
                    "2024-25": 1140,
                    "2025-26": 1140
                }
            ],
            "yearOutlay": [
                {
                    "Project_Code": "MP/UA_31/2021-22/1",
                    "Project_Name": "Improvement of existing water supply",
                    "Cost": 66000,
                    "Funding": 20,
                    "Amount": 13200,
                    "2021-22": 2640,
                    "2022-23": 2640,
                    "2023-24": 2640,
                    "2024-25": 2640,
                    "2025-26": 2640
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/2",
                    "Project_Name": "Rejuvenation of Upper lake",
                    "Cost": 780,
                    "Funding": 100,
                    "Amount": 780,
                    "2021-22": 150,
                    "2022-23": 140,
                    "2023-24": 155,
                    "2024-25": 160,
                    "2025-26": 175
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/3",
                    "Project_Name": "Rejuvnation of Shahpura lake",
                    "Cost": 165,
                    "Funding": 100,
                    "Amount": 165,
                    "2021-22": 30,
                    "2022-23": 30,
                    "2023-24": 30,
                    "2024-25": 35,
                    "2025-26": 40
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/4",
                    "Project_Name": "Rejuvnation of Neelbadh Lale",
                    "Cost": 155,
                    "Funding": 100,
                    "Amount": 155,
                    "2021-22": 20,
                    "2022-23": 30,
                    "2023-24": 30,
                    "2024-25": 35,
                    "2025-26": 40
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/5",
                    "Project_Name": "Maholi damkheda STP",
                    "Cost": 3200,
                    "Funding": 20,
                    "Amount": 640,
                    "2021-22": 128,
                    "2022-23": 128,
                    "2023-24": 128,
                    "2024-25": 128,
                    "2025-26": 128
                },
                {
                    "Project_Code": "MP/UA_31/2021-22/6",
                    "Project_Name": "Sankkhedi STP",
                    "Cost": 5700,
                    "Funding": 20,
                    "Amount": 1140,
                    "2021-22": 228,
                    "2022-23": 228,
                    "2023-24": 228,
                    "2024-25": 228,
                    "2025-26": 228
                }
            ]
        },
        {
            "rejectReason": "",
            "status": "",
            "ua": "6130d5a5f9c6d7756b17448b",
            "projectExecute": [
                {
                    "Project_Code": "MP/UA_32/2021-22/1",
                    "Project_Name": "",
                    "Details": "",
                    "Cost": null,
                    "Executing_Agency": "",
                    "Parastatal_Agency": "",
                    "Sector": "",
                    "Type": "",
                    "Estimated_Outcome": ""
                }
            ],
            "sourceFund": [
                {
                    "Project_Code": "MP/UA_32/2021-22/1",
                    "Project_Name": "",
                    "Cost": null,
                    "XV_FC": 0,
                    "Other": 0,
                    "Total": null,
                    "2021-22": 0,
                    "2022-23": 0,
                    "2023-24": 0,
                    "2024-25": 0,
                    "2025-26": 0
                }
            ],
            "yearOutlay": [
                {
                    "Project_Code": "MP/UA_32/2021-22/1",
                    "Project_Name": "",
                    "Cost": 0,
                    "Funding": 0,
                    "Amount": 0,
                    "2021-22": 0,
                    "2022-23": 0,
                    "2023-24": 0,
                    "2024-25": 0,
                    "2025-26": 0
                }
            ]
        },
        {
            "rejectReason": "",
            "status": "",
            "ua": "6130d5a5f9c6d7756b17448c",
            "projectExecute": [
                {
                    "Project_Code": "MP/UA_33/2021-22/1",
                    "Project_Name": "Rejuvenation of Ranitaal Lake",
                    "Details": "De-silting/De-weeding, pathways,Provision of aeration instruments, green corridor, water sports, developments of ghats & vendor hub etc",
                    "Cost": 7.5,
                    "Executing_Agency": "Jabalpur Municipal Corporation",
                    "Parastatal_Agency": "N/A",
                    "Sector": "Rejuvenation of Water Bodies",
                    "Type": "Augmentation of existing infrastructure",
                    "Estimated_Outcome": "NA"
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/2",
                    "Project_Name": "Rejuvenation of Sangram Sagar Lake",
                    "Details": "De-silting/De-weeding, pathways,provision of solor lighting, Provision of aeration instruments, green corridor, water sports, STP , development of ghat etc",
                    "Cost": 4.5,
                    "Executing_Agency": "Jabalpur Municipal Corporation",
                    "Parastatal_Agency": "N/A",
                    "Sector": "Rejuvenation of Water Bodies",
                    "Type": "Augmentation of existing infrastructure",
                    "Estimated_Outcome": "NA"
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/3",
                    "Project_Name": "Rejuvenation of Madhotal, near ISBT",
                    "Details": "De-silting/De-weeding, pathways, walkway, railing, provision of solor lighting, decorative lighting, Provision of aeration instruments, green corridor, plantation, water sports, laying of pipe line for treated water supply  etc..",
                    "Cost": 9,
                    "Executing_Agency": "Jabalpur Municipal Corporation",
                    "Parastatal_Agency": "N/A",
                    "Sector": "Rejuvenation of Water Bodies",
                    "Type": "New project",
                    "Estimated_Outcome": "NA"
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/4",
                    "Project_Name": "Recycling & Reuse of waste water.",
                    "Details": "Laying of underground sewer line, construction of STPs, House connection & recycling - reuse of waste water in balance area of jabalpur city.",
                    "Cost": 704.21,
                    "Executing_Agency": "Jabalpur Municipal Corporation",
                    "Parastatal_Agency": "N/A",
                    "Sector": "Sanitation",
                    "Type": "Augmentation of existing infrastructure",
                    "Estimated_Outcome": "172000"
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/5",
                    "Project_Name": "Drinking water for balance area of the city",
                    "Details": "Laying of rising main, distribution main, house connection, construction of WTP, construction of OHT etc.",
                    "Cost": 265,
                    "Executing_Agency": "Jabalpur Municipal Corporation",
                    "Parastatal_Agency": "N/A",
                    "Sector": "Drinking Water",
                    "Type": "Augmentation of existing infrastructure",
                    "Estimated_Outcome": "82500"
                }
            ],
            "sourceFund": [
                {
                    "Project_Code": "MP/UA_33/2021-22/1",
                    "Project_Name": "Rejuvenation of Ranitaal Lake",
                    "Cost": 7.5,
                    "XV_FC": 7.5,
                    "Other": 0,
                    "Total": 7.5,
                    "2021-22": 0.25,
                    "2022-23": 4,
                    "2023-24": 3.25,
                    "2024-25": 0,
                    "2025-26": 0
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/2",
                    "Project_Name": "Rejuvenation of Sangram Sagar Lake",
                    "Cost": 4.5,
                    "XV_FC": 4.5,
                    "Other": 0,
                    "Total": 4.5,
                    "2021-22": 0.2,
                    "2022-23": 2.5,
                    "2023-24": 1.8,
                    "2024-25": 0,
                    "2025-26": 0
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/3",
                    "Project_Name": "Rejuvenation of Madhotal, near ISBT",
                    "Cost": 9,
                    "XV_FC": 211.26,
                    "Other": 492.95,
                    "Total": 704.21,
                    "2021-22": 140.84,
                    "2022-23": 246.47,
                    "2023-24": 316.89,
                    "2024-25": 0,
                    "2025-26": 0
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/4",
                    "Project_Name": "Recycling & Reuse of waste water.",
                    "Cost": 704.21,
                    "XV_FC": 0,
                    "Other": 0,
                    "Total": null,
                    "2021-22": 0,
                    "2022-23": 0,
                    "2023-24": 0,
                    "2024-25": 0,
                    "2025-26": 0
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/5",
                    "Project_Name": "Drinking water for balance area of the city",
                    "Cost": 265,
                    "XV_FC": 79.5,
                    "Other": 185.5,
                    "Total": 265,
                    "2021-22": 0.53,
                    "2022-23": 92.75,
                    "2023-24": 119.25,
                    "2024-25": 0,
                    "2025-26": 0
                }
            ],
            "yearOutlay": [
                {
                    "Project_Code": "MP/UA_33/2021-22/1",
                    "Project_Name": "Rejuvenation of Ranitaal Lake",
                    "Cost": 7.5,
                    "Funding": 100,
                    "Amount": 7.5,
                    "2021-22": 0,
                    "2022-23": 0,
                    "2023-24": 0,
                    "2024-25": 0,
                    "2025-26": 0
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/2",
                    "Project_Name": "Rejuvenation of Sangram Sagar Lake",
                    "Cost": 4.5,
                    "Funding": 100,
                    "Amount": 4.5,
                    "2021-22": 0,
                    "2022-23": 0,
                    "2023-24": 0,
                    "2024-25": 0,
                    "2025-26": 0
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/3",
                    "Project_Name": "Rejuvenation of Madhotal, near ISBT",
                    "Cost": 9,
                    "Funding": 2300,
                    "Amount": 211.26,
                    "2021-22": 0,
                    "2022-23": 0,
                    "2023-24": 0,
                    "2024-25": 0,
                    "2025-26": 0
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/4",
                    "Project_Name": "Recycling & Reuse of waste water.",
                    "Cost": 704.21,
                    "Funding": 0,
                    "Amount": 0,
                    "2021-22": 0,
                    "2022-23": 0,
                    "2023-24": 0,
                    "2024-25": 0,
                    "2025-26": 0
                },
                {
                    "Project_Code": "MP/UA_33/2021-22/5",
                    "Project_Name": "Drinking water for balance area of the city",
                    "Cost": 265,
                    "Funding": 30,
                    "Amount": 79.5,
                    "2021-22": 0,
                    "2022-23": 0,
                    "2023-24": 0,
                    "2024-25": 0,
                    "2025-26": 0
                }
            ]
        }
    ],
    "actionTakenByRole": "STATE"
}
  ngOnInit(): void {
    this.formDisable = sessionStorage.getItem("disableAllForms") == "true";
    this.actionFormDisable =
      sessionStorage.getItem("disableAllActionForm") == "true";
    this.stateformsService.disableAllFormsAfterMoHUAReview.subscribe(
      (disable) => {
        console.log("action plans speaking", disable);
        this.actionFormDisable = disable;
        if (disable) {
          sessionStorage.setItem("disableAllActionForm", "true");
        }
      }
    );
    sessionStorage.setItem("changeInActionPlans2223", "false");
    this.state_id = sessionStorage.getItem("state_id");
    this.allStatus = JSON.parse(sessionStorage.getItem("allStatusStateForms"));

    // if (this.loggedInUserType == "MoHUA") {
    //   this.formDisable = true;
    // } else if (this.loggedInUserType == "STATE") {
    //   if (this.allStatus["latestFinalResponse"]["role"] == "STATE") {
    //     this.formDisable = true;
    //   }
    // }

    // if (
    //   this.allStatus["latestFinalResponse"]["role"] == "STATE" &&
    //   this.allStatus["actionTakenByRole"] === "STATE"
    // ) {
    //   if (
    //     this.allStatus["latestFinalResponse"]["actionPlans"]["status"] !=
    //     "PENDING"
    //   ) {
    //     this.actionFormDisable = true;
    //   }
    // } else if (this.allStatus["latestFinalResponse"]["role"] == "MoHUA") {
    //   this.actionFormDisable = true;
    // }

    this.getUlbNames();
    for (const key in this.uasData) {
      let code = localStorage.getItem("state_code");
      code += "/" + this.uasData[key]?.UACode ?? "UA";
      code += "/" + this.yearCode;
      this.uaCodes[key] = code;
    }
    this.stateformsService.disableAllFormsAfterStateFinalSubmit.subscribe(
      (disable) => {
        this.formDisable = disable;
        if (disable) {
          sessionStorage.setItem("disableAllForms", "true");
        }
      }
    );
  }
  getUlbNames() {
    this.actionplanserviceService.getUlbsByState(this.state_id).subscribe(
      (res) => {
        this.ulbNames = res["data"];
        this.getCategory();
        this.load();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCategory() {
    this.actionplanserviceService.getCategory().subscribe(
      (res: Array<object>) => {
        res.forEach((element) => {
          this.projectCategories.push(element["name"]);
        });
        console.log(this.projectCategories);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
  state_id;
  actionTakenByRoleOnForm = null

  load() {
    console.log(this.state_id);
    this.state_id = '5dcf9d7516a06aed41c748fd'
    this.actionplanserviceService.getFormData(this.state_id).subscribe(
      (res) => {
        this.actionTakenByRoleOnForm = res["data"]["actionTakenByRole"];
        this.showLoader = false;
        console.log(res["data"], "sss");

        this.data = {
          state: res["data"].state,
          design_year: '606aadac4dff55e6c075c507',
          uaData: res["data"]["uaData"],
          status: res["data"]["status"] ?? "PENDING",
          isDraft: res["data"]["isDraft"],
        };
        sessionStorage.setItem("actionPlans", JSON.stringify(this.data));

        this.addKeys(this.data);
      },
      (err) => {
        this.showLoader = false;
        this.onFail();
      }
    );
  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
    console.log(this._router.url);
  }
  addKeys(data) {
    data.uaData.forEach((element) => {
      for (let i = 0; i < element.projectExecute.length; i++) {
        element.projectExecute[i].index = i + 1;
        element.sourceFund[i].index = i + 1;
        element.yearOutlay[i].index = i + 1;
      }
      element.name = this.uasData[element.ua]["name"];
      element.ulbList = this.uasData[element.ua]["ulb"];
      let newList = [];
      element.ulbList.forEach((e) => {
        newList.push(this.ulbNames[e]);
      });
      element.ulbList = newList;
      element.code = this.uaCodes[element.ua];
      this.actionRes.push({
        st: element.status,
        rRes: element.rejectReason
      })
    });

    data.uaData.forEach((element) => {
      let temp = [];
      element.projectExecute.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(input.projectExecute[0]));
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key]["value"] = e[key];
        }
        temp.push(pro);
      });
      element.projectExecute = temp;
      temp = [];
      element.sourceFund.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(input.sourceFund[0]));
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key]["value"] = e[key];
        }
        temp.push(pro);
      });
      element.sourceFund = temp;
      temp = [];
      element.yearOutlay.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(input.yearOutlay[0]));
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key]["value"] = e[key];
        }
        temp.push(pro);
      });
      element.yearOutlay = temp;
    });
  }

  onFail() {
    this.data = {
      state: this.userData.state,
      design_year: this.Year["2021-22"],
      uaData: [],
      status: null,
      isDraft: null,
    };
    for (const key in this.uasData) {
      let temp = JSON.parse(JSON.stringify(input));
      temp.ua = key;
      temp.name = this.uasData[key].name;
      let tempList = [];
      console.log(this.ulbNames, this.uasData[key].ulb);

      this.uasData[key].ulb.forEach((element) => {
        tempList.push(this.ulbNames[element]);
      });
      temp.ulbList = tempList;
      let code = localStorage.getItem("state_code");
      code += "/" + this.uasData[key]?.UACode ?? "UA";
      code += "/" + this.yearCode;
      temp.code = code;
      for (let index = 1; index <= temp.projectExecute.length; index++) {
        temp.projectExecute[index - 1].Project_Code.value = code + "/" + index;
      }
      for (let index = 1; index <= temp.sourceFund.length; index++) {
        temp.sourceFund[index - 1].Project_Code.value = code + "/" + index;
      }
      for (let index = 1; index <= temp.yearOutlay.length; index++) {
        temp.yearOutlay[index - 1].Project_Code.value = code + "/" + index;
      }
      this.data.uaData.push(temp);
    }
  }

  foldCard(i) {
    this.dummyData2.uaData[i].fold = !this.data.uaData[i].fold;
  }

  submit(fromPrev = null) {
    let draftFlag = 0;
    if (this.loggedInUserType === "STATE") {
      if (this.saveBtnText === "NEXT") {
        return this._router.navigate(["stateform/grant-allocation"]);
      }
      if (this.data.isDraft && !fromPrev) {
        return this.openModal(this.template1);
      }
      let data = this.makeApiData(true);
      this.actionplanserviceService.postFormData(data).subscribe(
        (res) => {
          swal("Record Submitted Successfully!");
          sessionStorage.setItem("changeInActionPlans2223", "false");
          const form = JSON.parse(
            sessionStorage.getItem("allStatusStateForms")
          );

          form.steps.actionPlans.isSubmit = !this.data.isDraft;
          form.steps.actionPlans.status = "PENDING";
          form.actionTakenByRole = "STATE";
          this.stateformsService.allStatusStateForms.next(form);
          if (this.routerNavigate) {
            this._router.navigate([this.routerNavigate.url]);
          } else {
            this._router.navigate(["stateform/grant-allocation"]);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (this.loggedInUserType === "MoHUA") {
      let changeHappen = sessionStorage.getItem("changeInActionPlans2223");
      if (changeHappen == "false") {
        this._router.navigate(["stateform/grant-allocation"]);
        return;
      } else {
        if (this.routerNavigate) {
          this.saveStateAction();
          sessionStorage.setItem("changeInActionPlans2223", "false")
          if (!this.stopFlag) {
            this._router.navigate([this.routerNavigate.url]);
          }
          return;
        } else if (this.submitted || this.backButtonClicked) {
          this.finalActionData['uaData'].forEach(el => {
            if (el['status'] != 'APPROVED' && el['status'] != 'REJECTED') {
              draftFlag = 1;
            }
          })
          if (draftFlag) {
            this.finalActionData['isDraft'] = true;
            this.openModal(this.template1)
            return;
          } else {
            this.finalActionData['isDraft'] = false;
          }
          this.saveStateAction();
          sessionStorage.setItem("changeInActionPlans2223", "false")
          if (!this.stopFlag && this.submitted) {
            this._router.navigate(["stateform/grant-allocation"]);
            return
          } else if (!this.stopFlag && this.backButtonClicked) {
            this._router.navigate(["stateform/action-plan"]);
            return
          }
          return;
        }
        this.saveStateAction();
        sessionStorage.setItem("changeInActionPlans2223", "false")
        if (!this.stopFlag) {
          this._router.navigate(["stateform/grant-allocation"]);
        }
        return;

      }
    }
  }
  body = {};
  stopFlag = 0;
  saveStateAction() {
    let flag = 0;
    let draftFlag = 0;

    console.log(this.finalActionData);
    this.finalActionData['uaData'].forEach(el => {
      if (el.status != 'APPROVED' && el.status != 'REJECTED') {
        draftFlag = 1;
      }
    })
    if (draftFlag) {
      this.finalActionData['isDraft'] = true;
    } else {
      this.finalActionData['isDraft'] = false;
    }
    console.log(this.finalActionData['isDraft'])
    this.finalActionData.uaData.forEach((el) => {
      console.log(el.ua, el.status, el.rejectReason);

      if (
        el["status"] == "REJECTED" &&
        (!el["rejectReason"] || el["rejectReason"] == null)
      ) {
        flag = 1;
      }
    });
    if (flag) {
      swal('Providing Reason for Rejection is Mandatory for Rejecting a Form')
      this.stopFlag = 1;
      return
    }
    this.actionplanserviceService
      .postStateAction(this.finalActionData)
      .subscribe(
        (res) => {
          swal("Record submitted successfully!");
          const status = JSON.parse(
            sessionStorage.getItem("allStatusStateForms")
          );
          // status.steps.actionPlans.status = this.body["status"];
          sessionStorage.setItem("changeInActionPlans2223", "false");
          status.steps.actionPlans.isSubmit = !this.finalActionData["isDraft"];
          status.steps.actionPlans.status = this.finalActionData["status"];
          status.actionTakenByRole = "MoHUA";
          this.stateformsService.allStatusStateForms.next(status);

          // this._router.navigate(["stateform/grant-allocation"]);
        },
        (error) => {
          swal("An error occured!");
          console.log(error.message);
        }
      );
  }
  submitted = false;
  saveButtonClicked() {
    this.submitted = true;
    this.submit()
  }
  makeApiData(fromSave = false) {
    let newUaData = [];
    this.data.uaData.forEach((element) => {
      let Uas = JSON.parse(JSON.stringify(output));
      Uas.ua = element.ua;
      let temp = [];
      element.projectExecute.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(Uas.projectExecute[0]));
        for (const key in e) {
          if (key == "index") continue;
          pro[key] = e[key]["value"];
        }
        temp.push(pro);
      });
      Uas.projectExecute = temp;
      temp = [];
      element.sourceFund.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(Uas.sourceFund[0]));
        for (const key in e) {
          if (key == "index") continue;
          pro[key] = e[key]["value"];
        }
        temp.push(pro);
      });
      Uas.sourceFund = temp;
      temp = [];
      element.yearOutlay.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(Uas.yearOutlay[0]));
        for (const key in e) {
          if (key == "index") continue;
          pro[key] = e[key]["value"];
        }
        temp.push(pro);
      });
      Uas.yearOutlay = temp;
      Uas.status = element?.status?.value ?? '';
      Uas.rejectReason = element?.rejectReason?.value ?? ''
      if (fromSave) {
        if (element.status === "REJECTED") {
          Uas.status = "PENDING";
          this.data.status = "PENDING";
        }
      }
      newUaData.push(Uas);
    });
    let apiData = JSON.parse(JSON.stringify(this.data));
    apiData.uaData = newUaData;
    this.data.uaData.forEach((uaData) => {
      for (const key in uaData) {
        if (key == "ulbList") continue;
        const uaPro = uaData[key];
        if (Array.isArray(uaPro)) {
          for (let index = 0; index < uaPro.length; index++) {
            const elements = uaPro[index];
            for (const key in elements) {
              const element = elements[key];
              if (key == "index") continue;
              if (
                element["lastValidation"] != true ||
                element["value"] === ""
              ) {
                this.data.isDraft = true;
                return apiData;
              } else {
                this.data.isDraft = false;
              }
            }
          }
        }
      }
    });
    return apiData;
  }

  getDataFromGrid(data, index) {
    let temp = sessionStorage.getItem("actionPlans");
    let allData = this.makeApiData();
    console.log(JSON.stringify(allData), "xxxxxxxxxxx", temp);

    if (!deepEqual(allData, JSON.parse(temp))) {
      sessionStorage.setItem("changeInActionPlans2223", "true");
      this.checkDiff();
      this.saveBtnText = "SAVE AND NEXT";
    } else {
      sessionStorage.setItem("changeInActionPlans2223", "false");
      this.saveBtnText = "NEXT";
    }

    if (this.loggedInUserType == "MoHUA") {
      if (sessionStorage.getItem("changeInActionPlans2223") == 'true') {
        this.saveBtnText = "SAVE AND NEXT";
      }
    }
  }

  openModal(template: TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRefForNavigation = this.dialog.open(template, dialogConfig);
    this.dialogRefForNavigation.afterClosed().subscribe((result) => {
      // if (result === undefined) {
      //   if (this.routerNavigate) {
      //     this.routerNavigate = null;
      //   }
      // }
    });
  }

  stay() {
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }

  proceed() {
    this.dialog.closeAll();
    this.submitted = false
    this.submit(true);
  }

  alertClose() {
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  checkDiff() {
    let preData = this.makeApiData();
    let allFormData = JSON.parse(sessionStorage.getItem("allFormsPreData"));
    console.log("in actionPlan", allFormData, preData);
    if (allFormData) {
      allFormData[0].actionplans[0] = preData;
      this.stateformsService.allFormsPreData.next(allFormData);
    }
  }
  onPreview() {
    let data = this.makeApiData();
    let dialogRef = this.dialog.open(ActionplanspreviewComponent, {
      data: data,
      height: "80%",
      width: "90%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  finalActionData;
  checkStatus(ev, ua_id, a, b) {
    sessionStorage.setItem("changeInActionPlans2223", "true");
    this.saveBtnText = "SAVE AND NEXT";
    console.log("action plan of UA", ev, ua_id);
    console.log("before", this.data.uaData);
    if (!this.finalActionData) {
      this.finalActionData = this.makeApiData();
      this.data['uaData'].forEach(el1 => {
        this.finalActionData['uaData'].forEach(el2 => {
          if (el1.ua == el2.ua) {
            el2.status = el1.status;
            el2.rejectReason = el1.rejectReason
          }
        })
      })
    }


    console.log(this.finalActionData);
    this.finalActionData.uaData.forEach((el) => {
      if (el.ua == ua_id) {
        el["status"] = ev.status;
        el["rejectReason"] = ev.rejectReason;
      }
    });

    this.finalActionData.uaData.forEach((element) => {
      if (element["status"] === "REJECTED") {
        this.finalActionData["status"] = "REJECTED";
      } else {
        this.finalActionData["status"] = "APPROVED";
      }
    });
    console.log("after", this.finalActionData);
  }

  getExcel() {
    let data = this.makeApiData();
    let body = {
      uaData: data.uaData,
      uaName: this.uasData,
    };

    this.actionplanserviceService.getExcel(body).subscribe(
      (res: any) => {
        let blob: any = new Blob([res], {
          type: "text/json; charset=utf-8",
        });
        const url = window.URL.createObjectURL(blob);

        fileSaver.saveAs(blob, "ActionPlanData.xlsx");
      },
      (error) => { }
    );
  }
}

const input = {
  ua: { value: "", isEmpty: null, lastValidation: true },
  status: { value: "PENDING" },
  rejectReason: { value: null },
  name: { value: "", isEmpty: null, lastValidation: true },
  projectExecute: [
    {
      index: { value: 1, isEmpty: null, lastValidation: true },
      Project_Code: { value: "", isEmpty: null, lastValidation: true },
      Project_Name: { value: "", isEmpty: null, lastValidation: true },
      Details: { value: "", isEmpty: null, lastValidation: true },
      Cost: { value: "", isEmpty: null, lastValidation: true },
      Executing_Agency: { value: "", isEmpty: null, lastValidation: true },
      Parastatal_Agency: { value: "", isEmpty: null, lastValidation: true },
      Sector: { value: "", isEmpty: null, lastValidation: true },
      Type: { value: "", isEmpty: null, lastValidation: true },
      Estimated_Outcome: { value: "", isEmpty: null, lastValidation: true },
    },
  ],
  sourceFund: [
    {
      index: { value: 1, isEmpty: null, lastValidation: true },
      Project_Code: { value: "", isEmpty: null, lastValidation: true },
      Project_Name: { value: "", isEmpty: null, lastValidation: true },
      Cost: { value: "", isEmpty: null, lastValidation: true },
      XV_FC: { value: 0, isEmpty: null, lastValidation: true },
      Other: { value: 0, isEmpty: null, lastValidation: true },
      Total: { value: "", isEmpty: null, lastValidation: true },
      "2021-22": { value: 0, isEmpty: null, lastValidation: true },
      "2022-23": { value: 0, isEmpty: null, lastValidation: true },
      "2023-24": { value: 0, isEmpty: null, lastValidation: true },
      "2024-25": { value: 0, isEmpty: null, lastValidation: true },
      "2025-26": { value: 0, isEmpty: null, lastValidation: true },
    },
  ],
  yearOutlay: [
    {
      index: { value: 1, isEmpty: null, lastValidation: true },
      Project_Code: { value: "", isEmpty: null, lastValidation: true },
      Project_Name: { value: "", isEmpty: null, lastValidation: true },
      Cost: { value: 0, isEmpty: null, lastValidation: true },
      Funding: { value: 0, isEmpty: null, lastValidation: true },
      Amount: { value: 0, isEmpty: null, lastValidation: true },
      "2021-22": { value: 0, isEmpty: null, lastValidation: true },
      "2022-23": { value: 0, isEmpty: null, lastValidation: true },
      "2023-24": { value: 0, isEmpty: null, lastValidation: true },
      "2024-25": { value: 0, isEmpty: null, lastValidation: true },
      "2025-26": { value: 0, isEmpty: null, lastValidation: true },
    },
  ],
  fold: false,
  code: { value: "", isEmpty: null, lastValidation: true },
};

const output = {
  ua: "",
  status: "PENDING",
  rejectReason: "",
  projectExecute: [
    {

      Project_Code: "",
      Project_Name: "",
      Details: "",
      Cost: "",
      Executing_Agency: "",
      Parastatal_Agency: "",
      Sector: "",
      Type: "",
      Estimated_Outcome: "",
    },
  ],
  sourceFund: [
    {
      Project_Code: "",
      Project_Name: "",
      Cost: "",
      XV_FC: "",
      Other: "",
      Total: "",
      "2021-22": "",
      "2022-23": "",
      "2023-24": "",
      "2024-25": "",
      "2025-26": "",
    },
  ],
  yearOutlay: [
    {
      Project_Code: "",
      Project_Name: "",
      Cost: "",
      Funding: "",
      Amount: "",
      "2021-22": "",
      "2022-23": "",
      "2023-24": "",
      "2024-25": "",
      "2025-26": "",
    },
  ],
};

function deepEqual(x, y) {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === "object" && tx === ty
    ? ok(x).length === ok(y).length &&
    ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
}
