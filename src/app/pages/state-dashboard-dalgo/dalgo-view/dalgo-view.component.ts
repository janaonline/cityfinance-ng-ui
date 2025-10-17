import { Component, OnInit } from '@angular/core';
import { DalgoComponent } from 'src/app/shared/components/dalgo/dalgo.component';

@Component({
  standalone: true,
  imports: [DalgoComponent],
  selector: 'app-dalgo-view',
  templateUrl: './dalgo-view.component.html',
  styleUrls: ['./dalgo-view.component.scss']
})
export class DalgoViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
