import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-annual-account-template',
  templateUrl: './annual-account-template.component.html',
  styleUrls: ['./annual-account-template.component.scss']
})
export class AnnualAccountTemplateComponent implements OnInit {

  constructor() { }
  @Input() formData;
  ngOnInit(): void {
    console.log('form data')
  }

}
