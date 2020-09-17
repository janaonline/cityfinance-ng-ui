import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FeatureCollection, Geometry } from 'geojson';
import * as L from 'leaflet';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ILeafletStateClickEvent } from 'src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent';
import { GeographicalService } from 'src/app/shared/services/geographical/geographical.service';
import { MapUtil } from 'src/app/util/map/mapUtil';
import { UserUtility } from 'src/app/util/user/user';

import { AuthService } from '../../../app/auth/auth.service';
import { DialogComponent } from '../../../app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from '../../../app/shared/components/dialog/models/dialogConfiguration';
import { CommonService } from '../../../app/shared/services/common.service';

@Component({
  selector: "app-municipal-laws",
  templateUrl: "./municipal-laws.component.html",
  styleUrls: ["./municipal-laws.component.scss"]
})
export class MunicipalLawsComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private modalService: BsModalService,
    private _dialog: MatDialog,
    protected _authService: AuthService,
    protected router: Router,
    private geoService: GeographicalService
  ) {}

  mapGeoData: FeatureCollection<
    Geometry,
    {
      [name: string]: any;
    }
  >;
  modalRef: BsModalRef;

  states: any;
  compareState = 0;

  list = [];
  selectedStates = ["criteria"];

  keys = [
    "overview",
    "systemOfAccounting",
    "budget",
    "accounts",
    "assets",
    "liabilities",
    "annualReport",
    "inYearFinancialReporting",
    "externalAudit",
    "internalAudit",
    "specialAudit",
    "performanceReports",
    "mediumTermFiscalPlan",
    "publicDisclosure"
  ];
  messages: {};
  structure: {};

  tempStates: {};

  tdWidth = "300px";
  tableWidth = "100%";

  stateName = "";

  stateColors = {
    unselected: "#E5E5E5",
    selected: "#059b9a"
  };

  slides: { imgUrl: string; caption: string; states: string[] }[] = [];
  defaultDailogConfiuration: IDialogConfiguration = {
    message: "You need to be Login to download the data.",
    buttons: {
      confirm: {
        text: "Proceed to Login",
        callback: () => {
          this.router.navigate(["/", "login"]);
        }
      },
      cancel: { text: "Cancel" }
    }
  };

  nationalLevelMap: L.Map;

  statesLayer: L.GeoJSON<any>;

  currentSlideIndex = 0;

  ngOnInit() {
    this.geoService.loadConvertedIndiaGeoData().subscribe(data => {
      try {
        this.mapGeoData = data;
        setTimeout(() => {
          this.createNationalLevelMap(data, "finance-law-map");
          this.loadSlides();
        }, 1);
      } catch (error) {
        console.error(error);
      }
    });
    this.commonService.states.subscribe(res => {
      this.states = res;
    });
    this.commonService.loadStates(true);

    this.fetchMunicipalLawJSONFile();

    this.loadMessages();
    this.loadSkeleton();
  }

  fetchMunicipalLawJSONFile() {
    this.http
      .get("/assets/files/municipal-laws.json")
      .subscribe((data: any[]) => {
        this.list = data;
      });
  }

  reRenderMap() {
    this.createNationalLevelMap(this.mapGeoData, "finance-law-map");
  }

  calculateVH(vh: number) {
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (vh * h) / 100;
  }

  calculateMapZoomLevel() {
    let zoom: number;
    const userUtil = new UserUtility();
    if (userUtil.isUserOnMobile()) {
      zoom = 3.8 + (window.devicePixelRatio - 2) / 10;
      if (window.innerHeight < 600) zoom = 3.6;
      const valueOf1vh = this.calculateVH(1);
      if (valueOf1vh < 5) zoom = 3;
      else if (valueOf1vh < 7) zoom = zoom - 0.2;
      return zoom;
    }

    const defaultZoomLevel =
      (Math.max(document.documentElement.clientWidth) - 1366) / 1366 + 4;
    try {
      zoom = localStorage.getItem("mapZoomLevel")
        ? +localStorage.getItem("mapZoomLevel")
        : defaultZoomLevel;
    } catch (error) {
      zoom = defaultZoomLevel;
    }

    return zoom;
  }

  createNationalLevelMap(
    geoData: FeatureCollection<
      Geometry,
      {
        [name: string]: any;
      }
    >,
    containerId: string
  ) {
    const zoom = this.calculateMapZoomLevel();

    const configuration = {
      containerId,
      geoData,
      options: {
        zoom,
        minZoom: zoom,
        attributionControl: false,
        doubleClickZoom: false,
        dragging: false,
        tap: false
      }
    };
    let map;

    ({ stateLayers: this.statesLayer, map } = MapUtil.createDefaultNationalMap(
      configuration
    ));

    this.nationalLevelMap = map;

    this.statesLayer.eachLayer(layer => {
      (layer as any).bringToBack();
      (layer as any).on({
        click: (args: ILeafletStateClickEvent) => {
          this.onClickingStateOnMap(args);
        }
      });
    });
  }

  // window = window;
  backhome() {
    if (!this.compareState) {
      this.router.navigate(["/home"]);
    } else {
      this.compareState = 0;
    }
    // const homePagePath = '/home'
    // window.location.pathname = homePagePath;
  }

  onClickingStateOnMap(stateLayer: ILeafletStateClickEvent) {
    const stateName = MapUtil.getStateName(stateLayer).toLowerCase();
    // const stateList = this.slides[this.currentSlideIndex].states;
    const list = this.slides.find(slide => {
      const slideHasState = !!slide.states.find(
        name => name.toLowerCase() === stateName
      );
      return slideHasState;
    });

    if (!list) {
      return;
    }

    // const stateFound = !!stateList.find(
    //   (name) => name.toLowerCase() == stateName
    // );

    this.showStateGroup({ states: list.states }, stateName);
  }

  /**
   *
   * @param stateNames States Which needs to be colored. Other states will be colored
   * as default.
   */
  reColorStates(stateNames: string[], statesLayer: L.GeoJSON<any>) {
    console.log(`reColorStates `, statesLayer);

    // if (!statesLayer) {
    //   return;
    // }
    statesLayer.eachLayer(layer => {
      const stateName = MapUtil.getStateName(layer).toLowerCase();
      const stateFound = !!stateNames.find(
        name => name.toLowerCase() == stateName
      );

      if (stateFound) {
        MapUtil.colorStateLayer(layer, this.stateColors.selected);
      } else {
        MapUtil.colorStateLayer(layer, this.stateColors.unselected);
      }
    });
  }

  onSlideChaning(slideIndexSet: number) {
    this.currentSlideIndex = slideIndexSet;
    const currentSlide = this.slides[slideIndexSet];

    this.reColorStates(currentSlide.states, this.statesLayer);
  }

  showMapView() {
    this.compareState = 0;
    setTimeout(() => {
      this.reRenderMap();
      const currentSlide = this.slides[this.currentSlideIndex];
      this.reColorStates(currentSlide.states, this.statesLayer);
    });
  }

  loadSlides() {
    this.slides = [
      {
        imgUrl: "/assets/images/maps/sc1.PNG",
        caption: "States following Accrual Basis of Accounting",
        states: [
          "criteria",
          "andhra pradesh",
          "assam",
          "bihar",
          "chhattisgarh",
          "goa",
          "jammu & kashmir",
          "jharkhand",
          "karnataka",
          "kerala",
          "madhya pradesh",
          "maharashtra",
          "meghalaya",
          "delhi",
          "odisha",
          "punjab",
          "rajasthan",
          "sikkim",
          "tamil nadu",
          "uttar pradesh",
          "west bengal"
        ]
      },
      {
        imgUrl: "/assets/images/maps/sc2.PNG",
        caption: "States Where Budget Calendar is Prescribed",
        states: [
          "criteria",
          "andhra pradesh",
          "bihar",
          "haryana",
          "jammu & kashmir",
          "madhya pradesh",
          "maharashtra",
          "odisha",
          "tamil nadu"
        ]
      },
      {
        imgUrl: "/assets/images/maps/sc3.PNG",
        caption: "Cash Basis of Budgeting Prescribed",
        states: [
          "criteria",
          "andhra pradesh",
          "assam",
          "bihar",
          "karnataka",
          "kerala",
          "odisha",
          "rajasthan"
        ]
      },
      {
        imgUrl: "/assets/images/maps/sc4.PNG",
        caption: "Scope for Public Suggestion in Budgets",
        states: ["criteria", "bihar", "haryana", "karnataka", "tamil nadu"]
      },
      {
        imgUrl: "/assets/images/maps/sc5.PNG",
        caption: "Internal Audit Requirement",
        states: [
          "criteria",
          "bihar",
          "chhattisgarh",
          "jammu & kashmir",
          "jharkhand",
          "maharashtra",
          "mizoram",
          "odisha",
          "punjab",
          "rajasthan",
          "sikkim",
          "west bengal"
        ]
      },
      {
        imgUrl: "/assets/images/maps/sc6.PNG",
        caption: "Requirement for Public Disclosure",
        states: [
          "criteria",
          "andhra pradesh",
          "assam",
          "bihar",
          "chhattisgarh",
          "goa",
          "gujarat",
          "haryana",
          "jharkhand",
          "karnataka",
          "kerala",
          "madhya pradesh",
          "maharashtra",
          "delhi",
          "odisha",
          "punjab",
          "tamil nadu",
          "uttar pradesh",
          "west bengal"
        ]
      }
    ];
  }

  download() {
    const isUserLoggedIn = this._authService.loggedIn();
    if (!isUserLoggedIn) {
      const dailogboxx = this._dialog.open(DialogComponent, {
        data: this.defaultDailogConfiuration
      });
      return;
    }
    window.open("/assets/files/municipal-laws-report.xlsx");
  }

  showStateGroup(item, stateToShow?: string) {
    const stateList = item.states;
    this.selectedStates = ["criteria"];

    this.states.forEach(state => {
      if (
        stateList.indexOf(state.name.toLowerCase()) > -1 &&
        (stateToShow ? stateToShow == state.name.toLowerCase() : true)
      ) {
        this.addToCompare(state);
      } else {
        state.selected = false;
      }
    });
    this.showComparisionPage();
  }

  showStateComparison(item, state: string) {}

  compareAllStates() {
    this.selectedStates = ["criteria"];
    this.states.forEach(state => {
      this.addToCompare(state);
    });

    this.showComparisionPage();
    // this.compareState = 2;
    // this.defineTdWidth();
  }

  addToCompareByStateName(stateName) {
    const stName = stateName;
    this.states.forEach(state => {
      if (state.name.toLowerCase() == stName) {
        this.addToCompare(state);
      }
    });
  }

  addToCompare(state) {
    const stateName = state.name.toLowerCase();

    if (this.selectedStates.indexOf(stateName) > -1) {
      this.selectedStates.splice(this.selectedStates.indexOf(stateName), 1);
      state["selected"] = false;
    } else {
      this.selectedStates.push(stateName);
      state["selected"] = true;
    }
    this.defineTdWidth();
  }

  // addToCompare(state) {
  //   this.stateName = state.name.toLowerCase();
  //   if (state['selected']) {
  //     state['selected'] = false;
  //     if(this.selectedStates.indexOf(state.name.toLowerCase()) > -1){
  //       this.selectedStates.splice(this.selectedStates.indexOf(state.name.toLowerCase()), 1);
  //     }
  //   } else {
  //     // if(this.selectedStates.length==5){
  //     //   alert("You may select upto 4 states only");
  //     //   return false;
  //     // }
  //     state['selected'] = true;
  //     // this.selectedStates.splice(1, 0, state.name.toLowerCase());
  //     this.selectedStates.push(state.name.toLowerCase());
  //   }

  //   this.defineTdWidth();
  // }

  defineTdWidth() {
    switch (this.selectedStates.length) {
      case 1:
        this.tdWidth = "100%";
        this.tableWidth = "100%";
        break;
      case 2:
        this.tdWidth = "50%";
        this.tableWidth = "100%";
        break;
      case 3:
        this.tdWidth = "33.33%";
        this.tableWidth = "100%";
        break;
      case 4:
        this.tdWidth = "25%";
        this.tableWidth = "100%";
        break;

      default:
        this.tdWidth = "300px";
        this.tableWidth = 300 * this.selectedStates.length + "px";
    }
  }

  backToStateSelection() {
    this.compareState = 1;
    this.states.forEach(state => {
      state["selected"] = false;
    });
    this.selectedStates = ["criteria"];
  }

  showStateSelectionSection() {
    this.selectedStates = ["criteria"];
    this.states.forEach(state => {
      state.selected = false;
    });
    this.compareState = 1;
  }

  clearSelectedStates() {
    const states = [this.selectedStates[0]];
    this.showStateGroup({ states });
    this.defineTdWidth();
  }

  showComparisionPage() {
    if (this.selectedStates.length < 2) {
      // alert("Please select at least one state");
    } else {
      this.defineTdWidth();
      this.compareState = 2;
    }
  }

  prepareData() {
    this.tempStates = {};
    let lastCriteria = "";
    this.states.forEach(state => {
      const stateName = state.name.toLowerCase();

      const temp = {};
      this.list.forEach((item, index) => {
        Object.entries(this.messages).forEach(key => {
          if (item.criteria == this.messages[key[0]] && item[stateName]) {
            lastCriteria = key[0];

            const msg = item[stateName].replace(/\n/g, "");
            if (msg && msg.indexOf("[") > -1) {
              temp[key[0]] = { titleThenCaptions: [] };

              const lines = msg.split("]");
              lines.forEach(line => {
                if (line && line.indexOf("[") > -1) {
                  const _title = line.substring(line.indexOf("["), -1);
                  const _caption = line.substring(line.indexOf("[")) + "]";

                  temp[key[0]].titleThenCaptions.push({
                    title: _title,
                    caption: _caption
                  });
                }
              });
            } else if (msg && msg.indexOf("(") > -1) {
              temp[key[0]] = { titleWithCaptions: [] };

              const lines = msg.split(")");
              lines.forEach(line => {
                if (line && line.indexOf("(") > -1) {
                  const _title = line.substring(line.indexOf("("), -1);
                  const _caption = line.substring(line.indexOf("(")) + ")";

                  temp[key[0]].titleWithCaptions.push({
                    title: _title,
                    caption: _caption
                  });
                }
              });
            } else {
              temp[key[0]] = { title: msg, caption: "", tooltip: "" };
            }

            const nextItem = this.list[index + 1];
            if (!nextItem.criteria && lastCriteria) {
              temp[key[0]].tooltip = nextItem[stateName];
            }
          }
        });
      });

      this.tempStates[stateName] = temp;
    });
  }

  loadMessages() {
    this.messages = {
      overview: "Overview",
      statutesAndManuals:
        "Statutes and Manuals directly governing Municipal Finance Management in the State",
      systemOfAccounting: "System of Accounting",
      sysAccountingPrescribed: "What is the system of accounting prescribed?",
      sysBudgetingPrescribed: "What is the system of Budgeting prescribed?",
      refToManuals:
        "Is there any reference to manuals in the Municipal Act/Rules?",
      budget: "Budget",
      constitute: "What are the statements that constitute the Annual Budget?",
      responsibleForBudget: "Who is responsible for preparation of Budget?",
      budgetProposalSubmittedTo: "To whom is the Budget proposal submitted?",
      budgetTimeline: "What is the timeline for budget finalization?",
      budgetProcess: "What is the process for approval of the Budget?",
      isBudgetCalendarPrescribed: "Is a budget calendar prescribed?",
      publicOfferSuggestionsOnBudget:
        "Is there any scope for the public to offer suggestions on the budget?",
      budgetutilizationReview:
        "What is the process prescribed for budget utilization review?",
      budgetPowerToStateGovt:
        "Does the State Government have any power over the Municipal Budget?",
      budgetUtilizationReviewTimelines:
        "How often does the budget utilization review take place?",
      budgetRsponsibleForUtilizationReview:
        "Who is responsible for undertaking the budget utilization review?",
      provisionForBudgetaryControl:
        "Are there any provisions for Budgetary Control?",
      whyOutcomeBudget:
        "Is there a requirement for preparation of Outcome Budget?",
      accounts: "Accounts",
      accountsContents: "What are the contents of the annual accounts?",
      accountsResponsible:
        "Who is responsible for the preparation of the annual accounts?",
      accountsPreparedTill: "By when should the annual accounts be prepared?",
      accountsSubmittedTo: "To whom should the annual accounts be submitted?",
      accountsAuthorityToApprove:
        "Who is the authority to approve the Annual Accounts?",
      assets: "Assets",
      fixedAssetRegisterPrescribed:
        "Whether a Fixed Asset Register is prescribed?",
      physicalVerificationAssetsPrescribed:
        "Whether physical verifications of Assets is prescribed?",
      assetsConditionsPrescribedAroundInvestment:
        "What are conditions prescribed around Investment of Municipal Funds?",
      assetsStateGovtApprovalRequired:
        "Whether State Government approval is required to make investments?",
      assetsLimitOnClosingCashBalance:
        "Whether any limits on closing cash balance is prescribed?",
      liabilities: "Liabilities",
      isBorrowingPermitted: "Is borrowing permitted?",
      kindsOfBorrowingPermitted: "What are the kinds of borrowings permitted?",
      purposeWhenBorrowingPermitted:
        "What are the purposes for which borrowings are permitted?",
      borrowingLimits: "Are there any limits on borrowing prescribed?",
      stateGovtApprovalForBorrowing:
        "Whether State Government approval is required for borrowings?",
      conditionsForBorrowing: "Are there any conditions for borrowing?",
      maxLoanRepaymentPeriod:
        "Is any maximum loan repayment period prescribed?",
      provisionsOfGuarantees:
        "What are the provisions with regard to providing guarantees?",
      conditionsAroundMortgage:
        "What are the conditions around mortgage of assets?",
      annualReport: "Annual Report",
      annualReportName: "What is the name of the Annual report?",
      annualReportContents: "What are the contents of the Annual report?",
      annualReportResponsible:
        "Who is responsible for the preparation of the Annual report?",
      annualReportPreparedTill: "By when should the Annual report be prepared?",
      annualReportSubmittedTo: "To whom should the Annual report be submitted?",
      annualReportCopyRequiredToStateGovt:
        "Whether a copy of the Annual Report is required to be submitted to the State Government?",
      inYearFinancialReporting: "In-Year Financial Reporting",
      iyfrReportPrepared:
        "What are the financial reports prepared monthly/quarterly/half yearly?",
      iyfrSubmittedTo:
        "To whom should the in-year financial reports be submitted?",
      iyfrSubmittedTill: "By when should the in-year reports be submitted?",
      externalAudit: "External Audit",
      externalAuditAuditor: "Who audits the financial statements?",
      externalAuditAuditedTill:
        "By when should the audit process be completed?",
      externalAuditReportSubmittedTo:
        "To whom does the Auditor submit the Audit Report?",
      externalAuditActionAfterAudit:
        "What is the action prescribed after the audit?",
      externalAuditPenalClausesForNonCompliance:
        "Are there any penal clauses for non compliance?",
      internalAudit: "Internal Audit",
      isInternalAuditRequired: "Is there a requirement for internal audit?",
      internalAuditConductedBy: "Who conducts the internal audit?",
      internalAuditScope: "What is the Scope of Internal Audit?",
      internalAuditAuditedTill:
        "By when should the internal audit process be completed?",
      internalAuditReportSubmittedTo:
        "To whom should the internal audit report be submitted?",
      internalAuditActionAfterAudit:
        "What is the action prescribed after submission of the internal audit report?",
      riskBasedAuditBasedOnSamplingTechniquePrescribed:
        "Whether Risk Based Audit based on sampling technique is prescribed?",
      internalAuditPenalClausesForNonCompliance:
        "Are there any penal clauses for non compliance?",
      specialAudit: "Special Audit",
      specialAuditPowerToConductSpecialAudit:
        "Are there powers to conduct Special Audit/Investigations?",
      specialAuditCriteria: "What is the criteria to initiate such audit?",
      specialAuditInitiatedBy: "Who can initiate special audit?",
      performanceReports: "Performance Reports",
      isMerformanceReportsPrescribed:
        "Whether Performance Reporting is prescribed?",
      performanceReportsContents:
        "What are the contents of Performance Reports?",
      performanceReportsFrequencyForSubmission:
        "What is frequency for submission of Performance Reports?",
      performanceReportsSubmittedTo:
        "To whom should the performance Reports be submitted?",
      performanceReportsPenalClausesForNonSubmission:
        "Are there any penal clauses for non submission?",
      mediumTermFiscalPlan: "Medium Term Fiscal Plan",
      isMediumTermFiscalPlanRequired:
        "Is there a requirement for Long Term/Medium Term Fiscal Plan?",
      provisionRelatingToLinkageBetweenMTFTandAnnualBudget:
        "What are the provisions relating to linkages between MTFP and Annual Budget?",
      publicDisclosure: "Public Disclosure",
      isPublicDisclosureRequired:
        "Is there a requirement for Public Disclosure?",
      publicDisclosureInfoToBeDisclosed:
        "What information needs to be publicly disclosed?",
      publicDisclosureMannerOfDisclosure:
        "What is the manner of public disclosure prescribed",
      anyOtherUniqueObservations: "Any Other Unique Observations"
    };
  }

  loadSkeleton() {
    this.structure = {
      overview: ["statutesAndManuals"],
      systemOfAccounting: [
        "sysAccountingPrescribed",
        "sysBudgetingPrescribed",
        "refToManuals"
      ],
      budget: [
        "constitute",
        "responsibleForBudget",
        "budgetProposalSubmittedTo",
        "budgetTimeline",
        "budgetProcess",
        "isBudgetCalendarPrescribed",
        "publicOfferSuggestionsOnBudget",
        "budgetutilizationReview",
        "budgetPowerToStateGovt",
        "budgetUtilizationReviewTimelines",
        "budgetRsponsibleForUtilizationReview",
        "provisionForBudgetaryControl",
        "whyOutcomeBudget"
      ],
      accounts: [
        "accountsContents",
        "accountsResponsible",
        "accountsPreparedTill",
        "accountsSubmittedTo",
        "accountsAuthorityToApprove"
      ],
      assets: [
        "fixedAssetRegisterPrescribed",
        "physicalVerificationAssetsPrescribed",
        "assetsConditionsPrescribedAroundInvestment",
        "assetsStateGovtApprovalRequired",
        "assetsLimitOnClosingCashBalance"
      ],
      liabilities: [
        "isBorrowingPermitted",
        "kindsOfBorrowingPermitted",
        "purposeWhenBorrowingPermitted",
        "borrowingLimits",
        "stateGovtApprovalForBorrowing",
        "conditionsForBorrowing",
        "maxLoanRepaymentPeriod",
        "provisionsOfGuarantees",
        "conditionsAroundMortgage"
      ],
      annualReport: [
        "annualReportName",
        "annualReportContents",
        "annualReportResponsible",
        "annualReportPreparedTill",
        "annualReportSubmittedTo",
        "annualReportCopyRequiredToStateGovt"
      ],
      inYearFinancialReporting: [
        "iyfrReportPrepared",
        "iyfrSubmittedTo",
        "iyfrSubmittedTill"
      ],
      externalAudit: [
        "externalAuditAuditor",
        "externalAuditAuditedTill",
        "externalAuditReportSubmittedTo",
        "externalAuditActionAfterAudit",
        "externalAuditPenalClausesForNonCompliance"
      ],
      internalAudit: [
        "isInternalAuditRequired",
        "internalAuditConductedBy",
        "internalAuditScope",
        "internalAuditAuditedTill",
        "internalAuditReportSubmittedTo",
        "internalAuditActionAfterAudit",
        "riskBasedAuditBasedOnSamplingTechniquePrescribed",
        "internalAuditPenalClausesForNonCompliance"
      ],
      specialAudit: [
        "specialAuditPowerToConductSpecialAudit",
        "specialAuditCriteria",
        "specialAuditInitiatedBy"
      ],
      performanceReports: [
        "isPerformanceReportsPrescribed",
        "performanceReportsContents",
        "performanceReportsFrequencyForSubmission",
        "performanceReportsSubmittedTo",
        "performanceReportsPenalClausesForNonSubmission"
      ],
      mediumTermFiscalPlan: [
        "isMediumTermFiscalPlanRequired",
        "provisionRelatingToLinkageBetweenMTFTandAnnualBudget"
      ],
      publicDisclosure: [
        "isPublicDisclosureRequired",
        "publicDisclosureInfoToBeDisclosed",
        "publicDisclosureMannerOfDisclosure"
      ],
      anyOtherUniqueObservations: ["anyOtherUniqueObservations"]
    };
  }

  openStateSelectionModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-xlg" });
  }
}
