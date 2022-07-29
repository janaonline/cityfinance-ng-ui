import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slbs2223',
  templateUrl: './slbs2223.component.html',
  styleUrls: ['./slbs2223.component.scss']
})
export class Slbs2223Component implements OnInit {
  nextRouter;
  backRouter;
  sideMenuItem:any;
  constructor() { 
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
  }

  ngOnInit(): void {
    for (const key in this.sideMenuItem) {
      console.log(`${key}: ${this.sideMenuItem[key]}`);
      this.sideMenuItem[key].forEach(element => {
        console.log('name name', element);
        if(element?.name == 'SLBs for Water Supply and Sanitation'){
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
  }
  }

}
