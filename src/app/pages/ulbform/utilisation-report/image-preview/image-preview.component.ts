import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
