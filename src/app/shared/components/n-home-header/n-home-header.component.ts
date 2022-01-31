import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-n-home-header',
  templateUrl: './n-home-header.component.html',
  styleUrls: ['./n-home-header.component.scss']
})
export class NHomeHeaderComponent implements OnInit {

  constructor() { }
size
  ngOnInit(): void {
  }
setFontSize(size){
  console.log(size)
  this.size= size
}
  scroll(){
    window.scrollTo({
      top: 1000,
     
      behavior: 'smooth'
    });
  }
}
