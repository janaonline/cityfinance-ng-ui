import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grant-allocation',
  templateUrl: './grant-allocation.component.html',
  styleUrls: ['./grant-allocation.component.scss']
})
export class GrantAllocationComponent implements OnInit {

  constructor() { }
  account = '';
  linked = '';

  ngOnInit(): void {
  }
  onClickYes() {

    this.account = 'yes';

    this.linked = '';
  }
  onClickNo() {

    this.account = 'no';

    this.linked = 'no';
    // if (!this.change)
  }
}
