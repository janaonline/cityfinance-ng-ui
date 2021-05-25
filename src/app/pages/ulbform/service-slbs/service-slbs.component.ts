import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-service-slbs',
  templateUrl: './service-slbs.component.html',
  styleUrls: ['./service-slbs.component.scss']
})
export class ServiceSlbsComponent implements OnInit {


  url: string = "https://pas.org.in/web/ceptpas/iuppkpi?parameterAutoLoginLogin=ahmedabad&parameterAutoLoginPassword=Ahmedabad@12";
  urlSafe: SafeResourceUrl;
  height;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.height = window.innerHeight+ "px"
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
