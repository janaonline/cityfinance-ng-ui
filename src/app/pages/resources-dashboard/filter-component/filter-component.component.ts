import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss']
})
export class FilterComponentComponent implements OnInit {

  @Output()
  filterFormData = new EventEmitter<any>();
//  @Output() clearfilter = new EventEmitter<any>();

  @Input() filterInputData;
  constructor(
    private fb: FormBuilder,
    private _commonServices : CommonService
  ) { }

  filterForm;
  stateList;
  ulbList;
  globalOptions = [];
  filteredOptions: Observable<any[]>;
  ngOnInit(): void {
      console.log('daaaaa', this.filterInputData)
    this.filterForm = this.fb.group({
       state: [''],
       ulb:['City'],
       contentType:[''],
       sortBy:['']
    });
    this.loadData();
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
    this.filterForm?.controls?.ulb?.valueChanges
    .subscribe(value => {
      if(value?.length >= 1){
        this._commonServices.postGlobalSearchData(value).subscribe((res: any) => {
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

  filterData() {
    console.log('filter form', this.filterForm);
    this.filterFormData.emit(this.filterForm);
  }
  clearAll() {
  //  this.filterFormData.emit(this.filterForm);
    this.filterForm.reset();
    this.filterFormData.emit(this.filterForm);
    this.filterForm.patchValue({
      state: '',
       ulb: 'City',
       contentType: '',
       sortBy: ''

    });
  }
}
