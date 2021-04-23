import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entry-list5',
  templateUrl: './entry-list5.component.html',
  styleUrls: ['./entry-list5.component.scss']
})
export class EntryList5Component implements OnInit {
  selectedFile: File = null;
  fileName;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor() { }

  ngOnInit() {
  }

  fileChangeEvent(event){
    this.selectedFile = <File>event.target.files[0];
    this.fileName = this.selectedFile.name;
    console.log(this.selectedFile);
  }


}
