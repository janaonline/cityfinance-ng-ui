import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

import { PublicFile } from '../models/fileList';

@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.scss"],
})
export class FileComponent implements OnInit {
  files: PublicFile[];

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.getPublicFileList().subscribe((res) => {
      // this.files = res;
      this.files = res.filter(
        (file) => file._id !== "5ece1bb38accef1fcfecc373"
      );
    });
  }
}
