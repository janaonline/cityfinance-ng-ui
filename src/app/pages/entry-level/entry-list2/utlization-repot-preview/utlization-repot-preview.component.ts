import { Component, OnInit, Inject} from '@angular/core';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-utlization-repot-preview',
  templateUrl: './utlization-repot-preview.component.html',
  styleUrls: ['./utlization-repot-preview.component.scss']
})
export class UtlizationRepotPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
