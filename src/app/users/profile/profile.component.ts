import { Component, OnInit } from '@angular/core';

import { USER_TYPE } from '../../models/user/userType';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  USER_TYPE = USER_TYPE;
  user = {
    type: USER_TYPE.USER
  };

  constructor() {}

  ngOnInit() {}
}
