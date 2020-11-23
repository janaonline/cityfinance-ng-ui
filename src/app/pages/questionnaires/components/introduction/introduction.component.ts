import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { USER_TYPE } from 'src/app/models/user/userType';

@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.component.html",
  styleUrls: ["./introduction.component.scss"],
})
export class IntroductionComponent implements OnInit {
  @Input()
  userType: USER_TYPE;

  @Output()
  completed: EventEmitter<boolean> = new EventEmitter();

  USER_TYPE = USER_TYPE;

  constructor() {}

  ngOnInit() {}
}
