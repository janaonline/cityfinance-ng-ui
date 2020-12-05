import { Component, Input, OnInit } from '@angular/core';
import { USER_TYPE } from 'src/app/models/user/userType';
import { UPLOAD_STATUS } from 'src/app/util/enums';

@Component({
  selector: "app-formhistory",
  templateUrl: "./formhistory.component.html",
  styleUrls: ["./formhistory.component.scss"],
})
export class FormhistoryComponent implements OnInit {
  @Input()
  data;

  uploadStatus = UPLOAD_STATUS;

  userTypes = USER_TYPE;

  constructor() {}

  ngOnInit() {}
}
