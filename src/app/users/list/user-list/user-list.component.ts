import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../dashboard/user/user.service';
import { UserProfile } from '../../profile/model/user-profile';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  userList: UserProfile[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers({}).subscribe(res => {
      console.log(res);
      if (res["success"]) {
        this.userList = res["data"];
      } else {
        alert("Failed");
      }
    });
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
}
