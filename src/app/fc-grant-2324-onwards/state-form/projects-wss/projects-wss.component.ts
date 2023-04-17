import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-wss',
  templateUrl: './projects-wss.component.html',
  styleUrls: ['./projects-wss.component.scss']
})
export class ProjectsWssComponent implements OnInit {

  constructor() { }

  questionResponce = {
    title:'Projects for Water and Sanitation',
    formId: '',
    design_year: '',
    status:'',
    statusId:'',
    state: '',
    declaration : {
      name: '',
      url:''
    },
    uaData:[
      {
        ua: '',
        status: '',
        rejectReason: '',
        waterBodies: [],
        reuseWater: [],
        serviceLevelIndicators: [],
        foldCard: false,
      }
    ]
  }

  waterBodies: {
    tilte: '',
    id: '',
    info:'',
    cols:[
      {
        lineItem: '',
        shortKey: ''
      }
    ],
    rows:[
      shortKey: '',
      type: '',
      validation:[],
      min: '',
      max: '',
      value: '', 
    ]
  }

  

  ngOnInit(): void {
  }

}
