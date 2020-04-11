import { Component, OnInit } from '@angular/core';

import { USER_TYPE } from '../models/user/userType';
import { ILink } from '../shared/side-menu/side-menu.component';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  sideMenuContent: ILink[] = [
    { title: "ULB", type: "link", route: ["/user/data-upload"] },
    { title: "Links to User Module", type: "other", route: [] },
    { title: "State", type: "link", route: [`/user/list/${USER_TYPE.STATE}`] },
    {
      title: "ULB Profile Edit",
      type: "link",
      route: ["/user/profile/request"]
    },
    {
      title: "Users",
      type: "link",
      route: [`/user/list/${USER_TYPE.USER}`]
    }
  ];

  constructor() {}

  ngOnInit() {}
}
