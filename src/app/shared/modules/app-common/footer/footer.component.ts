import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  totalUsersVisit: number;

  constructor(private _commonService: CommonService) {}

  ngOnInit() {
    this.fetchUserVisitCount();
  }

  private fetchUserVisitCount() {
    this._commonService
      .getWebsiteVisitCount()
      .subscribe((res) => (this.totalUsersVisit = res));
  }
}
