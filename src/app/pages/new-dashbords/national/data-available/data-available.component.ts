import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-data-available',
  templateUrl: './data-available.component.html',
  styleUrls: ['./data-available.component.scss']
})
export class DataAvailableComponent implements OnInit {

  constructor(
    private _commonServices: CommonService
  ) { }
  stateList;
  popBtn = true;
  tableData;

  ngOnInit(): void {
    this.loadData();
    this.subFilterFn('popCat');
  }

  loadData(){
    this._commonServices.fetchStateList().subscribe((res: any)=>{
      console.log('res', res);
      this.stateList = res;
     },
     (error)=>{
       console.log(error)
     })
  }
  subFilterFn(type){
    if(type == 'popCat'){
    this.popBtn = true;
    this.tableData = {
      timeStamp : 12332323434,
      success:true,
      message: 'success',
      data: [
        {
          tableId:1,
          name:"Revenue Table",
          tableClass: 'revenue_tb',
          border:"1",
          bgColor: '#9D84B7',
          columns : [
            {
            key: 'ulbType',
            display_name: "ULB Type",
            },
          {
            key: 'numberOfULBs',
            display_name: "Number Of ULBs",
          },
          {
            key: 'ulbsWithData',
            display_name: "ULBs With Data",
          },
           {
              key : 'DataAvailPercentage',
              display_name: 'Data Availability Percentage'
           },
           {
            key : 'urbanPopulationPercentage',
            display_name: 'Urban population percentage'
         },

          ],
          rows: [
            {
             // lineItem: 'Average',
              ulbType:'Average',
              numberOfULBs: '1500',
              ulbsWithData: '111',
              DataAvailPercentage: '30%',
              urbanPopulationPercentage: '20%'
            },
            {
              // lineItem: 'Average',
               ulbType:'4M+',
               numberOfULBs: '1500',
               ulbsWithData: '111',
               DataAvailPercentage: '30%',
               urbanPopulationPercentage: '20%'
             },
            {
             // lineItem: 'Municipal Corporation',
               ulbType:'1M-4M',
               numberOfULBs: '1500',
               ulbsWithData: '111',
               DataAvailPercentage: '30%',
               urbanPopulationPercentage: '20%'
            },
            {
             // lineItem: 'Municipality',
              ulbType:'500K-1M',
              numberOfULBs: '1500',
              ulbsWithData: '111',
              DataAvailPercentage: '30%',
              urbanPopulationPercentage: '20%'
            },
            {
             // lineItem: 'Town Panchayat',
              ulbType:'100K-500K',
              numberOfULBs: '1500',
              ulbsWithData: '111',
              DataAvailPercentage: '30%',
              urbanPopulationPercentage: '20%'
            },
            {
              // lineItem: 'Town Panchayat',
                ulbType:'<100K',
                numberOfULBs: '1500',
                ulbsWithData: '111',
                DataAvailPercentage: '30%',
                urbanPopulationPercentage: '20%'
             },

          ]
        },

      ]
  }
    }
    if(type == 'ulbType'){
      this.popBtn = false;
      this.tableData = {
        timeStamp : 12332323434,
        success:true,
        message: 'success',
        data: [
          {
            tableId:1,
            name:"Data availability table",
            tableClass: 'revenue_tb',
            border:"1",
            bgColor: '#9D84B7',
            columns : [
              {
              key: 'ulbType',
              display_name: "ULB Type",
              },
            {
              key: 'numberOfULBs',
              display_name: "Number Of ULBs",
            },
            {
              key: 'ulbsWithData',
              display_name: "ULBs With Data",
            },
             {
                key : 'DataAvailPercentage',
                display_name: 'Data Availability Percentage'
             },
             {
              key : 'urbanPopulationPercentage',
              display_name: 'Urban population percentage'
           },

            ],
            rows: [
              {
               // lineItem: 'Average',
               ulbType:'Average',
               numberOfULBs: '12000',
               ulbsWithData: '12000',
                DataAvailPercentage: '75%',
                urbanPopulationPercentage: '50%'
              },
              {
               // lineItem: 'Municipal Corporation',
               ulbType:'Municipal Corporation',
               numberOfULBs: '501',
               ulbsWithData: '121',
                DataAvailPercentage: '50%',
                urbanPopulationPercentage: '30%'
              },
              {
               // lineItem: 'Municipality',
               ulbType:'Municipality',
               numberOfULBs: '1500',
               ulbsWithData: '111',
                DataAvailPercentage: '30%',
                urbanPopulationPercentage: '20%'
              },
              {
               // lineItem: 'Town Panchayat',
               ulbType:'Town Panchayat',
               numberOfULBs: '1200',
               ulbsWithData: '600',
                DataAvailPercentage: '10%',
                urbanPopulationPercentage: '8%'
              },

            ]
          },

        ]
      }
    }
  }
}
