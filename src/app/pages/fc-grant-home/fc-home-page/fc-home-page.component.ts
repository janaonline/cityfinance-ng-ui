import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fc-home-page',
  templateUrl: './fc-home-page.component.html',
  styleUrls: ['./fc-home-page.component.scss']
})
export class FcHomePageComponent implements OnInit {

  constructor() { }

 ulbName ='';

  ngOnInit(): void {
     let ulbRecord = JSON.parse(localStorage.getItem('userData'));
    this.ulbName = ulbRecord.name;
     console.log(ulbRecord)
  }

}
