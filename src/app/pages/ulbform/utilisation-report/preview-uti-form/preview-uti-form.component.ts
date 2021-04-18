import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-uti-form',
  templateUrl: './preview-uti-form.component.html',
  styleUrls: ['./preview-uti-form.component.scss']
})
export class PreviewUtiFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
