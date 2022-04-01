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
      {
        link:'../../../../../assets/images/resources dashboard/image3-35.png',
        text:'Step 1: Step One: Digitise manual records and create a Digital Property Tax Register'
      },
      {
        link:'../../../../../assets/images/resources dashboard/image4-37.png',
        text:'Step 2: Generate bills against all property tax assessees using an online billing system Step Three: Notify taxpayers of pending dues through SMS, Email, Door-to-Door Distribution using the online billing system'
      },
      {
        link:'../../../../../assets/images/resources dashboard/image5-39.png',
        text:'Step 3: Taxpayer logs into the website (or any payment portal integrated with the online system) and pays online through various modes of payment such as Credit/Debit Card/ Net Banking, UPI ID or QR code, Mobile Wallets'
      },
      {
        link:'../../../../../assets/images/resources dashboard/image6-41.png',
        text:'Step 3:  Property Tax Records are updated post successful payment and Electronic Receipt is generated'
      },
      {
        link:'',
        text:'Step 4: Property Tax Records are updated post successful payment and Electronic Receipt is generated'
      },
      
      
      
      
    ]
    },
    {
      _id:2,
      heading:"Technological Interventions",
      content:"Following technological interventions coupled with administrative changes can radically improve tax collections–"
    },
    
    {
      _id:3,
      heading:"Stronger penal provisions for defaulters",
      content:"Enabling penal provisions in State/City Acts for defaulters will strengthen the hands of revenue officials in ensuring compliance by assessees. These provisions should also be combined with dissemination of defaulters’ list in public domain, for instance, at the ULB’s offices, collection centres, website, etc. and through the communication to the defaulter via demand notices. For instance, as per the XXXX amendment to the Chennai City Municipal Corporation Act, 1919, assesses who pay advance property tax, i.e. before October 15 of each year will be given a 5% incentive (upto a maximum of Rs. 5,000/-) and payments made after October 15 of each year will attract a penalty of 2% p.a. This amendment has led to Rs. xxxx crore collections in XX year (XX% increase) as compared to XX year. Early bird discounts and late payment penalties have also shown positive results in Pune, Hyderabad and Delhi’s Municipal Corporations by boosting early payments by taxpayers which consequently has helped improve availability of cash flows throughout the year. International examples also showcase that a strong emphasis on improving administrative processes leads to an uptake in collections. For example, in Quezon City, Philippines, the Local Government Code provides for various enforcement provisions including seizure and auctioning of delinquent properties. To boost revenue collections, the Local Government has adopted a system of implementing enforcement provisions coupled with an incentives mechanism for taxpayers- discounts for early payment and penalties for late payment which led to more timely payments."
    }
  ]
  assessmentData = [
    {
      _id:1,
      heading:"Adoption of Online Self-Assessment System",
      content:["An online Self-Assessment mechanism with a system for raising demand/sending reminders and a process for random scrutiny of Self-Assessment forms. The following steps may be considered for implementation:",
    "Introduce statutory provisions in State Acts/Rules mandating random scrutiny (or audit) of fixed percentage of self-assessment forms. The provision should clearly define the process for such scrutiny, based on risk-assessments of processes and internal controls, and using random sampling methodology. Results of such random scrutiny should be published in public domain and appropriate action taken based on the same, both with respect to individual instances of deviations as well as with respect to processes and internal controls",
    "Integrate assessment database with property records of other utilities for automatic verification of property attributes and assessment records. This would help in creating the record at once place and crosschecking of discrepancies."
    ],
    imgArr:[
      {
        link:'../../../../../assets/resources-das/image2-33.png',
        text:'Figure 1 Self-assessment mechanism'
      },]
    },
    {
      _id:2,
      heading:"Rule-based Exemptions & Disclosure of Revenue Foregone",
      content:["Exemptions to property tax should be based on a rationale that is clearly defined in the State Acts. Revenue foregone as a result of exemptions should be included in annual budgets of Municipalities, so it is measured and reviewed for any further action. The following points may be considered:",
    "The exemptions in property tax may be based on various factors such as ownership (such as government-owned property), usage of the property (such as properties used for charitable purposes), or on characteristics of the owner or occupier (such as age or disability).",
    "The 5 most common exemptions i.e.: Agricultural lands, hospitals and educational institutions, government buildings, buildings owned by ex-servicemen and area-based exemptions need to have well defined conditions for exemptions in the state act.",
    "Agricultural lands need to be exempted based on the usage and produce. Farmers should be allowed to request a rebate on the tax corresponding to losses resulting from natural causes/animal diseases or market forces. Similarly, hospitals and educational institutes which are being used for charity/not for profit purpose can be exempted and the acts can define what constitutes not for profit/charity. The same can apply for government buildings (central as well as state). Exemptions to properties owned by ex-servicemen/widows should be limited to one property. Area-based exemptions need to be well defined and done on valuation of land. Misreporting the size of property by taxpayers should be penalized."
    ],
    imgArr:[
      {
        link:'../../../../../assets/resources-das/image3-35.png',
        text:'Figure 2 Rule based property tax exemption'
      },]
    },
    {
      _id:3,
      heading:"Overhaul Dispute Redressal System",
      content:["The dispute redressal system for property tax should be systematic and timely. It may require a new institutional design. Dispute redressal mechanism to be simplified with involvement of Commissioner/Divisional or Regional Commissioners or District Magistrates (depending on the State) or Director of Municipal Administration or equivalent. Furthermore, there should be a provision for 50% of the property tax assessed to be paid under protest, on the lines of central taxes."
    ],
    imgArr:[
      {
        link:'../../../../../assets/resources-das/image4-37.png',
        text:'Figure 3 Dispute redressal mechanism'
      },]
    },

   
  ]
  stateList = [
    {
      stateName:"Andhra Pradesh",
      guidanceLink:"",
      provisionsLink:""
    },
    {
      stateName:"Odisha",
      guidanceLink:"",
      provisionsLink:""
    },
   

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

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    "autoplay" : false,
    "arrows": true,
     "adaptiveHeight": false,
    
    // "responsive": [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 800,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   },
    //   {
    //     breakpoint: 680,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };

  ngOnInit(): void {
  }
  slickInit(e) {
    console.log('slick initialized');
  }


  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
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
