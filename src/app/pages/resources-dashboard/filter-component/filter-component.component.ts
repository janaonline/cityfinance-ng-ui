import { Component, EventEmitter, Input, OnInit, OnChanges, Output,SimpleChange, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FilterModelBoxComponent } from '../filter-model-box/filter-model-box.component';
@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss']
})
export class FilterComponentComponent implements OnInit, OnChanges {

  @Output()
  filterFormData = new EventEmitter<any>();
//  @Output() clearfilter = new EventEmitter<any>();

  @Input() filterInputData;

  @Input() category; 
  constructor(
    private fb: FormBuilder,
    private _commonServices : CommonService,
    public dialog: MatDialog
  ) { 
    this.filterData('','')
  }


  stateList;
  ulbList;
  filterForm;
  globalOptions = [];
  yearList=['2015-16','2016-17','2017-18','2018-19','2019-20','2020-21']
  cType =['Raw Data PDF', 'Standardised Excel', 'Raw Data Excel', 'Standardised PDF']
  filteredOptions: Observable<any[]>;
  ngOnInit(): void {
      console.log('daaaaa', this.filterInputData)
    this.filterForm = this.fb.group({
       state: [''],
       ulb:[''],
       contentType:[''],
       sortBy:[''],
       year:[''],
       category: this.category
    });
    this.loadData();
  }
  selectedValue: String = '2020-21'
  selectedType: String = 'Raw Data PDF'
  onChange(event){
    this.selectedValue = event.value
    this.filterData('year','')
  }
  onChangeType(event){
    this.selectedType = event.value
    this.filterData('type','')
  }
  loadData(){
    this._commonServices.fetchStateList().subscribe((res: any)=>{
     console.log('res', res);
     this.stateList = res;
    },
    (error)=>{
      console.log(error)
    })

    console.log('formmm', this.filterForm)
    this.filterForm?.controls?.category?.valueChanges.subscribe(val=>{
      console.log(this.filterForm)
    })
    this.filterForm?.controls?.ulb?.valueChanges
    .subscribe(value => {
      if(value?.length >= 1){
        this._commonServices.postGlobalSearchData(value,"ulb").subscribe((res: any) => {
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
      }
      else {
        return null;
      }
    })
  }
  ngOnChanges(changes: {[category: string]: SimpleChange}) {
    // check the object "changes" for new data
    console.log('chanhged happed', changes.category.currentValue)
    this.filterData('category','')
  }
  filterData(param, val) {
    console.log('filter form', this.filterForm);
  if(param == 'ulb'){
    console.log(val)
    this.filterForm.patchValue({
      state: val
    })
  }else if(param == 'state'){
    this.filterForm.patchValue({
      ulb: ""
    })
  }
    this.filterFormData.emit(this.filterForm);
  }
  clearAll() {
  //  this.filterFormData.emit(this.filterForm);
    this.filterForm.reset();
   
    this.filterForm.patchValue({
      state: '',
       ulb: '',
       contentType: 'Raw Data PDF',
       sortBy: '',
        year:'2021-22'
    });
    this.filterFormData.emit(this.filterForm);
    this.loadData()
  }
  filterModel() {

    const dialogRef = this.dialog.open(FilterModelBoxComponent, {
      width: '100%',
      height: '100%',
     data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
