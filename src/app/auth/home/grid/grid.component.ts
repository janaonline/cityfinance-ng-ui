import { Component, OnInit } from '@angular/core';
import { ULBsStatistics } from 'src/app/models/statistics/ulbsStatistics';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"]
})
export class GridComponent implements OnInit {
  stateIds: string[];
  ulbs: ULBsStatistics;
  years: Set<string>;

  totalRow: any = {
    stateName: 'Total',
    totalULBS: [],
    ulbsByYears: {
      ["2015-16"]: {
        amrut: 0,
        nonAmrut: 0,
        total:0
      },
      ["2016-17"]: {
        amrut: 0,
        nonAmrut: 0,
        total:0
      },
      ["2017-18"]: {
        amrut: 0,
        nonAmrut: 0,
        total:0
      }
    }
  };

  constructor(private _commonService: CommonService) {
    this._commonService.getULBsStatistics().subscribe(async ulbs => {
      let count = 0;
      await Object.values(ulbs).forEach(row => {
        count += row.totalULBS.length;
        this.totalRow['ulbsByYears']['2015-16'].amrut += row.ulbsByYears['2015-16'] ? row.ulbsByYears['2015-16'].amrut : 0;
        this.totalRow['ulbsByYears']['2015-16'].nonAmrut += row.ulbsByYears['2015-16'] ? row.ulbsByYears['2015-16'].nonAmrut : 0;
        this.totalRow['ulbsByYears']['2015-16'].total += row.ulbsByYears['2015-16'] ? row.ulbsByYears['2015-16'].total : 0;
        this.totalRow['ulbsByYears']['2016-17'].amrut += row.ulbsByYears['2016-17'] ? row.ulbsByYears['2016-17'].amrut : 0;
        this.totalRow['ulbsByYears']['2016-17'].nonAmrut += row.ulbsByYears['2016-17'] ? row.ulbsByYears['2016-17'].nonAmrut : 0;
        this.totalRow['ulbsByYears']['2016-17'].total += row.ulbsByYears['2016-17'] ? row.ulbsByYears['2016-17'].total : 0;
        this.totalRow['ulbsByYears']['2017-18'].amrut += row.ulbsByYears['2017-18'] ? row.ulbsByYears['2017-18'].amrut : 0;
        this.totalRow['ulbsByYears']['2017-18'].nonAmrut += row.ulbsByYears['2017-18'] ? row.ulbsByYears['2017-18'].nonAmrut : 0;
        this.totalRow['ulbsByYears']['2017-18'].total += row.ulbsByYears['2017-18'] ? row.ulbsByYears['2017-18'].total : 0;
      });

      this.totalRow['totalULBS'].length = count ;
      ulbs['total'] = await this.totalRow;

      this.years = this.getUniqueYears(ulbs);
      this.stateIds = Object.keys(ulbs);
      this.ulbs = ulbs;
    });
  }

  private getUniqueYears(ulbs: ULBsStatistics) {
    const years = new Set<string>();
    Object.keys(ulbs).forEach(stateId => {
      Object.keys(ulbs[stateId].ulbsByYears).forEach(year => years.add(year));
    });
    // console.log(years);
    return years;
  }

  ngOnInit() {}
}
