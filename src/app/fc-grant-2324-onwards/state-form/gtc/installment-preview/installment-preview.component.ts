import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-installment-preview',
  templateUrl: './installment-preview.component.html',
  styleUrls: ['./installment-preview.component.scss']
})
export class InstallmentPreviewComponent implements OnInit {

  @Input() questionresponse: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.questionresponse);
  }

}
