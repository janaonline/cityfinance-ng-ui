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

  constructor(private _commonService: CommonService) {
    this._commonService.getULBsStatistics().subscribe(ulbs => {
      this.years = this.getUniqueYears(ulbs);
      this.stateIds = Object.keys(ulbs);
      this.ulbs = ulbs;
      // this.years = ulbs
    });
  }

  private getUniqueYears(ulbs: ULBsStatistics) {
    const years = new Set<string>();
    Object.keys(ulbs).forEach(stateId => {
      Object.keys(ulbs[stateId].ulbsByYears).forEach(year => years.add(year));
    });
    console.log(years);
    return years;
  }

  ngOnInit() {}
}
