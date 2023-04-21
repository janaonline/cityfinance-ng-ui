import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WaterRejenuvations2223ServiceService } from 'src/app/newPagesFc/xvfc2223-state/water-rejenuvations2223/water-rejenuvations2223-service.service';
import { StateDashboardService } from 'src/app/pages/stateforms/state-dashboard/state-dashboard.service';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';

@Component({
  selector: 'app-projects-wss',
  templateUrl: './projects-wss.component.html',
  styleUrls: ['./projects-wss.component.scss']
})
export class ProjectsWssComponent implements OnInit {

  constructor(
    public stateDashboardService: StateDashboardService,
    public newCommonService: NewCommonService,
    private fb: FormBuilder,
    private waterRejenuvationService: WaterRejenuvations2223ServiceService,
  ) { }

  questionResponce = {
    title:'Projects for Water and Sanitation',
    formId: '',
    design_year: '',
    status:'',
    statusId:'',
    state: '',
    declaration : {
      name: '',
      url:''
    },
    uaData:[
      {
        ua: '',
        status: '',
        rejectReason: '',
        waterBodies: [],
        reuseWater: [],
        serviceLevelIndicators: [],
        foldCard: false,
      }
    ]
  }

  waterBodies: {
    tilte: '',
    id: '',
    info:'',
    cols:[
      {
        lineItem: '',
        shortKey: ''
      }
    ],
    rows:[
      shortKey: '',
      type: '',
      validation:[],
      min: '',
      max: '',
      value: '', 
    ]
  }

  
tableRes = {
    title:'AAA',
    tables : [
      {
        tableName: 'AAAAAAA',
        data: {
          "columns": [
            {
                "key": "ulbType",
                "display_name": "Population Category"
            },
            {
                "key": "numberOfULBs",
                "display_name": "Number Of ULBs"
            },
            {
                "key": "ulbsWithData",
                "display_name": "ULBs With Data"
            },
            {
                "key": "DataAvailPercentage",
                "display_name": "Data Availability Percentage"
            },
            {
                "key": "urbanPopulationPercentage",
                "display_name": "Urban Population Percentage"
            }
        ],
        "rows": [
            {

              "ulbType": {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "numberOfULBs": {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "ulbsWithData":  {
                value: 87,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "DataAvailPercentage":  {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "urbanPopulationPercentage":  {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
            },
            {
              "ulbType": {
                value: 4,
                type: "file",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "numberOfULBs": {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "ulbsWithData":  {
                value: '',
                type: "date",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "DataAvailPercentage":  {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "urbanPopulationPercentage":  {
                value: 111,
                type: "number",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
            },
            // {
            //     "ulbType": "1 Million - 4 Million",
            //     "numberOfULBs": 42,
            //     "ulbsWithData": 14,
            //     "DataAvailPercentage": "33 %",
            //     "urbanPopulationPercentage": "1 %"
            // },
            // {
            //     "ulbType": "500 Thousand - 1 Million",
            //     "numberOfULBs": 55,
            //     "ulbsWithData": 21,
            //     "DataAvailPercentage": "38 %",
            //     "urbanPopulationPercentage": "1 %"
            // },
            // {
            //     "ulbType": "100 Thousand - 500 Thousand",
            //     "numberOfULBs": 392,
            //     "ulbsWithData": 117,
            //     "DataAvailPercentage": "30 %",
            //     "urbanPopulationPercentage": "8 %"
            // },
            // {
            //     "ulbType": "< 100 Thousand",
            //     "numberOfULBs": 4380,
            //     "ulbsWithData": 0,
            //     "DataAvailPercentage": "0 %",
            //     "urbanPopulationPercentage": "90 %"
            // }
        ]
      }
      },
      {
        tableName: 'BBBBBBBbbb',
        data: {
          "columns": [
            {
                "key": "ulbType",
                "display_name": "Population Category"
            },
            {
                "key": "numberOfULBs",
                "display_name": "Number Of ULBs"
            },
            {
                "key": "ulbsWithData",
                "display_name": "ULBs With Data"
            },
            {
                "key": "DataAvailPercentage",
                "display_name": "Data Availability Percentage"
            },
            {
                "key": "urbanPopulationPercentage",
                "display_name": "Urban Population Percentage"
            }
        ],
        "rows": [
          {

            "ulbType": {
              value: 4,
              type: "text",
              changeFns: this.getTextValidation(),
              min: 1,
              max: 10
            },
            "numberOfULBs": {
              value: 4,
              type: "text",
              changeFns: this.getTextValidation(),
              min: 1,
              max: 10
            },
            "ulbsWithData":  {
              value: 87,
              type: "text",
              changeFns: this.getTextValidation(),
              min: 1,
              max: 10
            },
            "DataAvailPercentage":  {
              value: 4,
              type: "text",
              changeFns: this.getTextValidation(),
              min: 1,
              max: 10
            },
            "urbanPopulationPercentage":  {
              value: 4,
              type: "text",
              changeFns: this.getTextValidation(),
              min: 1,
              max: 10
            },
        },
            {
              "ulbType": {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "numberOfULBs": {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "ulbsWithData":  {
                value: 87,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "DataAvailPercentage":  {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "urbanPopulationPercentage":  {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
            },
            {
              "ulbType": {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "numberOfULBs": {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "ulbsWithData":  {
                value: 87,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "DataAvailPercentage":  {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
              "urbanPopulationPercentage":  {
                value: 4,
                type: "text",
                changeFns: this.getTextValidation(),
                min: 1,
                max: 10
              },
            },
            // {
            //     "ulbType": "1 Million - 4 Million",
            //     "numberOfULBs": 42,
            //     "ulbsWithData": 14,
            //     "DataAvailPercentage": "33 %",
            //     "urbanPopulationPercentage": "1 %"
            // },
            // {
            //     "ulbType": "500 Thousand - 1 Million",
            //     "numberOfULBs": 55,
            //     "ulbsWithData": 21,
            //     "DataAvailPercentage": "38 %",
            //     "urbanPopulationPercentage": "1 %"
            // },
            // {
            //     "ulbType": "100 Thousand - 500 Thousand",
            //     "numberOfULBs": 392,
            //     "ulbsWithData": 117,
            //     "DataAvailPercentage": "30 %",
            //     "urbanPopulationPercentage": "8 %"
            // },
            // {
            //     "ulbType": "< 100 Thousand",
            //     "numberOfULBs": 4380,
            //     "ulbsWithData": 0,
            //     "DataAvailPercentage": "0 %",
            //     "urbanPopulationPercentage": "90 %"
            // }
        ]
      }
      }
    ]
    
}
userData = JSON.parse(localStorage.getItem("userData"));
Year = JSON.parse(localStorage.getItem("Years"));
uasData = JSON.parse(sessionStorage.getItem("UasList"));
stateId='';
UANames = [];
uasList;
waterRejenuvation: FormGroup;
data;
showLoader=true;
  ngOnInit(): void {
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
    this.setUaList();
   // this.initializeReport();
  }
 setUaList(){
    this.stateDashboardService.getCardData(this.stateId).subscribe(
      (res) => {
        let newList = {};
        res["data"]["uaList"].forEach((element) => {
          this.UANames.push(element.name)
          newList[element._id] = element;
        });
        sessionStorage.setItem("UasList", JSON.stringify(newList));
        this.uasList = Object.values(JSON.parse(sessionStorage.getItem("UasList")))
        this.uasData = JSON.parse(sessionStorage.getItem("UasList"));
       this.loadData();

      },
      (err) => {
        console.log(err);
      }
    );
  }
  foldCard(index) {
    this.Uas[index].controls.foldCard.value =
      !this.Uas[index].controls.foldCard.value;
  }
  checkCard(index) {
    return this.Uas[index].controls.foldCard.value;
  }
  uaIdToName(index) {
    if (this.uasData) {
      let uaDataAtIndex = this.uasData[this.Uas[index].value["ua"]];
      return uaDataAtIndex.name;
    }
  }
 get Uas() {
   if (!this.showLoader)
     return this.waterRejenuvation.get("uaData")["controls"] as FormArray;
  }
  public initializeReport() {
    this.waterRejenuvation = this.fb.group({
      state: this.fb.control(this.stateId, [Validators.required]),
      design_year: this.fb.control(this.Year["2022-23"], [Validators.required]),
      uaData: this.fb.array(this.getUas()),
      status: this.fb.control('', []),
   //   isDraft: this.fb.control(this.isDraft, []),
      declaration: this.fb.group({
        url: ['', Validators.required],
        name: ['', Validators.required]
      }),
    });

  }
  getUas() {
  
    console.log("rejen heading...", this.data);
    return this.data.map((data) =>
      this.fb.group({
        ua: data.ua,
        status: data?.status ?? "PENDING",
        rejectReason: data?.rejectReason ?? null,
        // waterBodies: this.fb.array(this.getWaterBodies(data.waterBodies)),
        // reuseWater: this.fb.array(this.getReuseWater(data.reuseWater)),
        // serviceLevelIndicators: this.fb.array(this.getServiceLevelIndicator(data.serviceLevelIndicators)),
        foldCard: false,
      })
    );
  }

  loadData() {
    console.log('ggggggg', this.uasData)
    // this.isLoadingError = true;
    // this.isApiInProgress = true;
    this.waterRejenuvationService.getData(this.Year["2023-24"], this.stateId).subscribe(
      (res) => {
        this.showLoader = false;
        // this.errorOnload = true;
        // this.isPreYear = true;
        // this.isApiInProgress = false;
        this.data = res["data"]["uaData"];
      //  this.wData = res["data"];
        // if (this.wData?.declaration?.url && this.wData?.declaration?.name) {
        //   this.showStateAct = true;
        //   this.stateActFileName = this.wData?.declaration?.name;
        //   this.stateActUrl = this.wData?.declaration?.url;
        // }
      //  this.isDraft = res["data"].isDraft;
      //  this.totalStatus = res["data"].status;
      //  this.storeData(res["data"]);
        this.showLoader = false;
      //  console.log("water rej data", this.data);
         this.initializeReport();
      //  this.setSkipLogic(this.data);
      //  this.isLoadingError = false;
        // resolve("ss");
      },
      (err) => {
        this.showLoader = false;


      }
    );
  }
  getTextValidation(){
    console.log('validation', )
  }
}
