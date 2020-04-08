import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {creditRatingModalHeaders, tableHeaders} from '../../auth/home-header/tableHeaders';
import {CommonService} from '../../shared/services/common.service';
import {FormControl} from '@angular/forms';
import {el} from '@angular/platform-browser/testing/src/browser_util';

// import { CreditRatingJson } from './credit-rating.json';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {
  page = 1;
  originalList = [];
  list = [];
  dropdownFiltersData: {
    states?: any[],
    agencies?: any[],
    creditRatings?: any[],
    statusRatings?: any[]
  } = {states: [], agencies: [], creditRatings: [], statusRatings: []};
  ulbSearchFormControl = new FormControl('');
  stateSearchFormControl = new FormControl([]);
  agencySearchFormControl = new FormControl([]);
  creditSearchFormControl = new FormControl([]);
  statusSearchFormControl = new FormControl([]);
  detailedList = [];
  // columnDefs = [
  //   { headerName: 'No', field: 'sno', width: 50 },
  //   { headerName: 'ULB', field: 'ulb', width: 300 },
  //   // { headerName: 'city', field: 'city', width: 120 },
  //   { headerName: 'State', field: 'state', width: 150 },
  //   { headerName: 'Initial Credit Rating', field: 'creditrating', width: 120 },
  //   // { headerName: 'date', field: 'date', width: 120 },
  //   { headerName: 'Change', field: 'changeinrating', width: 120 },
  //   { headerName: 'Updated Credit Rating', field: 'updatedcreditrating', width: 120 },
  //   // { headerName: 'outlook', field: 'outlook', width: 120 },
  //   { headerName: 'Date of update', field: 'outlookdate', width: 120 },
  //   // { headerName: 'agency', field: 'agency', width: 120 },
  //   // { headerName: 'Link', field: 'link', width: 600 },
  // ];

  selectedStates: Array<string> = [];
  absCreditInfo = {};
  ratingGrades = [
    'AAA+',
    'AAA',
    'AAA-',
    'AA+',
    'AA',
    'AA-',
    'A+',
    'A',
    'A-',
    'BBB+',
    'BBB',
    'BBB-',
    'BB',
    'BB+',
    'BB-',
    'B+',
    'B',
    'B-',
    'C+',
    'C',
    'C-',
    'D+',
    'D',
    'D-'
  ];

  search: string;
  sortHeader: string;
  sortType: boolean; // true = asc, false = desc

  ulbInfoSortHeader: string;
  ulbInfoSortType: boolean;

  modalRef: BsModalRef;
  dialogHeaders = creditRatingModalHeaders[0];
  dialogData = [];
  ulbInfo: any;

  creditScale = {
    CRISIL: {title: 'CRISIL', description: ''},
    CRISIL_AAA: {
      title: 'CRISIL AAA (Highest Safety)',
      description:
        'Instruments with this rating are considered to have the highest degree of safety regarding timely servicing of financial obligations. Such instruments carry lowest credit risk.'
    },
    CRISIL_AA: {
      title: 'CRISIL AA (High Safety)',
      description:
        'Instruments with this rating are considered to have high degree of safety regarding timely servicing of financial obligations. Such instruments carry very low credit risk.'
    },
    CRISIL_A: {
      title: 'CRISIL A (Adequate Safety)',
      description:
        'Instruments with this rating are considered to have adequate degree of safety regarding timely servicing of financial obligations. Such instruments carry low credit risk.'
    },
    CRISIL_BBB: {
      title: 'CRISIL BBB (Moderate Safety)',
      description:
        'Instruments with this rating are considered to have moderate degree of safety regarding timely servicing of financial obligations. Such instruments carry moderate credit risk.'
    },
    CRISIL_BB: {
      title: 'CRISIL BB (Moderate Risk)',
      description:
        'Instruments with this rating are considered to have moderate risk of default regarding timely servicing of financial obligations.'
    },
    CRISIL_B: {
      title: 'CRISIL B (High Risk)',
      description:
        'Instruments with this rating are considered to have high risk of default regarding timely servicing of financial obligations.'
    },
    CRISIL_C: {
      title: 'CRISIL C (Very High Risk)',
      description:
        'Instruments with this rating are considered to have very high risk of default regarding timely servicing of financial obligations.'
    },
    CRISIL_D: {
      title: 'CRISIL D (Default)',
      description:
        'Instruments with this rating are in default or are expected to be in default soon.'
    },
    CRISIL_Note_1: {
      title: 'Note 1',
      description:
        'CRISIL may apply \'+\' (plus) or \'-\' (minus) signs for ratings from \'CRISIL AA\' to \'CRISIL C\' to reflect comparative standing within the category. '
    },
    CRISIL_Note_2: {
      title: 'Note 2',
      description:
        'CRISIL may assign rating outlooks for ratings from \'CRISIL AAA\' to \'CRISIL B\'. Ratings on Rating Watch will not carry outlooks. A rating outlook indicates the direction in which a rating may move over a medium-term horizon of one to two years. A rating outlook can be \'Positive\', \'Stable\', or \'Negative\'. A \'Positive\' or \'Negative\' rating outlook is not necessarily a precursor of a rating change. '
    },
    CARE: {title: 'CARE', description: ''},
    CARE_AAA: {
      title: 'CARE AAA',
      description:
        'Instruments with this rating are considered to have the highest degree of safety regarding timely servicing of financial obligations. Such instruments carry lowest credit risk.'
    },
    CARE_AA: {
      title: 'CARE AA',
      description:
        'Instruments with this rating are considered to have high degree of safety regarding timely servicing of financial obligations. Such instruments carry very low credit risk.'
    },
    CARE_A: {
      title: 'CARE A',
      description:
        'Instruments with this rating are considered to have high degree of safety regarding timely servicing of financial obligations. Such instruments carry very low credit risk.'
    },
    CARE_BBB: {
      title: 'CARE BBB',
      description:
        'Instruments with this rating are considered to have moderate degree of safety regarding timely servicing of financial obligations. Such instruments carry moderate credit risk.'
    },
    CARE_BB: {
      title: 'CARE BB',
      description:
        'Instruments with this rating are considered to have moderate risk of default regarding timely servicing of financial obligations.'
    },
    CARE_B: {
      title: 'CARE B',
      description:
        'Instruments with this rating are considered to have high risk of default regarding timely servicing of financial obligations.'
    },
    CARE_C: {
      title: 'CARE C',
      description:
        'Instruments with this rating are considered to have very high risk of default regarding timely servicing of financial obligations.'
    },
    CARE_D: {
      title: 'CARE D',
      description:
        'Instruments with this rating are in default or are expected to be in default soon.'
    },
    Note_1: {
      title: 'Note 1',
      description:
        'Modifiers (plus) /  - (minus) can be used with the rating symbols for the categories CARE AA to CARE C. The modifiers reflect the comparative standing within the category.'
    },
    ICRA: {title: 'ICRA', description: ''},
    ICRA_AAA: {
      title: 'AAA',
      description:
        'Issuers with this rating are considered to have the highest degree of safety regarding timely servicing of financial obligations. Such issuers carry lowest credit risk.'
    },
    ICRA_AA: {
      title: 'AA',
      description:
        'Issuers with this rating are considered to have high degree of safety regarding timely servicing of financial obligations. Such issuers carry very low credit risk.'
    },
    ICRA_A: {
      title: 'A',
      description:
        'Issuers with this rating are considered to have adequate degree of safety regarding timely servicing of financial obligations. Such issuers carry low credit risk.'
    },
    ICRA_BBB: {
      title: 'BBB',
      description:
        'Issuers with this rating are considered to have moderate degree of safety regarding timely servicing of financial obligations. Such issuers carry moderate credit risk.'
    },
    ICRA_BB: {
      title: 'BB',
      description:
        'Issuers with this rating are considered to have moderate risk of default regarding timely servicing of financial obligations.'
    },
    ICRA_B: {
      title: 'B',
      description:
        'Issuers with this rating are considered to have high risk of default regarding timely servicing of financial obligations.'
    },
    ICRA_C: {
      title: 'C',
      description:
        'Issuers with this rating are considered to have very high risk of default regarding timely servicing of financial obligations.'
    },
    ICRA_D: {
      title: 'D',
      description:
        'Issuers with this rating are in default or are expected to be in default soon.'
    },
    ICRA_Note_1: {
      title: 'Note 1',
      description:
        'For the rating categories [ICRA]AA through to [ICRA]C, the modifier + (plus) or – (minus) may be appended to the rating symbols to indicate their relative position within the rating categories concerned. Thus, the rating of [ICRA]AA+ is one notch higher than [ICRA]AA, while [ICRA]AA- is one notch lower than [ICRA]AA.'
    },
    Brickwork: {title: 'Brickwork', description: ''},
    BWR_AAA: {
      title: 'BWR AAA',
      description:
        'Issuers with this rating are considered to offer the highest degree of safety and carry lowest credit risk'
    },
    BWR_AA: {
      title: 'BWR AA',
      description:
        'Issuers with this rating are considered to offer the high degree of safety and carry very low credit risk'
    },
    BWR_A: {
      title: 'BWR A',
      description:
        'Issuers with this rating are considered to offer the adequate degree of safety and carry low credit risk'
    },
    BWR_BBB: {
      title: 'BWR BBB',
      description:
        'Issuers with this rating are considered to offer the moderate degree of safety and carry moderate credit risk'
    },
    BWR_BB: {
      title: 'BWR BB',
      description:
        'Issuers with this rating are considered to offer moderate risk of default'
    },
    BWR_B: {
      title: 'BWR B',
      description:
        'Issuers with this rating are considered to offer high risk of default'
    },
    BWR_C: {
      title: 'BWR C',
      description:
        'Issuers with this rating are considered to offer very high risk of default'
    },
    BWR_D: {
      title: 'BWR D',
      description:
        'Issuers with this rating are in default or are expected to be in default soon.'
    },
    BWR_Note_1: {
      title: 'Note 1',
      description:
        '+ or - modifiers can be used with BWR AA to BWR C. They reflect comparitive standing for the same category'
    },
    IRR: {title: 'IRR', description: ''},
    IND_AAA: {
      title: 'IND AAA(SO)',
      description:
        'Instruments with this rating are considered to have the highest degree of safety regarding timely servicing of financial obligations. Such instruments carry lowest credit risk.'
    },
    IND_AA: {
      title: 'IND AA(SO)',
      description:
        'Instruments with this rating are considered to have high degree of safety regarding timely servicing of financial obligations. Such instruments carry very low credit risk.'
    },
    IND_A: {
      title: 'IND A(SO)',
      description:
        'Instruments with this rating are considered to have adequate degree of safety regarding timely servicing of financial obligations. Such instruments carry low credit risk.'
    },
    IND_BBB: {
      title: 'IND BBB(SO)',
      description:
        'Instruments with this rating are considered to have moderate degree of safety regarding timely servicing of financial obligations. Such instruments carry moderate credit risk.'
    },
    IND_BB: {
      title: 'IND BB(SO)',
      description:
        'Instruments with this rating are considered to have moderate risk of default regarding timely servicing of financial obligations.'
    },
    IND_B: {
      title: 'IND B(SO)',
      description:
        'Instruments with this rating are considered to have high risk of default regarding timely servicing of financial obligations.'
    },
    IND_C: {
      title: 'IND C(SO)',
      description:
        'Instruments with this rating are considered to have very high likelihood of default regarding timely payment of financial obligations.'
    },
    IND_D: {
      title: 'IND D(SO)',
      description:
        'Instruments with this rating are in default or are expected to be in default soon.'
    },
    IND_Note_1: {
      title: 'Note 1',
      description:
        'Modifiers (plus) / (minus) can be used with the rating symbols for the categories IND AA(SO) to IND C(SO). The modifiers reflect the comparative standing within the category.'
    }
  };

  constructor(private http: HttpClient, private modalService: BsModalService, public commonService: CommonService) {
  }

  ngOnInit() {
    this.http
      .get('/assets/files/credit-rating.json')
      .subscribe((data: any[]) => {
        this.list = data;
        this.originalList = data;
        this.generateDropDownData();
        this.showCreditInfoByState('uttar pradesh');
      });

    this.http
      .get('/assets/files/credit-rating-detailed.json')
      .subscribe((data: any[]) => {
        this.detailedList = data;
      });
  }

  // onFirstDataRendered(params) {
  //   params.api.sizeColumnsToFit();
  // }

  setDefaultAbsCreditInfo() {
    this.absCreditInfo = {
      title: '',
      ulbs: 0,
      creditRatingUlbs: 0,
      ratings: {
        'AAA+': 0,
        AAA: 0,
        'AAA-': 0,
        'AA+': 0,
        AA: 0,
        'AA-': 0,
        'A+': 0,
        A: 0,
        'A-': 0,
        'BBB+': 0,
        BBB: 0,
        'BBB-': 0,
        BB: 0,
        'BB+': 0,
        'BB-': 0,
        'B+': 0,
        B: 0,
        'B-': 0,
        'C+': 0,
        C: 0,
        'C-': 0,
        'D+': 0,
        D: 0,
        'D-': 0
      }
    };
  }

  showCreditInfoByState(stateName) {
    // const stateName = stName;
    // if(this.selectedStates.indexOf(stateName) > -1){
    //   this.selectedStates.splice(this.selectedStates.indexOf(stateName), 1);
    // }else{
    //   this.selectedStates.push(stateName);
    // }
    this.selectedStates[0] = stateName;
    this.setDefaultAbsCreditInfo();

    const ulbList = [];
    for (let i = 0; i < this.list.length; i++) {
      const ulb = this.list[i];
      if (ulb.state.toLowerCase() == stateName) {
        ulbList.push(ulb['ulb']);
        const rating = ulb.creditrating.trim();
        // this.absCreditInfo.push(item);
        if (!this.absCreditInfo['ratings'][rating]) {
          this.absCreditInfo['ratings'][rating] = 0;
        }
        this.absCreditInfo['ratings'][rating] =
          this.absCreditInfo['ratings'][rating] + 1;
        this.absCreditInfo['creditRatingUlbs'] =
          this.absCreditInfo['creditRatingUlbs'] + 1;
      }
    }

    this.absCreditInfo['title'] = stateName;
    this.absCreditInfo['ulbs'] = ulbList;

    // console.log(ulbList);
    // this.detailedList.forEach(item => {
    //   if(ulbList.indexOf(item.ulb) > -1){
    //     const rating = item.creditRating;
    //     // this.absCreditInfo.push(item);
    //     if(!this.absCreditInfo['ratings'][rating]){
    //       this.absCreditInfo['ratings'][rating.trim()] = 0;
    //     }
    //     this.absCreditInfo['ratings'][rating.trim()] = this.absCreditInfo['ratings'][rating] + 1;
    //     this.absCreditInfo['creditRatingUlbs'] = this.absCreditInfo['creditRatingUlbs'] + 1;
    //   }
    // });
  }

  openUlbInfo(info, template: TemplateRef<any>) {
    // info["ratingScale"] = this.getRatingDesc(info);

    // if(info.creditrating.indexOf("+") > -1 || info.creditrating.indexOf("-") > -1){
    //   info["addedRatingDesc"] = true;
    // }
    // this.ulbInfo = info;

    this.ulbInfo = [];

    this.ulbInfo = this.detailedList.filter(item => {
      return item.ulb == info.ulb;
    });
    this.ulbInfo.forEach(ulb => {
      ulb = this.addRatingDesc(ulb);
    });
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  getUlbInfo(info) {
    this.ulbInfo = [];

    this.ulbInfo = this.detailedList.filter(item => {
      return item.ulb == info.ulb;
    });
    this.ulbInfo.forEach(ulb => {
      ulb = this.addRatingDesc(ulb);
    });
  }

  sortBy(header) {
    if (!this.sortType) {
      this.list = this.sortAsc(this.list, header);
      this.sortType = true;
    } else {
      this.list = this.sortDesc(this.list, header);
      this.sortType = false;
    }
    this.sortHeader = header;
  }

  sortByUlbInfo(header) {
    const arr = JSON.parse(JSON.stringify(this.ulbInfo));
    this.ulbInfo = [];
    setTimeout(() => {
      if (!this.ulbInfoSortType) {
        this.ulbInfo = this.sortAsc(arr, header);
        this.ulbInfoSortType = true;
      } else {
        this.ulbInfo = this.sortDesc(arr, header);
        this.ulbInfoSortType = false;
      }
    }, 0);

    // console.log(this.ulbInfo);
    this.ulbInfoSortHeader = header;
  }

  filterRecords() {
    if (!this.search) {
      this.list = this.originalList;
    } else {
      this.list = this.originalList.filter(item => {
        return item.ulb.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    }
  }

  sortAsc(list, header) {
    return list.sort(function (a, b) {
      // if(header == 'date'){
      //   var d1 = new Date(a[header]);
      //   var d2 = new Date(b[header]);
      //   const c = d1 - d2;
      //   return c;
      // }
      if (header == 'amount') {
        return parseInt(a[header]) - parseInt(b[header]);
      }
      if (a[header].toLowerCase() < b[header].toLowerCase()) {
        // sort string ascending
        return -1;
      }
      if (a[header].toLowerCase() > b[header].toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  sortDesc(list, header) {
    return list.sort(function (a, b) {
      if (header == 'amount') {
        return parseInt(b[header]) - parseInt(a[header]);
      }
      if (a[header].toLowerCase() < b[header].toLowerCase()) {
        // sort string ascending
        return 1;
      }
      if (a[header].toLowerCase() > b[header].toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }

  addRatingDesc(ulbInfo) {
    const ratingKey =
      ulbInfo.agency +
      '_' +
      ulbInfo.creditRating.replace('+', '').replace('-', '');
    if (!this.creditScale[ratingKey]) {
      ulbInfo['ratingDesc'] =
        'We are gathering credit rating scale data from the agency. Information will be available shortly.';
    } else {
      ulbInfo['ratingDesc'] = this.creditScale[ratingKey].description;
    }

    return ulbInfo;
  }

  // getRatingDesc(info){
  //   const agencies = info.agency.split(" / ");
  //   let ratingScale = [];
  //   for (let i = 0; i < agencies.length; i++) {
  //     ratingScale.push({rating: info.creditrating, agency: agencies[i] });

  //     var ratingKey = agencies[i] + "_" + info.creditrating.replace("+", "").replace("-", "");
  //     if(!this.creditScale[ratingKey]){
  //       ratingScale[i]["desc"] = "We are gathering credit rating scale data from the agency. Information will be available shortly.";
  //     } else{
  //       ratingScale[i]["desc"] = this.creditScale[ratingKey].description;
  //     }
  //   }

  //   return ratingScale;
  // }

  ngOnDestroy() {
  }

  openModal(ModalRef: TemplateRef<any>, grade) {
    this.dialogData = this.list.filter(ulb =>
      this.selectedStates.includes(ulb.state.toLowerCase())
      && ulb.creditrating === grade);
    this.modalService.show(ModalRef, {class: 'modal-mdl'});

  }

  private generateDropDownData() {
    this.dropdownFiltersData.states = this.commonService.getUniqueArrayByKey(this.list, 'state').map(state => {
      return {
        id: state,
        name: state
      };
    });
    this.dropdownFiltersData.agencies = this.commonService.getUniqueArrayByKey(this.list, 'agency').map(agency => {
      return {
        id: agency,
        name: agency
      };
    });
    this.dropdownFiltersData.creditRatings = this.commonService.getUniqueArrayByKey(this.list, 'creditrating').map(creditrating => {
      return {
        id: creditrating,
        name: creditrating
      };
    });
    this.dropdownFiltersData.statusRatings = this.commonService.getUniqueArrayByKey(this.list, 'status').map(status => {
      return {
        id: status,
        name: status
      };
    });

  }

  searchDropdownItemSelected(searchFormControl: FormControl, searchKey) {
    let ids;
    if (searchKey === 'ulb') {
      ids = searchFormControl.value;
    } else {
      ids = searchFormControl.value.map(el => el.id);
    }
    if (searchFormControl.value.length) {
      if (searchKey === 'ulb') {
        this.list = this.originalList.filter(ulb => ulb[searchKey].includes(ids));
      } else {
        this.list = this.originalList.filter(ulb => ids.includes(ulb[searchKey]));
      }
    } else {
      this.list = this.originalList;
    }
    let remainingFilters = ['state', 'agency', 'ulb', 'creditrating'].filter((item => item != searchKey));
    for (let filter of remainingFilters) {
      let formControl: FormControl;
      switch (filter) {
        case 'state':
          formControl = this.stateSearchFormControl;
          break;
        case 'agency' :
          formControl = this.agencySearchFormControl;
          break;
        case 'ulb':
          formControl = this.ulbSearchFormControl;
          break;
        case  'creditrating':
          formControl = this.creditSearchFormControl;
          break;
        case 'status':
          formControl = this.statusSearchFormControl;
      }
      if (formControl.value.length) {
        let ids;
        if (filter === 'ulb') {
          ids = formControl.value;
        } else {
          ids = formControl.value.map(el => el.id);
        }
        if (filter === 'ulb') {
          this.list = this.list.filter(ulb => ulb[filter].includes(ids));
        } else {
          this.list = this.list.filter(ulb => ids.includes(ulb[filter]));
        }
      }
    }
  }
}
