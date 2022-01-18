import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { ResourcesServicesService } from '../resDashboard-services/resources-services.service';

@Component({
  selector: 'app-check-score-performance',
  templateUrl: './check-score-performance.component.html',
  styleUrls: ['./check-score-performance.component.scss']
})
export class CheckScorePerformanceComponent implements OnInit {

  constructor(
    private _commonService: CommonService,
    private resource_das_services : ResourcesServicesService,
    public dialog: MatDialog
  ) { }
  globalFormControl = new FormControl();
  globalOptions = [];
  filteredOptions: Observable<any[]>;
  scoreReportData;
  prescription;
  ulb_id = '';
  reportScoreDiv = false;
  ngOnInit(): void {

    this.globalFormControl.valueChanges
    .subscribe(value => {
      if(value.length >= 1){
        this._commonService.postGlobalSearchData(value).subscribe((res: any) => {
          console.log(res?.data);
          let emptyArr:any = []
            this.filteredOptions = emptyArr;
          if(res?.data.length > 0 ){
            this.filteredOptions = res?.data;
          //  this.noDataFound = false;
          }else{

            let emptyArr:any = []
            this.filteredOptions = emptyArr;
          //  this.noDataFound = true;
            console.log('no data found')
          }
        });
      }
      else {
        return null;
      }
    })
  }

  globalSearchClick() {

    let searchArray:any = this.filteredOptions;
    let searchValue = searchArray.find(e => e?.name.toLowerCase() == this.globalFormControl?.value.toLowerCase());
    this.ulb_id = searchValue?._id;
    console.log('eeeee', this.globalFormControl, searchValue, searchArray);
    if(this.ulb_id != '') {
      this.resource_das_services.getReportCard(this.ulb_id).subscribe((res: any)=>{
       console.log('responce ulb..', res, typeof(res));
       this.reportScoreDiv = true;
       this.scoreReportData = res?.data;
       this.prescription = res?.data?.currentUlb?.partcularAnswerValues[0]?.prescription;
        if(this.scoreReportData){
        //   this.stepperScoreDiv = false;
        //  this.reportScoreDiv = true;
        //  this.btnName = 'Try Again'
        }else {
        //  this.stepperScoreDiv = true;
        //  this.reportScoreDiv = false;
        }


      },
    (error)=> {
     console.log('error', error)
     })
    }
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  presDetails(presItem) {
    console.log(presItem);
    this.prescription = presItem?.prescription;
  }

}
