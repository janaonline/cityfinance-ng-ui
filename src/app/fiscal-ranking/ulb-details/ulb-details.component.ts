import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ulb-details',
  templateUrl: './ulb-details.component.html',
  styleUrls: ['./ulb-details.component.scss']
})
export class UlbDetailsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  get ulbId() {
    return this.activatedRoute.snapshot.params.ulbId;
  }

  ngOnInit(): void {
  }

}
