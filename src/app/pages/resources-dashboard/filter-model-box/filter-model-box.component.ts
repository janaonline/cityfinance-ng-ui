import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';

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
  ) { }

  @Output()
  filterFormData = new EventEmitter<any>();
//  @Output() clearfilter = new EventEmitter<any>();

  @Input() filterInputData;
  filterForm;
  stateList;
  ulbList;
  globalOptions = [];
  filteredOptions: Observable<any[]>;
  ngOnInit(): void {
      console.log('daaaaa', this.filterInputData)
    this.filterForm = this.fb.group({
       state: [''],
       ulb:[''],
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
       ulb: '',
       contentType: '',
       sortBy: ''

    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
