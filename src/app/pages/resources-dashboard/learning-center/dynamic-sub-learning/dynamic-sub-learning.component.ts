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

  billingCardData = [
    {
      _id:1,
      heading:"Digital billing and online system for collection",
      content:"Moving from a manual records system to an online billing and collection system will not only improve transparency and set up an easy to administer process for tax officials but also enable easy compliance by taxpayers. The online system should also ensure that bills are distributed to taxpayers electronically and that automatic payment reminders are sent via SMS/Email.Andhra Pradesh has been fairly successful in building a centrally run online portal for billing and collection. Delhi’s Municipal Corporations, Greater Chennai Corporation are some examples of states and cities that have successfully migrated to an online system of billing and collection. In 20XX-XX, Tamil Nadu’s Municipal Corporations also migrated to Uniform Tree Information System (UTIS) – an online system of digital billing and collection – which enables online payments for property tax and other user charges and fees that are levied by the Municipal Corporations. Step-by-step process is as follows:",
    imgArr:[
      '../../../../../assets/images/resources dashboard/image3-35.png',
      '../../../../../assets/images/resources dashboard/image4-37.png',
      '../../../../../assets/images/resources dashboard/image5-39.png',
      '../../../../../assets/images/resources dashboard/image6-41.png'
    ]
    },
    {
      _id:2,
      heading:"Technological Interventions",
      content:"Following technological interventions coupled with administrative changes can radically improve tax collections–"
    },
    {
      _id:3,
      heading:"Digital billing and online system for collection",
      content:"Moving from a manual records system to an online billing and collection system will not only improve transparency and set up an easy to administer process for tax officials but also enable easy compliance by taxpayers. The online system should also ensure that bills are distributed to taxpayers electronically and that automatic payment reminders are sent via SMS/Email.Andhra Pradesh has been fairly successful in building a centrally run online portal for billing and collection. Delhi’s Municipal Corporations, Greater Chennai Corporation are some examples of states and cities that have successfully migrated to an online system of billing and collection. In 20XX-XX, Tamil Nadu’s Municipal Corporations also migrated to Uniform Tree Information System (UTIS) – an online system of digital billing and collection – which enables online payments for property tax and other user charges and fees that are levied by the Municipal Corporations. Step-by-step process is as follows:"
    
    },
    {
      _id:4,
      heading:"Stronger penal provisions for defaulters",
      content:"Enabling penal provisions in State/City Acts for defaulters will strengthen the hands of revenue officials in ensuring compliance by assessees. These provisions should also be combined with dissemination of defaulters’ list in public domain, for instance, at the ULB’s offices, collection centres, website, etc. and through the communication to the defaulter via demand notices. For instance, as per the XXXX amendment to the Chennai City Municipal Corporation Act, 1919, assesses who pay advance property tax, i.e. before October 15 of each year will be given a 5% incentive (upto a maximum of Rs. 5,000/-) and payments made after October 15 of each year will attract a penalty of 2% p.a. This amendment has led to Rs. xxxx crore collections in XX year (XX% increase) as compared to XX year. Early bird discounts and late payment penalties have also shown positive results in Pune, Hyderabad and Delhi’s Municipal Corporations by boosting early payments by taxpayers which consequently has helped improve availability of cash flows throughout the year. International examples also showcase that a strong emphasis on improving administrative processes leads to an uptake in collections. For example, in Quezon City, Philippines, the Local Government Code provides for various enforcement provisions including seizure and auctioning of delinquent properties. To boost revenue collections, the Local Government has adopted a system of implementing enforcement provisions coupled with an incentives mechanism for taxpayers- discounts for early payment and penalties for late payment which led to more timely payments."
    }
  ]
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

  onHover(event){
    console.log(event)
  }
cardId=1
  showRecomm(cardId){
console.log(cardId)
this.cardId = cardId
  }
  backToCard() {
    this.router.navigateByUrl('resources-dashboard/learning-center/toolkits')
     this.resources_services.tooltikCardShow.next(true);
  }

}
