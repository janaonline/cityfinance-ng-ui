import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-slbs',
  templateUrl: './service-slbs.component.html',
  styleUrls: ['./service-slbs.component.scss']
})
export class ServiceSlbsComponent implements OnInit {


  url: string = environment.performanceURL;
  urlSafe: SafeResourceUrl;
  height;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.height = window.innerHeight+ "px"
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
