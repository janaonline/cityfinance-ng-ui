import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { USER_TYPE } from 'src/app/models/user/userType';

@Component({
  selector: "app-user-type-confirmation",
  templateUrl: "./user-type-confirmation.component.html",
  styleUrls: ["./user-type-confirmation.component.scss"],
})
export class UserTypeConfirmationComponent implements OnInit {
  constructor() {}

  @Output()
  userTypeSelected = new EventEmitter<USER_TYPE>();

  USER_TYPE = USER_TYPE;

  onSelectedUser;

  ngOnInit() {}
}
