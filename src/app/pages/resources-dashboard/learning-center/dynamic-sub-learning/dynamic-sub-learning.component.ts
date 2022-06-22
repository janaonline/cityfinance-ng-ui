import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event,NavigationEnd } from "@angular/router";
import { ResourcesServicesService } from '../../resDashboard-services/resources-services.service';
import { ResourcesDashboardService } from '../../resources-dashboard.service';

@Component({
  selector: "app-dynamic-sub-learning",
  templateUrl: "./dynamic-sub-learning.component.html",
  styleUrls: ["./dynamic-sub-learning.component.scss"],
})
export class DynamicSubLearningComponent implements OnInit {
  stateIdsMap: any = JSON.parse(localStorage.getItem("stateIdsMap"));

  isIntro = true;
  isEnum = false;
  isValu = false;
  isAssess = false;
  isBill = false;
  isRepo = false;

  billingCardData = [
    {
      _id: 1,
      heading: "Digital billing and online system for collection",
      content:
        "It is imperative for all ULBs to discontinue manual records system at the earliest and move to an online billing and collection system which will improve transparency, set up an easy to administer process for tax officials, and enable easy compliance by taxpayers. The online system should enable electronic generation & distribution of bills to taxpayers as well as automatic payment reminders to defaulters via SMS/Email.Andhra Pradesh has seen success in building such a centrally run online portal for billing and collection. Delhi’s Municipal Corporations and Greater Chennai Corporation are also some examples where successful migration to an online system of billing and collection has been achieved. Tamil Nadu’s Municipal Corporations have also, migrated to Uniform Tree Information System (UTIS) – an online system of digital billing and collection – which enables online payments for property tax and other user charges and fees that are levied by the Municipal Corporations.",
      imgArr: [
        {
          link: "../../../../../assets/resources-das/img-digitalBilling.png",
          text: "",
        },
        // {
        //   link:'../../../../../assets/images/resources dashboard/image4-37.png',
        //   text:''
        // },
        // {
        //   link:'../../../../../assets/images/resources dashboard/image5-39.png',
        //   text:''
        // },
        // {
        //   link:'../../../../../assets/images/resources dashboard/image6-41.png',
        //   text:''
        // },
        // {
        //   link:'',
        //   text:''
        // }
      ],
    },
    {
      _id: 2,
      heading: "Technological Interventions",
      content:
        "Technology can radically transform collections in the immediate term. Combining technological and administrative interventions, as depicted in the figure below, can help in transforming the collection process and improving tax collections.",
      imgArr: [
        {
          link: "../../../../../assets/resources-das/img-digitalBilling.png",
          text: "Step One: Creation of a single digital property register",
          description:
            "The creation of a single digital property register that integrates all Municipal databases and eventually integrates Municipal databases with State Stamp Duties and Registration Records and Electricity Department/Agency’s records is the backbone.",
        },
        {
          link: "../../../../../assets/resources-das/img-digitalBilling.png",
          text: "Step Two: Integrated or Unified Billing of all Municipal Taxes and Charges",
          description:
            "Every household or commercial property is liable to not only pay property tax but also various other user charges such as water, sewerage, professional taxes (where levied), trade licence fees etc. Having a system of unified billing and collection for every household/commercial property – which means ‘One Household, One Collector’ – will help increase efficiency at the ULB/Agency level by avoiding duplication of efforts for billing and collection, as well as reduce the burden of compliance for citizens and establishments by establishing a single relationship with the Local Government.",
        },
        {
          link: "../../../../../assets/resources-das/img-digitalBilling.png",
          text: "Step Three: Increase channels and modes of payments",
          description:
            "States/ULBs need to increase both channels (places where taxpayers can pay) and modes (type/options) for payment that are available to taxpayers. By enabling multiple payment channels – including payments at physical centres like ULB’s collection centres, bank branches, door-to-door collections by bill collectors; and online payments through the state or ULB’s website, as well as via payment portals like Google Pay, Paytm, Amazon Pay etc.<br><br><b> Bill Collectors/ Revenue Collectors for Door-to-door collection:</b><br><br>Provide Mobile Point of Sale (MPOS) Devices for enabling all modes of digital payments. With the necessary infrastructure in place for digital payments, including both increased modes and channels of digital payment, ULBs can also explore sending Payment Link Reminders through SMS/Whatsapp/Email. Besides augmenting digital payments, this would help reduce reliance on cash/cheque/DD collections and dependence on physical collection centres.<br><br><b>Payment Link Reminders:</b><br><br>Taxpayers should get alerts via SMS/Whatsapp/Email about pending dues. After clicking on the link, the taxpayer is directed straight to the payment gateway which displays the pending tax. Post payment, an online receipt is generated. The strategy can be used in a targeted fashion by focusing on taxpayers that have the highest arrears, have not paid their dues over 6 months etc.",
        },
        {
          link: "../../../../../assets/resources-das/img-digitalBilling.png",
          text: "Step Four: De-linking the functions of assessment and billing & collections",
          description:
            "There is a strong case to delink assessment, and billing & collections, both from the perspective of internal controls (segregation of duties) and outsourcing / specialization. A unified cadre of collectors who focus on collections from specific categories of properties (residential, commercial, high value), or different categories of taxpayers (defaulters, and within that hard, soft buckets etc.), or by geography (by ward, by ULB), and who are enabled by MPOS with a map and timetabling, can deliver transformative results in collections and drive operational efficiencies within ULBs at a broader level.The success story of Ranchi Municipal Corporation, where there was a fourfold increase in collections between FY14-15 and FY17-18 post outsourcing of collection, merits serious evaluation for adoption. Several cities like Ludhiana and Amritsar have tackled the issue of staff deficit by outsourcing collection centres. They have created Citizen Facility Centers (CFC) in zonal offices responsible for filling the assessment forms of all walk-in taxpayers and collecting taxes through cash, online and digital channels.",
        },
      ],
    },
    {
      _id: 3,
      heading: "Stronger penal provisions for defaulters",
      content:
        "Stronger penal provisions in State/City Acts for defaulters will strengthen the hands of revenue officials in ensuring compliance by assessees. These provisions should also be combined with dissemination of defaulters’ list in public domain, for instance, at the ULB’s offices, collection centres, website, etc. and through the communication to the defaulter via demand notices.For instance, as per an amendment to the Chennai City Municipal Corporation Act, 1919, assessees who pay advance property tax, i.e. before October 15 of each year, will be given a 5% incentive (upto a maximum of Rs. 5,000/-) and payments made after October 15 of each year will attract a penalty of 2% p.a.Early bird discounts and late payment penalties have also shown positive results in Pune, Hyderabad and Delhi’s Municipal Corporations by boosting early payments by taxpayers which consequently has helped improve availability of cash flows throughout the year.International examples also showcase that a strong emphasis on improving administrative processes leads to an uptake in collections. For example, in Quezon City, Philippines, the Local Government Code provides for various enforcement provisions including seizure and auctioning of delinquent properties. To boost revenue collections, the Local Government has adopted a system of implementing enforcement provisions coupled with an incentives mechanism for taxpayers- discounts for early payment and penalties for late payment which led to more timely payments.",
      imgArr: [
        {
          link: "../../../../../assets/resources-das/img-strongerPanel.png",
          text: "",
        },
      ],
    },
  ];
  reportCardData = [
    {
      _id: 1,
      heading: "1)	Creation of a MIS System for performance tracking",
      content: [
        "Data-driven decision making and performance management are essential for a robust property tax system. Quarterly reviews of property tax MIS at city/ward/revenue official level should be institutionalized.MIS dashboards could include performance metrics such as current collection efficiency, arrear collection efficiency, track pending demands in high value properties, besides other metrics.",
      ],
      imgArr: [
        {
          link: "../../../../../assets/resources-das/img-reporting2.png",
          text: "Figure: Current Landscape of Reporting Practices (good practices marked in green)",
        },
      ],
    },
    {
      _id: 2,
      heading:
        "2)	Ranking of Revenue Officials to improve performance and enhance collections",
      content: [
        "Ranking revenue officials through MIS dashboards, and recognising and rewarding their performance through regular competitions would help motivate revenue officials, foster adoption of best practices and, subsequently, enhance revenue collections for the ULB.<br><b> Introduction to (Guide to MPL): A step-by-step implementation guide for running a state/city/ULB level competition for revenue officials<b>",
      ],
      imgArr: [
        {
          link: "../../../../../assets/resources-das/img-reporting2.png",
          text: "Figure: Current Landscape of Reporting Practices (good practices marked in green)",
        },
      ],
    },
    {
      _id: 3,
      heading:
        "3)	Publishing data in public forum for increased transparency and accountability",
      content: [
        "Publishing ward-wise demand and collection data, especially defaulters’ data, in public domain can help in building transparency and accountability among ULBs and taxpayers.",
      ],
      imgArr: [
        {
          link: "../../../../../assets/resources-das/img-reporting2.png",
          text: "Figure: Current Landscape of Reporting Practices (good practices marked in green)",
        },
      ],
    },
  ];
  valuationCardData = [
    {
      _id: 1,
      heading: "Adopt capital valuation system",
      content: [
        "All cities should adopt the Capital Value method with– <br>1. Direct linkage to guidance value<br>2. Minimum multiplicative factors<br><br>Adoption of CV method will require the following steps:<br><ul><li>Collect information on property-wise attributes and current collection figures of representative areas from a few ULBs of each category (Municipal Corporations, Municipal Councils, Nagar Panchayats). Create a valuation formula that directly links land value to guidance value. A model valuation formula is provided below –<br>Annual Value of Property = (Size of land in sq. units.) x (Guidance value of land per sq. units.) + (Size of building in sq. units.) x (Cost of Construction of the building per sq. units.)<br>Where,<br>Guidance value of land is the value of land as prescribed by the Stamp Duties and Registration Department of the State and,<br>Cost of Construction of the building may be prescribed by the Public Works Department<br> Property Tax = (Annual Value of Property) x (Multiplicative Factors) x (Tax Rate)<br>Create a valuation model with different tax rates to project possible increase in tax for different types of properties. Introduce minimum multiplicative factors like age of building or usage of building that are not already considered in the formula.<br><br></li><li>Finalise the formula – The formula should encompass all possible categories of properties i.e. residential, commercial, industrial, hotels/malls, stadiums, vacant land, apartments, houses with appurtenant land etc.<br>The formula should not be too complicated to administer.<br>All the variables of the formula should be clearly defined so as to not leave room for discretion.<br><br></li><li>Introduce transition provisions to smoothen the impact of incremental tax liability if any over a period of time. For example, The Maharashtra State Act introduced transition provisions when the State moved to the Capital Value system to reduce the anticipated increase in tax demand. These transition provisions included the ceiling of the tax value for the first five years of implementation of the Capital Value method. ‘For the period of 5 years from the date on which property tax is first levied on capital value, the tax shall not exceed (i) in case of residential building, 2 times, (ii) in case of non-residential building, 3 times the amount of the property tax leviable in respect thereof in the year immediately preceding such date. Provided that property tax levied on the basis of capital value of any buildings or lands shall not exceed 40% of the amount of the property tax payable in the year immediately preceding the year or such revision.’</li></ul>",
      ],
      imgArr: [
        {
          link: "../../../../../assets/resources-das/valuation1.png",
          text: "Figure 1 Adopt capital value system and revise rates periodically",
        },
      ],
    },
    {
      _id: 2,
      heading: "Institute mechanism for periodic rate revision",
      content: [
        `The Municipal Acts should have a provision for regular revision of property
      tax in line with increase in guidance value. The provision should include the fixed period in
       which the property tax will increase and the criteria that will be used for deciding extent of
        increase. Ideally, for ease of administration, property tax should be increased periodically,
        to reflect latest guidance values published by the State, and consequent re-assessments.
        <br> A <a href="../../../../../assets/excelfile/Property_tax_modelling_odisha.xlsx" target="_blank"> simulation of revision of values and rationalising property tax </a>periodically, shows potential to 
        increase revenues - to meet with expenses towards creation of infrastructure to sustain urban developmen`,
      ],
      imgArr: [
        {
          link: "../../../../../assets/resources-das/valuation2.png",
          text: "Figure 2 Adopt capital value system and revise rates periodically",
        },
      ],
    },
  ];
  enumCardData = [
    {
      _id: 1,
      heading: "Creation of a GIS based property tax register",
      content: [
        "1. A state-wide project maybe developed to outsource GIS mapping to an agency. This will help smaller ULBs maintain uniformity in data. The scope will broadly include:<br><ul><li> Procurement of high-resolution satellite images or conduct aerial imagery, and creation of a digital base map of the city.</li></ul><ul><li> Creation of a digital database of properties –<br>a. Divide the city into equal-sized blocks/sectors with similar count of properties in each block.<br>b. Assign each property a Unique Property ID (UPID) which encapsulates the sector or block number and the geo-tagged coordinates.</li></ul><ul><li> Conducting door-to-door surveys –<br>a. Create a web-based database and a complementary mobile application with the records of existing properties and the UPIDs of new properties identified through GIS mapping.<br>b. Send surveyors equipped with mobile devices for accessing the application during the on-ground field survey. The surveyors conduct a thorough door-to-door survey that captures all attributes of properties. The surveyors can also obtain digital signature of property owners/occupiers on the captured attributes and render transparency to the process.<br>c. The data captured in the survey must be uploaded in real-time to the digital property register.</li></ul><ul><li>Build capacities within the staff/hire contractual staff/outsource to maintain GIS based digital property register<br>",
      ],
      imgArr: [
        {
          link: "../../../../../assets/resources-das/enum3.png",
          text: "Figure 1 Creation of a GIS based property tax register",
        },
      ],
    },
    {
      _id: 2,
      heading: "Periodically updating property tax register",
      content: [
        "Mandatory update of property tax register should be included as a part of Municipal Acts. Acts must be amended to provide for deployment of technology to periodically enumerate all properties, and assess them for taxation purposes.",
      ],
      imgArr: [
        {
          link: "../../../../../assets/resources-das/enum4.png",
          text: "Figure 2 Periodic enumeration to update property tax register",
        },
      ],
    },
    {
      _id: 3,
      heading: "Integration of property records of all departments",
      content: [
        "Create a single property database that can be used by other departments. Records must be digitized and a unique property ID created, which is common for all municipal departments.",
      ],
      imgArr: [
        {
          link: "../../../../../assets/resources-das/enum5.png",
          text: "Figure 3 Assignment of unique property identification code and integration of property records of all departments",
        },
      ],
    },
  ];
  assessmentData = [
    {
      _id: 1,
      heading: "Adoption of Online Self-Assessment System",
      content: [
        "An online Self-Assessment mechanism with a system for raising demand/sending reminders and a process for random scrutiny of Self-Assessment forms. The following steps may be considered for implementation:",
        "Introduce statutory provisions in State Acts/Rules mandating random scrutiny (or audit) of fixed percentage of self-assessment forms. The provision should clearly define the process for such scrutiny, based on risk-assessments of processes and internal controls, and using random sampling methodology. Results of such random scrutiny should be published in public domain and appropriate action taken based on the same, both with respect to individual instances of deviations as well as with respect to processes and internal controls",
        "Integrate assessment database with property records of other utilities for automatic verification of property attributes and assessment records. This would help in creating the record at once place and crosschecking of discrepancies.",
      ],
      imgArr: [
        {
          link: "../../../../../assets/resources-das/image2-33.png",
          text: "Figure 1 Self-assessment mechanism",
        },
      ],
    },
    {
      _id: 2,
      heading: "Rule-based Exemptions & Disclosure of Revenue Foregone",
      content: [
        "Exemptions to property tax should be based on a rationale that is clearly defined in the State Acts. Revenue foregone as a result of exemptions should be included in annual budgets of Municipalities, so it is measured and reviewed for any further action. The following points may be considered:",
        "The exemptions in property tax may be based on various factors such as ownership (such as government-owned property), usage of the property (such as properties used for charitable purposes), or on characteristics of the owner or occupier (such as age or disability).",
        "The 5 most common exemptions i.e.: Agricultural lands, hospitals and educational institutions, government buildings, buildings owned by ex-servicemen and area-based exemptions need to have well defined conditions for exemptions in the state act.",
        "Agricultural lands need to be exempted based on the usage and produce. Farmers should be allowed to request a rebate on the tax corresponding to losses resulting from natural causes/animal diseases or market forces. Similarly, hospitals and educational institutes which are being used for charity/not for profit purpose can be exempted and the acts can define what constitutes not for profit/charity. The same can apply for government buildings (central as well as state). Exemptions to properties owned by ex-servicemen/widows should be limited to one property. Area-based exemptions need to be well defined and done on valuation of land. Misreporting the size of property by taxpayers should be penalized.",
      ],
      imgArr: [
        {
          link: "../../../../../assets/resources-das/image3-35.png",
          text: "Figure 2 Rule based property tax exemption",
        },
      ],
    },
    {
      _id: 3,
      heading: "Overhaul Dispute Redressal System",
      content: [
        "The dispute redressal system for property tax should be systematic and timely. It may require a new institutional design. Dispute redressal mechanism to be simplified with involvement of Commissioner/Divisional or Regional Commissioners or District Magistrates (depending on the State) or Director of Municipal Administration or equivalent. Furthermore, there should be a provision for 50% of the property tax assessed to be paid under protest, on the lines of central taxes.",
      ],
      imgArr: [
        {
          link: "../../../../../assets/resources-das/image4-37.png",
          text: "Figure 3 Dispute redressal mechanism",
        },
      ],
    },
  ];
  // stateList = [
  //   {
  //     stateName:"Andhra Pradesh",
  //     guidanceLink:"",
  //     provisionsLink:""
  //   },
  //   {
  //     stateName:"Odisha",
  //     guidanceLink:"",
  //     provisionsLink:""
  //   },

  // ]
  stateList: any = [];
  constructor(
    private router: Router,
    private resources_services: ResourcesServicesService,
    private resourcesDashboard: ResourcesDashboardService
  ) {
    // this.resources_services.tooltikCardShow.next(false);

    this.router.events.subscribe((event: Event) => {
      let urlArray;
      if (event instanceof NavigationEnd) {
        urlArray = event.url.split("/");
        if (urlArray.includes("introduction")) {
          this.isIntro = true;
          this.isEnum = false;
          this.isValu = false;
          this.isAssess = false;
          this.isBill = false;
          this.isRepo = false;
        } else if (urlArray.includes("enumeration")) {
          this.pdfInput.toolKitVisible = "enumeration";
          this.isIntro = false;
          this.isEnum = true;
          this.isValu = false;
          this.isAssess = false;
          this.isBill = false;
          this.isRepo = false;
        } else if (urlArray.includes("valuation")) {
          this.isIntro = false;
          this.isEnum = false;
          this.isValu = true;
          this.isAssess = false;
          this.isBill = false;
          this.isRepo = false;
        } else if (urlArray.includes("assessment")) {
          this.pdfInput.toolKitVisible = "assessment";

          this.isIntro = false;
          this.isEnum = false;
          this.isValu = false;
          this.isAssess = true;
          this.isBill = false;
          this.isRepo = false;
        } else if (urlArray.includes("billingCollection")) {
          this.pdfInput.toolKitVisible = "billing_and_Collection";

          this.isIntro = false;
          this.isEnum = false;
          this.isValu = false;
          this.isAssess = false;
          this.isBill = true;
          this.isRepo = false;
        } else if (urlArray.includes("reporting")) {
          this.pdfInput.toolKitVisible = "reporting";

          this.isIntro = false;
          this.isEnum = false;
          this.isValu = false;
          this.isAssess = false;
          this.isBill = false;
          this.isRepo = true;
        } else {
        }
      }
    });

    this.resourcesDashboard.castCount.subscribe((res: any) => {
      this.pdfInput.globalName = res?.name;
    });
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: false,
    arrows: true,
    adaptiveHeight: false,

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

  pdfInput: any = {
    toolKitVisible: "",
    type: "PDF",
    header: "learning_center",
    subHeader: "best_practices",
    globalName: "",
    state: "",
    ulb: "",
    year: "",
  };

  getData() {
    this.resourcesDashboard.getPdfData(this.pdfInput).subscribe(
      (res: any) => {
        console.log("best practice data", res);
        this.stateList = res?.data;
      },
      (err: any) => {
        console.log("new Error", err);
        this.stateList = [];
      }
    );
  }

  ngOnInit(): void {}
  slickInit(e) {
    console.log("slick initialized");
    this.getData();
  }

  afterChange(e) {
    console.log("afterChange");
  }

  beforeChange(e) {
    console.log("beforeChange");
  }
  onHover(event) {
    console.log(event);
  }
  cardId = 1;
  showRecomm(cardId) {
    console.log(cardId);
    this.cardId = cardId;
  }
  backToCard() {
    this.router.navigateByUrl("resources-dashboard/learning-center/toolkits");
    this.resources_services.tooltikCardShow.next(true);
  }
}
