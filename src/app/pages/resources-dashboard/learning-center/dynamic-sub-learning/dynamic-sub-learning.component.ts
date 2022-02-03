import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event,NavigationEnd } from "@angular/router";
import { ResourcesServicesService } from '../../resDashboard-services/resources-services.service';

@Component({
  selector: 'app-dynamic-sub-learning',
  templateUrl: './dynamic-sub-learning.component.html',
  styleUrls: ['./dynamic-sub-learning.component.scss']
})
export class DynamicSubLearningComponent implements OnInit {

  isIntro = true;
  isEnum = false;
  isValu = false;
  isAssess = false;
  isBill = false;
  isRepo = false;
  constructor(
    private router: Router,
    private resources_services: ResourcesServicesService,

  ) {
    // this.resources_services.tooltikCardShow.next(false);
    this.router.events.subscribe((event:Event)=>{
      let urlArray;
      if (event instanceof NavigationEnd) {
        urlArray = event.url.split("/")
        if(urlArray.includes('introduction')){
          this.isIntro = true;
          this.isEnum = false;
          this.isValu = false;
          this.isAssess = false;
          this.isBill = false;
          this.isRepo = false;
        }
       else if(urlArray.includes('enumeration')){
        this.isIntro = false;
        this.isEnum = true;
        this.isValu = false;
        this.isAssess = false;
        this.isBill = false;
        this.isRepo = false;

        }
        else if(urlArray.includes('valuation')){
          this.isIntro = false;
          this.isEnum = false;
          this.isValu = true;
          this.isAssess = false;
          this.isBill = false;
          this.isRepo = false;
        }
        else if(urlArray.includes('assessment')){
          this.isIntro = false;
          this.isEnum = false;
          this.isValu = false;
          this.isAssess = true;
          this.isBill = false;
          this.isRepo = false;
        }
        else if(urlArray.includes('billingCollection')){
          this.isIntro = false;
          this.isEnum = false;
          this.isValu = false;
          this.isAssess = false;
          this.isBill = true;
          this.isRepo = false;
        }
        else if(urlArray.includes('reporting')){
          this.isIntro = false;
          this.isEnum = false;
          this.isValu = false;
          this.isAssess = false;
          this.isBill = false;
          this.isRepo = true;
        }

        else{

        }
      }
    })

  }

  ngOnInit(): void {
  }
  backToCard() {
    this.router.navigateByUrl('resources-dashboard/learning-center/toolkits')
     this.resources_services.tooltikCardShow.next(true);
  }

}
