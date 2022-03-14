import { Component, OnInit } from '@angular/core';
import{ResourcesDashboardService} from '../resources-dashboard.service'
import { Router, NavigationStart, Event,NavigationEnd } from "@angular/router";
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
@Component({
  selector: 'app-data-sets',
  templateUrl: './data-sets.component.html',
  styleUrls: ['./data-sets.component.css']
})
export class DataSetsComponent implements OnInit {

  constructor(
    private _resourcesDashboardService: ResourcesDashboardService,
    private router: Router,
    public globalLoaderService: GlobalLoaderService
  ) {
    
    router.events.subscribe((val) => {
      // see also 
      console.log(val instanceof NavigationEnd, this.router.url) 
      if(this.router.url.includes('income_statement')){
this.category = 'income'
      }else if(this.router.url.includes('balanceSheet')){
this.category = 'balance'
      }
  });
   }
   category;
  filterComponent;
  tabData = [
    {
       name: "Income Statement",
       filter: ["innerTab1", "innerTab2", "innerTab3"],
       link: 'income_statement'
      },
    {
       name: "Balance Sheet",
       filter: ["innerTab4", "innerTab5", "innerTab6"],
       link: 'balanceSheet' ,
    },
   

  ];
  year;
  type
  ngOnInit(): void {
    this.filterComponent ={
      comp: 'dataSets'
    }
    this.getData()

  }
  openNewTab(url){
    window.open(url, '_blank');
  }
 noData = false;
  getData(){
    
    this.globalLoaderService.showLoader()
    this._resourcesDashboardService.getDataSets(this.year, this.type, this.category, this.state, this.ulb).subscribe((res)=>{

      this.balData = res['data']
      if(this.balData.length==0){
        this.noData = true
      }else{
this.noData = false
      }
      this.globalLoaderService.stopLoader()
    },(err)=>{
      this.globalLoaderService.stopLoader()
      console.log(err.message)
    })
  }
  balData = []
 allSelected = false;
 unSelect = false;
 selectedUsersList =[];
state
ulb
  filterData(e){
    console.log('Data sets', e);
this.year = e?.controls?.year?.value ?? '2020-21'
this.type = e?.controls?.contentType?.value ?? 'Raw Data PDF'
this.state = e?.controls?.state?.value 
this.ulb = e?.controls?.ulb?.value 
this.getData()
  }

  isAllSelected(All:boolean = false) {
    if(All){
      const numSelected = this.selectedUsersList.length;
      const numRows = this.balData.length;
      return numSelected === numRows;
    }else{
      return !!this.selectedUsersList.length;
    }
  }
  async masterToggle() {
    if(this.isAllSelected(true)){
      for await (const user of this.balData) {
        user[`isSelected`] = false;
      }
      this.selectedUsersList = [];
    }else{
      this.selectedUsersList = [];
      this.balData.forEach(row => {
        this.selectedUsersList.push(row)
        row[`isSelected`] = true;
      });
    }
    console.log(this.selectedUsersList);
  }

  toggleRowSelection(event,row){
    if(row.isSelected){
      let index = this.selectedUsersList.findIndex(el => el._id == row._id);
      console.log(index);
      if(index > -1)
      this.selectedUsersList.splice(index,1);
      row.isSelected = false;
    }else{
      this.selectedUsersList.push(row);
      row.isSelected = true;
    }
    console.log(this.selectedUsersList);
  }
}
