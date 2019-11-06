import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.loadStates(true);
  }

}
