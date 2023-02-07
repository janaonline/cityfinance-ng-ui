import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-common-action-radio',
  templateUrl: './common-action-radio.component.html',
  styleUrls: ['./common-action-radio.component.scss']
})
export class CommonActionRadioComponent implements OnInit {

  @Input() status;
  @Output() statusChange = new EventEmitter();

  constructor() { }

  // value: 'PENDING' | 'APPROVED' | 'REJECT' = 'PENDING';

  ngOnInit(): void {

  }

  setType(type) {
    this.statusChange.emit(type);
  }

}
