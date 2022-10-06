import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "src/app/shared/services/common.service";
import {ResourcesDashboardService} from "../../pages/resources-dashboard/resources-dashboard.service"

@Component({
  selector: "app-new-home",
  templateUrl: "./new-home.component.html",
  styleUrls: ["./new-home.component.scss"],
})


export class NewHomeComponent implements OnInit {
  constructor(
    protected _commonService: CommonService,
    private router: Router,
    public resourceDashboard : ResourcesDashboardService
  ) {
this.resourceDashboard.getPdfData(this.pdfInput).subscribe((res: any)=> {
  let response =  res?.data.map((elem) => {
    elem.createdAt = elem.createdAt.split("T")[0]
    return elem
    })
    console.log("response", response)
    this.whatNewData = response
}, (err: any) => {
  this.whatNewData = []
})

  }
  globalFormControl = new FormControl();
  globalOptions = [];
  filteredOptions: Observable<any[]>;
  cardData = []
  pdfInput: any = {
    toolKitVisible: "",
    type: "PDF",
    header: "reports_%26_publications",
    subHeader: "",
    globalName: "",
    state: "",
    ulb: "",
    year: "",
  }

  myInterval = 2000;
  activeSlideIndex = false;
  p_indi = true;
  m_indi = false;
  itemsPerSlide = 1;
  singleSlideOffset = false;
  noWrap = false;
  postBody;
  stopNavigation:any

  slides = [
    {
      image: "../../../assets/new_dashBord_ftr_hdr/modiji.png",
      text: `"It’s our mission to strengthen our cities to meet the challenges of 21st century"`,
      name: "Narendra Modi",
      designation: "Hon’ble Prime Minister of India",
      class: "prim-img",
      textCls: "p-t",
    },
    {
      image: "../../../assets/new_dashBord_ftr_hdr/puriji.png",
      text: `"Municipalities need to lay a foundation of robust financial management for both,
       enhancing own revenues, as well as tapping the capital market through municipal bonds"`,
      name: "Hardeep Singh Puri",
      designation: "Hon’ble Union Minister of Housing and Urban Affairs",
      class: "min-img",
      textCls: "m-t",
    },
  ];
  whatNewData=[]
  exploreCardData = [
    {
      title: '',
      label: 'Financial Performance Of Cities',
      text: 'Analyze and compare the financial performance of cities',
      icon: '../../../assets/new_dashBord_ftr_hdr/perf.svg',
      // hiddenText: 'Key attributes of 42 municipal bond issuances, 400 listed projects, 223 city credit ratings available',
      link:'/dashboard/national'
    },
    {
      title: '',
      label: 'Improve Own Revenue',
      text: 'Explore own revenue sources of municipalities and identify revenue improvement strategies',
      icon: '../../../assets/new_dashBord_ftr_hdr/revenu.svg',
      // hiddenText: 'Key attributes of 42 municipal bond issuances, 400 listed projects, 223 city credit ratings available',
      link:'/own-revenue-dashboard'
    },

    {
      title: '',
      label: 'Resources',
      text: 'Get access to a rich repository of resources to build your knowledge, and implement municipal finance reforms',
      icon: '../../../assets/new_dashBord_ftr_hdr/resoures/Group 15547.png',
      // hiddenText: 'Key attributes of 42 municipal bond issuances, 400 listed projects, 223 city credit ratings available',
      link:'/resources-dashboard'
    },
    {
      title: '',
      label: 'Service Level Benchmarks',
      text: 'Track your city’s performance across five themes and 28 key indicators.',
      icon: '../../../assets/new_dashBord_ftr_hdr/slb/Group 15493.png',
      // hiddenText: 'Key attributes of 42 municipal bond issuances, 400 listed projects, 223 city credit ratings available',
      link:'/dashboard/slb'
    },
    {
      title: '',
      label: '15th Finance Commission Grants',
      text: 'Apply, review, recommend and track 15th finance commission grants',
      icon: '../../../assets/new_dashBord_ftr_hdr/15fc.svg',
      // hiddenText: 'Key attributes of 42 municipal bond issuances, 400 listed projects, 223 city credit ratings available',
      link:'/login'
    },
    {
      title: '',
      label: 'Upload Annual Accounts',
      text: 'Upload Annual Account Forms',
      icon: '../../../assets/new_dashBord_ftr_hdr/raisemny.svg',
      // hiddenText: 'Key attributes of 42 municipal bond issuances, 400 listed projects, 223 city credit ratings available',
      link:'/upload-annual-accounts'
    },


  ]
  noDataFound = false;
  recentSearchArray = [

  ];
  dummyData:any = [
    {
      name: 'newDataSet',
      type: 'new'
    }
  ]
  ngOnInit() {
    this.loadRecentSearchValue();

    this.globalFormControl.valueChanges
    .subscribe(value => {
      if(value.length >= 1){
        this._commonService.postGlobalSearchData(value,"", "").subscribe((res: any) => {
          console.log(res?.data);
          let emptyArr:any = []
            this.filteredOptions = emptyArr;
          if(res?.data.length > 0 ){

            this.filteredOptions = res?.data;
            this.noDataFound = false;
          }else{

            let emptyArr:any = []
            this.filteredOptions = emptyArr;
            this.noDataFound = true;
            let noDataFoundObj = {
              name: '',
              id: '',
              type: '',
            }
            console.log('no data found')
          }
        });
      }
      else {
        return null;
      }
    })


  }

  loadRecentSearchValue() {
    this._commonService.getRecentSearchValue().subscribe((res:any)=>{
     console.log('recent search value', res);

    //  for(let i=0; i<3; i++){
    //    let obj = {
    //      _id: res?.data[i]?._id,
    //      name: res?.data[i]?.name,
    //      type: 'ulb'
    //    }
    //    this.recentSearchArray[i] = obj ;

    //  }
    this.recentSearchArray = res?.data;
     console.log('ser array', this.recentSearchArray)

    },
    (error)=> {
      console.log('recent search error', error)
    }
    )
  }
  globalSearchClick(){
    console.log('filterOptions', this.filteredOptions)
    console.log('form control', this.globalFormControl.value)
    let searchArray:any = this.filteredOptions;
    let searchValue = searchArray.find(e => e?.name.toLowerCase() == this.globalFormControl?.value.toLowerCase());
    console.log(searchValue);
    

    if(!searchValue){
      this._commonService.updateSearchItem(this.globalFormControl.value);
      let option = {
        type: "searchKeyword",
        _id: ""
      }
    this.dashboardNav(option);
    }
    
    // let postBody = {
    //   type: searchValue.type,
    //   searchKeyword: searchValue._id
    // }

    let type = searchValue?.type;
    this.checkType(type);
    this._commonService.postRecentSearchValue(this.postBody).subscribe((res)=>{
       console.log('serach res', res)
      
   
       
    },
    (error)=>{
      console.log(error)
    });
    let  option = {
      type: searchValue.type,
      _id: searchValue._id
    }
  this.dashboardNav(option);
  }


  checkType(searchValue){
    let type = searchValue?.type;
    if(type == 'ulb'){
      this.postBody = {
       type: searchValue.type,
       ulb: searchValue._id
     };
   }
   if(type == 'state'){
       this.postBody = {
        type: searchValue.type,
        state: searchValue._id
      };
   }
   if(type == 'searchKeyword'){
    this.postBody = {
       type: searchValue.type,
       searchKeyword: searchValue._id
      }
   }
  }
  dashboardNav(option) {
    console.log('option', option)
    this.checkType(option);
    if(option.type != "searchKeyword")
    this._commonService.postRecentSearchValue(this.postBody).subscribe((res)=>{
      console.log('serach res', res)
   },
   (error)=>{
     console.log(error)
   });
    console.log('option', option)

    if(option?.type == 'state'){
      this.getYears(option);
      // this.router.navigateByUrl(`/dashboard/state?stateId=${option._id}`)
    }

    if(option?.type == 'ulb'){
      this.router.navigateByUrl(`/dashboard/city?cityId=${option._id}`)
    }

    if(option?.type == 'searchKeyword'){
      this.router.navigateByUrl(`/resources-dashboard/learning-center/toolkits`)
    }

  }

  carouselClass(e) {
    if (e == 0) {
      this.p_indi = true;
      this.m_indi = false;
    }
    if (e == 1) {
      this.m_indi = true;
      this.p_indi = false;
    }
  }

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 3,
    "dots": true,
    "infinite": false,
    "autoplay" : true,
    "autoplaySpeed" : 2000,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }
  getYears(searchStateId: any) {
    const paramContent: any = {
      "state": searchStateId._id
    };
    console.log('paramContent', paramContent)
    let financialYearList: any = [];
    let promise = new Promise((resolve, reject) => {
      this._commonService.getStateWiseFYs(paramContent).subscribe((res: any) => {
        if (res && res.success) {
          resolve(res["data"] && res["data"]['FYs'] ? res["data"]['FYs'] : []);
        }
      }, (err) => {
        console.log(err.message);
      });
    });
    financialYearList.push(promise);
    Promise.all(financialYearList).then(value => {
      console.log('financialYearList', value);
      let yearList = value && value.length ? value[0] : [];
      this.stopNavigation = yearList
      sessionStorage.setItem('financialYearList', JSON.stringify(yearList));
      this.router.navigateByUrl(`/dashboard/state?stateId=${searchStateId._id}`)
      // if(searchStateId?.type == 'state'){
      //   this.router.navigateByUrl(`/dashboard/state?stateId=${searchStateId._id}`)
      // }
    })
  }

}

