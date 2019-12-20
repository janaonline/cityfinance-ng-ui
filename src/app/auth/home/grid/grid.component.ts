import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ULBsStatistics } from 'src/app/models/statistics/ulbsStatistics';
import { CommonService } from 'src/app/shared/services/common.service';
import * as XLSX from 'xlsx';

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"]
})
export class GridComponent implements OnInit {
  stateIds: string[];
  ulbs: ULBsStatistics;
  years: Array<string>;

  @ViewChild('financeTable') financeTable: ElementRef;

  totalRow: any = {
    stateName: "Total",
    totalULBS: [],
    uniqueULBS: [],
    ulbsByYears: {
      ["2015-16"]: {
        amrut: 0,
        nonAmrut: 0,
        total: 0
      },
      ["2016-17"]: {
        amrut: 0,
        nonAmrut: 0,
        total: 0
      },
      ["2017-18"]: {
        amrut: 0,
        nonAmrut: 0,
        total: 0
      }
    }
  };

  tableData:any = null;

  headers:any = {
    0: { key: 'stateName', color: '#333', status: 0 },
    1: { key: 'noOfUlbs', color: '#333', status: 0 },
    2: { key: 'amrut2015', color: '#333', status: 0 },
    3: { key: 'nonAmrut2015', color: '#333', status: 0 },
    4: { key: 'total2015', color: '#333', status: 0 },
    5: { key: 'amrut2016', color: '#333', status: 0 },
    6: { key: 'nonAmrut2016', color: '#333', status: 0 },
    7: { key: 'total2016', color: '#333', status: 0 },
    8: { key: 'amrut2017', color: '#333', status: 0 },
    9: { key: 'nonAmrut2017', color: '#333', status: 0 },
    10: { key: 'total2017', color: '#333', status: 0 },
    11: { key: 'grandTotal', color: '#333', status: 0 }
  }

  constructor(private _commonService: CommonService) {
    this._commonService.getULBsStatistics().subscribe(async ulbs => {
      let count = 0;
      await Object.values(ulbs).forEach(row => {
        count += row.uniqueULBS.length;
        this.totalRow["ulbsByYears"]["2015-16"].amrut += row.ulbsByYears[
          "2015-16"
        ]
          ? row.ulbsByYears["2015-16"].amrut
          : 0;
        this.totalRow["ulbsByYears"]["2015-16"].nonAmrut += row.ulbsByYears[
          "2015-16"
        ]
          ? row.ulbsByYears["2015-16"].nonAmrut
          : 0;
        this.totalRow["ulbsByYears"]["2015-16"].total += row.ulbsByYears[
          "2015-16"
        ]
          ? row.ulbsByYears["2015-16"].total
          : 0;
        this.totalRow["ulbsByYears"]["2016-17"].amrut += row.ulbsByYears[
          "2016-17"
        ]
          ? row.ulbsByYears["2016-17"].amrut
          : 0;
        this.totalRow["ulbsByYears"]["2016-17"].nonAmrut += row.ulbsByYears[
          "2016-17"
        ]
          ? row.ulbsByYears["2016-17"].nonAmrut
          : 0;
        this.totalRow["ulbsByYears"]["2016-17"].total += row.ulbsByYears[
          "2016-17"
        ]
          ? row.ulbsByYears["2016-17"].total
          : 0;
        this.totalRow["ulbsByYears"]["2017-18"].amrut += row.ulbsByYears[
          "2017-18"
        ]
          ? row.ulbsByYears["2017-18"].amrut
          : 0;
        this.totalRow["ulbsByYears"]["2017-18"].nonAmrut += row.ulbsByYears[
          "2017-18"
        ]
          ? row.ulbsByYears["2017-18"].nonAmrut
          : 0;
        this.totalRow["ulbsByYears"]["2017-18"].total += row.ulbsByYears[
          "2017-18"
        ]
          ? row.ulbsByYears["2017-18"].total
          : 0;
      });

      this.totalRow["uniqueULBS"].length = count;
      ulbs["total"] = await this.totalRow;

      this.years = this.getUniqueYears(ulbs);
      this.stateIds = Object.keys(ulbs).sort();
      this.ulbs = ulbs;

      let tablePlot = [];

      this.stateIds.forEach(stateId => {
        tablePlot.push({
          stateName: this.ulbs[stateId].stateName,
          noOfUlbs: this.ulbs[stateId]["uniqueULBS"].length,
          amrut2015: this.ulbs[stateId]["ulbsByYears"]["2015-16"] ? this.ulbs[stateId]["ulbsByYears"]["2015-16"].amrut : 0,
          nonAmrut2015: this.ulbs[stateId]["ulbsByYears"]["2015-16"] ? this.ulbs[stateId]["ulbsByYears"]["2015-16"].nonAmrut : 0,
          total2015: this.ulbs[stateId]["ulbsByYears"]["2015-16"] ? this.ulbs[stateId]["ulbsByYears"]["2015-16"].total : 0,
          amrut2016: this.ulbs[stateId]["ulbsByYears"]["2016-17"] ? this.ulbs[stateId]["ulbsByYears"]["2016-17"].amrut : 0,
          nonAmrut2016: this.ulbs[stateId]["ulbsByYears"]["2016-17"] ? this.ulbs[stateId]["ulbsByYears"]["2016-17"].nonAmrut : 0,
          total2016: this.ulbs[stateId]["ulbsByYears"]["2016-17"] ? this.ulbs[stateId]["ulbsByYears"]["2016-17"].total : 0,
          amrut2017: this.ulbs[stateId]["ulbsByYears"]["2017-18"] ? this.ulbs[stateId]["ulbsByYears"]["2017-18"].amrut : 0,
          nonAmrut2017: this.ulbs[stateId]["ulbsByYears"]["2017-18"] ? this.ulbs[stateId]["ulbsByYears"]["2017-18"].nonAmrut : 0,
          total2017: this.ulbs[stateId]["ulbsByYears"]["2017-18"] ? this.ulbs[stateId]["ulbsByYears"]["2017-18"].total : 0,
          grandTotal: (this.ulbs[stateId]["ulbsByYears"]["2015-16"] ? this.ulbs[stateId]["ulbsByYears"]["2015-16"].total : 0) +
                      (this.ulbs[stateId]["ulbsByYears"]["2016-17"] ? this.ulbs[stateId]["ulbsByYears"]["2016-17"].total : 0) +
                      (this.ulbs[stateId]["ulbsByYears"]["2017-18"] ? this.ulbs[stateId]["ulbsByYears"]["2017-18"].total : 0)
        });
      });
      this.tableData = tablePlot;
    });
  }

  private getUniqueYears(ulbs: ULBsStatistics) {
    const years = new Set<string>();
    Object.keys(ulbs).forEach(stateId => {
      Object.keys(ulbs[stateId].ulbsByYears).forEach(year => years.add(year));
    });
    return Array.from(years).sort();
  }

  downloadTableData(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.financeTable.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'financial-report.xlsx');
  }

  sortTableData(key, order, index){

    let sortData = this.tableData.slice();

    let lastItem = sortData.pop();

    //console.log(key, order, index);
    if(order == -1 || order == 0){
      Object.keys(this.headers).forEach((x,i) =>{
        if(i == index){
          this.headers[i].status = 1;
          this.headers[i].color = '#43b8ea';
        }else{
          this.headers[i].status = 0;
          this.headers[i].color = '#555';
        }
      });
      //ascending
      sortData.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
    }else{
      Object.keys(this.headers).forEach((x,i) =>{
        if(i == index){
          this.headers[i].status = -1;
          this.headers[i].color = '#555'
        }else{
          this.headers[i].status = 0;
          this.headers[i].color = '#555';
        }
      });

      //descending
      sortData.sort((a,b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0));
    }
    sortData.push(lastItem);
    this.tableData = sortData;
  }

  ngOnInit() {}
}
