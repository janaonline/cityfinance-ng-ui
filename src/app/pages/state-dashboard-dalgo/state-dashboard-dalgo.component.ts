import { Component, OnInit } from '@angular/core';
import { DalgoComponent } from 'src/app/shared/components/dalgo/dalgo.component';

@Component({
  standalone: true,
  imports: [DalgoComponent],
  selector: 'app-state-dashboard-dalgo',
  templateUrl: './state-dashboard-dalgo.component.html',
  styleUrls: ['./state-dashboard-dalgo.component.scss']
})
export class StateDashboardDalgoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
