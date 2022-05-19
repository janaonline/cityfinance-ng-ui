import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';

@Component({
  selector: 'app-filter-model-box',
  templateUrl: './filter-model-box.component.html',
  styleUrls: ['./filter-model-box.component.scss']
})
export class FilterModelBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FilterModelBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private _commonServices : CommonService,
    public _loaderService: GlobalLoaderService,
  ) { }

  @Output()
  filterFormData = new EventEmitter<any>();
//  @Output() clearfilter = new EventEmitter<any>();

  @Input() filterInputData;
  filterForm;
  stateList: any = [];
  ulbList: any;
  globalOptions = [];
  filteredOptions: Observable<any[]>;
  ulbTypeList: any = [];
  populationCategoryList: any = [];
  yearList: any = [];
  preSelectedValue: any;

  defaultStage: boolean = false;
  defaultFilterConfig: any = {
    isState: true,
    isUlb: true,
    isYear: true,
    isUlbType: true,
    isPopulationCat: true,
    isContentType: false,
    useFor: "ownRevenueDashboard"
  };
  mobileFilterConfig: any;
  fileType: any = [];
  ngOnInit(): void {
    console.log('data', this.data);
    this.ulbTypeList = this.data && this.data?.ulbTypeList;
    this.populationCategoryList = this.data && this.data?.populationCategoryList;
    this.yearList = this.data && this.data?.yearList;
    this.preSelectedValue = this.data && this.data?.preSelectedValue;
    this.mobileFilterConfig = this.data.hasOwnProperty('mobileFilterConfig') ? (this.data?.mobileFilterConfig) : this.defaultFilterConfig;
    this.fileType = this.data && this.data.fileType;

    console.log('data ====>', this.filterInputData)
    this.filterForm = this.fb.group({
      stateId: "",
      ulb: "",
      ulbType: "",
      populationCategory: "",
      financialYear: "",
      contentType: "",
    });
    this.loadData();
    this.filterForm.patchValue({
      financialYear: this.preSelectedValue && this.preSelectedValue?.financialYear || this.yearList[0],
      contentType: this.preSelectedValue?.contentType ?? 'Raw Data PDF'
    });
  }

  loadData(){
    const stateList = sessionStorage.getItem('allStateList');
    if (!stateList) {
      this._loaderService.showLoader();
      this._commonServices.fetchStateList().subscribe((res: any)=>{
        this._loaderService.stopLoader();
        this.stateList = this._commonServices.sortDataSource(res, 'name');
        sessionStorage.setItem('allStateList', JSON.stringify(this.stateList));
      },
      (error)=>{
        this._loaderService.stopLoader();
        console.log(error)
      })
    } else {
      this.stateList = JSON.parse(stateList);
    }

    console.log('form', this.filterForm)
    this.filterForm?.controls?.ulb?.valueChanges
    .subscribe(value => {
      console.log('form', this.filterForm, this.filterForm.controls.stateId.value);
      let stateId: any = this.filterForm.controls.stateId.value;
      if(value?.length >= 1){
        this._commonServices.postGlobalSearchData(value, "ulb", stateId ? stateId : "").subscribe((res: any) => {
          console.log(res?.data);
          let emptyArr:any = []
            this.filteredOptions = emptyArr;
          if(res?.data.length > 0 ){
            this.filteredOptions = res?.data;
            //this.noDataFound = false;
          }else{

            let emptyArr:any = []
            this.filteredOptions = emptyArr;
           // this.noDataFound = true;
            console.log('no data found')
          }
        });
      } else {
        let emptyArr: any = [];
        this.filteredOptions = emptyArr;
        return null;
      }
    })

    if (this.data && this.data?.defaultStage) {
      this.patchFormData(this.preSelectedValue);
    }
  }

  filterData(param, val) {
    console.log('filterData', param, 'val', val);
    console.log("filter form", this.filterForm);
    if (param == "ulb") {
      console.log(val);
      let pop;
      if (val?.population > 4000000) {
        pop = "4 Million+";
      } else if (val?.population < 4000000 && val?.population > 1000000) {
        pop = "1 Million - 4 Million";
      } else if (val?.population < 1000000 && val?.population > 500000) {
        pop = "500 Thousand - 1 Million";
      } else if (val?.population < 500000 && val?.population > 100000) {
        pop = "100 Thousand - 500 Thousand";
      } else if (val?.population < 100000) {
        pop = "<100 Thousand";
      }
      this.filterForm.patchValue({
        stateId: val?.state?._id,
        ulbType: val?.ulbType?._id,
        populationCategory: pop,
      });
    } else if (param == "state") {
      this.filterForm.patchValue({
        ulb: "",
        ulbType: "ULB Type",
        populationCategory: "",
      });
      let emptyArr: any = [];
      this.filteredOptions = emptyArr;
    } else if (param == "ulbType") {
      this.filterForm.patchValue({
        ulb: "",
        stateId: "State Name",
        populationCategory: "Ulb Population Category",
      });
    } else if (param == "popCat") {
      this.filterForm.patchValue({
        ulb: "",
        stateId: "",
        ulbType: "ULB Type",
      });
    } else if (param == "year") {
      // this.filterForm.patchValue({
      //   ulb: ""
      // })
    } else if (param == "contentType") {
      // this.filterForm.patchValue({
      //   contentType: val
      // })
    }
  }

  clearAll() {
    this.filterForm.reset();
    this.filterForm.patchValue({
      stateId: '',
      ulb:'',
      ulbType: '',
      populationCategory: '',
      financialYear: this.yearList[0],
      contentType: 'Raw Data PDF'
    });
    this.defaultStage = false;
    let defaultFilter: any;
    if (this.mobileFilterConfig?.useFor == "resourcesDashboard") {
      defaultFilter = {
        value: {
          "state": "",
          "ulb": "",
          "ulbId": "",
          "contentType": "Raw Data PDF",
          "sortBy": "",
          "year": this.yearList[0],
          "category": null
        }
      }
    } else {
      defaultFilter = {
        "stateId": "State Name",
        "ulb": "",
        "ulbType": "ULB Type",
        "populationCategory": "ULB Population Category",
        "financialYear": this.yearList[0],
      }
    }

    this.dialogRef.close({filterForm: defaultFilter, defaultStage: this.defaultStage});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  emitFilterData() {
    this.defaultStage = true;
    const formData = this.filterForm.value;
    if (this.mobileFilterConfig?.useFor == "resourcesDashboard") {
      let filterData = {
        value: {...formData, "state": formData?.stateId, "ulbId": formData?.ulb, "year": formData?.financialYear}
      }
      this.dialogRef.close({filterForm: filterData, defaultStage: this.defaultStage});
    } else {
      this.dialogRef.close({filterForm: this.filterForm.value, defaultStage: this.defaultStage});      
    }
    // this.dialogRef.close({filterForm: this.filterForm.value, defaultStage: this.defaultStage});
  }

  patchFormData(formData: any) {
    console.log('patchFormData', formData)
    this.filterForm.patchValue({
      stateId: formData && formData?.stateId || '',
      ulb: formData && formData?.ulb || '',
      ulbType: formData && formData?.ulbType || '',
      populationCategory: formData && formData?.populationCategory || '',
      financialYear: formData && formData?.financialYear || '',
      contentType: formData && formData?.contentType || 'Raw Data Excel'
    });
  }
}
