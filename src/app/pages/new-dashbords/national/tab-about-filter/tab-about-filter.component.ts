import { AfterViewInit, Component, Input, OnInit  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-tab-about-filter',
  templateUrl: './tab-about-filter.component.html',
  styleUrls: ['./tab-about-filter.component.scss']
})
export class TabAboutFilterComponent implements OnInit {

  constructor(
    protected router: Router,
    private activateRoute: ActivatedRoute,
    private _commonServices: CommonService
  ) { }

  @Input() data = [];

  tabData;
  aboutTab;
  nationalFilter = new FormControl();
  globalOptions = [];
  filteredOptions: Observable<any[]>;
  ngOnInit(): void {
   console.log('tab data', this.data);
   this.nationalFilter.valueChanges
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
  activeTabFn(item){
   this.aboutTab = item?.subHeaders[0]?.mainContent[0]?.about;
   this.router.navigate([`dashboard/national/${item._id}`]);
  }
  subFilterFn(type) {
   console.log('btn', type)
  }
}
