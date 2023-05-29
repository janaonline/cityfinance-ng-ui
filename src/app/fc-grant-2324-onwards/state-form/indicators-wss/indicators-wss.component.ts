import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicators-wss',
  templateUrl: './indicators-wss.component.html',
  styleUrls: ['./indicators-wss.component.scss']
})
export class IndicatorsWssComponent implements OnInit {

  constructor() { }
  isApiInProgress:boolean = false;
  response = {
    formName: 'Indicators for Water Supply and Sanitation',
    formId: '',
    status: '',
    statusId: '',
    info: 'The below tables denotes the aggregate indicators and targets of ULBs in respective UA',
    previousYrMsg: '',
  }
  ngOnInit(): void {
    
  }

}
