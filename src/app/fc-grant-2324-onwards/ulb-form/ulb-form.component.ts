import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ulb-form',
  templateUrl: './ulb-form.component.html',
  styleUrls: ['./ulb-form.component.scss']
})
export class UlbFormComponent implements OnInit {

  leftMenu = {};
  constructor(
    private route: ActivatedRoute
  ) {
    this.getQueryParams();
  }

  ngOnInit(): void {
    this.leftMenu = JSON.parse(localStorage.getItem("leftMenuRes"));
  }
  getQueryParams() {
  this.route.queryParams.subscribe(params => {
    const id = params['id']; // get the 'id' query parameter
    const name = params['name']; // get the 'name' query parameter
  });
}

}
