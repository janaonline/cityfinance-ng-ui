import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ulbUploadList} from '../../shared/components/home-header/tableHeaders';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent implements OnInit {

  id = null;
  tableHeaders = ulbUploadList;

  constructor(public activatedRoute: ActivatedRoute, public router: Router, public location: Location) {
    this.activatedRoute.params.subscribe(val => {
      const {id} = val;
      if (id) {
        this.id = id;
      }
    });
  }

  ngOnInit() {
  }

}
