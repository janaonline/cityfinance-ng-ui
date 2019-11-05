import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  // alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  alphabets = [];
  activeGroup: string = 'IE';
  isMultiULB = false;

  states: any = [];
  ulbs: any = [];
  originalUlbList: any = [];
  selectedUlbs = [];
  reportForm: FormGroup;
  ulbForm = {
    ulbFilter: '',
    ulbPopulationFilter: [],
    ulbTypeFilter: [],
  };
  submitted = false;
  isFormInvalid = false;

  yearLookup = [
    { id: '2015-16', itemName: '2015-16' },
    { id: '2016-17', itemName: '2016-17' },
    { id: '2017-18', itemName: '2017-18' },
  ];
  ulbTypeLookup = [
    { itemName: "All Municipal Corporation", id: "Municipal Corporation" },
    { itemName: "All Municipality", id: "Municipality" },
    { itemName: "All Town Panchayat", id: "Town Panchayat" },
  ];


  // ulbsToHide = ['AP008', 'AP018', 'AP019', 'AP025', 'AP053', 'AP081', 'AP083', 'KL012', 'TS033', 'UP010', 'AP010', 'AP011', 'AP012', 'AP023', 'AP035', 'AP062', 'AP082', 'CG005', 'CG006', 'JH002', 'JH004', 'JH005', 'JH008', 'JH009', 'JH015', 'JH018', 'JH020', 'JH021', 'JH022', 'JH023', 'JH024', 'JH025', 'JH029', 'JH036', 'JH037', 'KA012', 'KA013', 'KA021', 'KA028', 'KA041', 'KA050', 'KA051', 'KA053', 'KA082', 'KA095', 'KA128', 'KA139', 'KA165', 'KA174', 'KA179', 'KL003', 'MP001', 'MZ001', 'PB005', 'RJ003', 'RJ012', 'RJ018', 'RJ024', 'RJ031', 'RJ032', 'RJ035', 'RJ037', 'RJ039', 'RJ047', 'RJ048', 'RJ051', 'RJ052', 'RJ054', 'RJ060', 'RJ061', 'RJ062', 'RJ074', 'RJ080', 'RJ088', 'RJ090', 'RJ099', 'RJ111', 'RJ117', 'RJ118', 'RJ135', 'RJ138', 'RJ139', 'RJ146', 'RJ155', 'RJ157', 'RJ174', 'RJ177', 'RJ187', 'RJ192', 'TS016', 'TS019', 'TS031', 'UP001', 'UP002', 'UP003', 'UP005', 'UP006', 'UP008', 'CG001', 'CG002', 'CG003', 'GJ001', 'JH003', 'JH013', 'JH035', 'JH038', 'KA003', 'KA008', 'KA029', 'KA032', 'KA069', 'KA076', 'KA101', 'KA102', 'KA126', 'KA127', 'KA152', 'KA168', 'KA181', 'KL002', 'MP002', 'OD001', 'OD002', 'OD003', 'OD005', 'PB003', 'RJ020', 'RJ022', 'RJ025', 'RJ041', 'RJ070', 'RJ078', 'RJ079', 'RJ093', 'RJ101', 'RJ113', 'RJ115', 'RJ121', 'RJ150', 'RJ151', 'RJ154', 'RJ161', 'RJ163', 'RJ179', 'TN001', 'WB001'];
  // reportType = ["Summary", "Detailed", "Comparative Summary", "Comparative Detailed", "Comparative Summary ULB", "Comparative Detailed ULB", "Common Size Summary", "Common Size Detailed", "Common Size Summary ULB", "Common Size Detailed ULB"];

  populationData = [];
  selectedItems = [];
  populationDropdownSettings = {};
  yearsDropdownSettings = {};
  ulbTypeDropdownSettings = {};

  modalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private modalService: BsModalService,
    private reportService: ReportService, private router: Router) { }

  ngOnInit() {
    for (let i = 65; i <= 90; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }
    this.populationData = [
      { id: 1, itemName: 'Zero to 1 Lakh', min: 0, max: 100000 },
      { id: 2, itemName: '1 Lakh to 10 Lakhs', min: 100000, max: 1000000 },
      { id: 3, itemName: '10 Lakhs to 1 Crore', min: 1000000, max: 10000000 },
      { id: 4, itemName: 'Above 1 Crore', min: 10000000, max: 100000000 },
    ];
    this.populationDropdownSettings = this.reportService.getMultiSelectDropdownSetting('id', 'itemName', "Select Population");
    this.yearsDropdownSettings = this.reportService.getMultiSelectDropdownSetting('id', 'itemName', "Select Years");
    this.ulbTypeDropdownSettings = this.reportService.getMultiSelectDropdownSetting('id', 'itemName', "Filter ULBs");

    this.reportForm = this.formBuilder.group({
      isComparative: [false, []],
      type: ['Summary', Validators.required],
      years: [[], ],
      yearList: [[], ],
      reportGroup: ['Income & Expenditure Statement', Validators.required],
      ulbList: [this.selectedUlbs, []],
    });

    // this.ulbForm = this.formBuilder.group({
    //   ulbFilter: [''],
    //   ulbPopulationFilter: [''],
    //   ulbTypeFilter: [''],
    // });

    this.commonService.getAllUlbs().subscribe(ulbs => {
      this.originalUlbList = ulbs;
      this.ulbs = JSON.parse(JSON.stringify(this.originalUlbList));
    });

    // this.commonService.states.subscribe(res => {
    //   const stateToHide = ['AN', 'AR', 'BR', 'CH', 'DH', 'DD', 'DL', 'GA', 'HR', 'HP', 'JK', 'LD', 'MN', 'ML', 'NL', 'PY', 'SK'];

    //   this.states = [];
    //   for (let i = 0; i < res.length; i++) {
    //     if(stateToHide.indexOf(res[i].code) == -1){
    //       this.states.push(res[i]);
    //     }        
    //   }
    //   this.states = res;
    //   this.reportForm.value.state = this.states[0];
    // })
    // this.commonService.loadStates(false);
  }

  get lf() {
    return this.reportForm.controls;
  }
  // setComparision(selection){
  //   console.log('before yearComparision : ' + this.reportForm.get('yearComparision').value);
  //   console.log('before ulbComparision : ' + this.reportForm.get('ulbComparision').value);
  //   console.log('before bothComparision : ' + this.reportForm.get('bothComparision').value);
  //   if(this.reportForm.value.yearComparision){
  //     this.reportForm.value.ulbComparision = false;
  //     this.reportForm.value.bothComparision = false;

  //   } else if(this.reportForm.value.ulbComparision){
  //     this.reportForm.value.yearComparision = false;
  //     this.reportForm.value.bothComparision = false;

  //   } else {
  //     this.reportForm.value.yearComparision = false;
  //     this.reportForm.value.ulbComparision = false;
  //   }

  //   console.log('after yearComparision : ' + this.reportForm.get('yearComparision').value);
  //   console.log('after ulbComparision : ' + this.reportForm.get('ulbComparision').value);
  //   console.log('after bothComparision : ' + this.reportForm.get('bothComparision').value);
  // }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  // UlbYearSelection(){
  //   const comparision = this.reportForm.value.comparision;
  //   if (comparision == 'ulb'){
  //     this.stateDropdownSettings = this.reportService.getMultiSelectDropdownSetting('code', 'name');
  //     this.ulbDropdownSettings = this.reportService.getMultiSelectDropdownSetting('code', 'name');
  //     this.yearDropdownSettings = this.reportService.getSingleSelectDropdownSetting('code', 'name');

  //   } else if(comparision == 'year'){
  //     this.stateDropdownSettings = this.reportService.getSingleSelectDropdownSetting('code', 'name');
  //     this.ulbDropdownSettings = this.reportService.getSingleSelectDropdownSetting('code', 'name');
  //     this.yearDropdownSettings = this.reportService.getMultiSelectDropdownSetting('code', 'name');

  //   } else if (comparision == 'both'){
  //     this.stateDropdownSettings = this.reportService.getMultiSelectDropdownSetting('code', 'name');
  //     this.ulbDropdownSettings = this.reportService.getMultiSelectDropdownSetting('code', 'name');
  //     this.yearDropdownSettings = this.reportService.getMultiSelectDropdownSetting('code', 'name');

  //   }
  // }

  onStateSelect(selectedState: any) {
    console.log(selectedState);
    if (selectedState && selectedState.code) {
      this.commonService.getUlbByState(selectedState.code).subscribe(res => {
        const unsortedUlbs = res['data']['ulbs'];

        const sortedUlbs = unsortedUlbs.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.ulbs = [...this.ulbs, ...sortedUlbs];
      })
    }
  }

  onStateDeselect(deselectedState: any) {
    console.log(deselectedState);
  }

  loadUlbs() {
    if (this.reportForm.value.state && this.reportForm.value.state.code) {
      this.commonService.getUlbByState(this.reportForm.value.state.code).subscribe(res => {
        const unsortedUlbs = res['data']['ulbs'];

        // const tempUlbs = res['data']['ulbs'];
        // let unsortedUlbs = [];
        // for (let i = 0; i < tempUlbs.length; i++) {

        //   if(this.ulbsToHide.indexOf(tempUlbs[i].code) == -1){
        //     unsortedUlbs.push(tempUlbs[i]);
        //   }
        // }

        this.ulbs = unsortedUlbs.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        // this.ulbs = sortedUlbs;

        // this.reportForm.value.ulb = this.ulbs[0];
      })
    }
  }

  // loadUlbs2() {
  //   if (this.reportForm.value.state2 && this.reportForm.value.state2.code) {
  //     this.commonService.getUlbByState(this.reportForm.value.state2.code).subscribe(res => {
  //       const tempUlbs = res['data']['ulbs'];
  //       let unsortedUlbs = tempUlbs;
  //       // let unsortedUlbs = [];
  //       // for (let i = 0; i < tempUlbs.length; i++) {

  //       //   if(this.ulbsToHide.indexOf(tempUlbs[i].code) == -1){
  //       //     unsortedUlbs.push(tempUlbs[i]);
  //       //   }
  //       // }
  //       this.ulbs2 = unsortedUlbs.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  //       // this.reportForm.value.ulb2 = this.ulbs[0];
  //     })
  //   }
  // }

  reportTypeChange() {
    if (['Comparative Detailed ULB', 'Comparative Summary ULB', 'Common Size Detailed ULB', 'Common Size Summary ULB'].indexOf(this.reportForm.value.type) > -1) {
      this.isMultiULB = true;
    } else {
      this.isMultiULB = false;
    }
  }

  toggleTab(val: string) {
    this.activeGroup = val;
    if (!this.reportForm.invalid) {
      this.populateReportGroup();
      this.search();
    }
  }

  populateReportGroup() {
    if (this.activeGroup == 'IE') {
      this.reportForm.value.reportGroup = 'Income & Expenditure Statement';
    } else {
      this.reportForm.value.reportGroup = 'Balance Sheet';
    }
  }

  search() {
    console.log(this.reportForm.value);

    const res = {
      "ulbType": "",
      "state": { "code": "CG", "name": "Chhattisgarh" },
      "ulb": { "state": "Chhattisgarh", "code": "CG001", "name": "Ambagarh Chowki Nagar Panchayat", "natureOfUlb": "Nagar Panchayat", "type": "Town Panchayat", "wards": 43, "area": 0, "population": 121071 },
      "state2": "",
      "ulb2": "",
      "year2": "",
      "type": "Detailed",
      "years": ["2015-16", "2016-17"],
      "reportGroup": "Income & Expenditure Statement",
      "ulbList": []
    }


    // comparision: true
    // reportGroup: "Income & Expenditure Statement"
    // type: "detailed"
    // ulbList: Array(3)
    // 0: {state: "Andhra Pradesh", code: "AP001", name: "Addanki Municipality", natureOfUlb: "Municipality", type: "Municipality", …}
    // 1: {state: "Andhra Pradesh", code: "AP005", name: "Atmakur Municipality", natureOfUlb: "Municipality", type: "Municipality", …}
    // 2: {state: "Andhra Pradesh", code: "AP018", name: "Puttur Municipality", natureOfUlb: "Municipality", type: "Municipality", …}
    // length: 3
    // __proto__: Array(0)
    // yearList: Array(2)
    // 0: {id: "2016-17", itemName: "2016-17"}
    // 1: {id: "2015-16", itemName: "2015-16"}

    this.reportForm.value.years = [];

    for (let i = 0; i < this.reportForm.value.yearList.length; i++) {
      const year = this.reportForm.value.yearList[i].id;
      this.reportForm.value.years.push(year);

    }
    // this.submitted = true;
    // stop here if form is invalid
    if(!this.submitted){
      return false;
    }
    if (this.reportForm.invalid) {
      this.isFormInvalid = true;
      return false;
    }

    if (this.reportForm.value.years.length == 0) {
      alert('select atleast one Year to continue');
      this.isFormInvalid = true;
      return false;
    }

    if (this.reportForm.value.ulbList.length == 0) {
      alert('select atleast one ULB to continue');
      this.isFormInvalid = true;
      return false;
    }

    // if(this.reportForm.value.type.indexOf("ULB") > -1){
    //   if(!this.reportForm.value.state2 || !this.reportForm.value.ulb2 || !this.reportForm.value.year2){
    //     this.isFormInvalid = true;
    //     return false;
    //   }
    // }
    this.isFormInvalid = false;

    this.populateReportGroup();
    if (this.reportForm.value.ulbList[0] && this.reportForm.value.ulbList[1] && this.reportForm.value.ulbList[0] == this.reportForm.value.ulbList[1]) {
      alert('Please select different ULBs to compare');

    } else if (this.reportForm.value.ulb && ["Municipal Corporation", "Municipality", "Town Panchayat", "All"].indexOf(this.reportForm.value.ulb.value) > -1) {

      this.reportForm.value.ulbList = [];
      const ulbType = this.reportForm.value.ulb.value;
      this.ulbs.forEach(ulb => {
        if (ulbType == 'All' || ulb.type == ulbType) {
          this.reportForm.value.ulbList.push(ulb.code);
        }
      });

      if (this.reportForm.value.ulbList.length == 0) {
        alert("No Ulbs available under current selection");
        return false;
      }

      // this.reportForm.value.reportGroup = 'Income & Expenditure Statement';
      this.reportService.getAggregate(this.reportForm.value);
      // return;
    }
    else if (this.activeGroup == 'IE') {
      this.reportService.ieDetailed(this.reportForm.value);
    } else {
      this.reportService.BSDetailed(this.reportForm.value);
    }

    if (this.reportForm.value.ulbList.length == 1 && !this.reportForm.value.isComparative) {
      this.router.navigate(['/dashboard/report/basic']);

    } else if (this.reportForm.value.ulbList.length > 1 || this.reportForm.value.yearList.length > 1) {
      this.router.navigate(['/dashboard/report/comparative-ulb']);

    }  else if (['Common Size Detailed ULB', 'Common Size Summary ULB'].indexOf(this.reportForm.value.type) > -1) {
      this.router.navigate(['/dashboard/report/common-size-ulb']);

    } else if (['Common Size Detailed', 'Common Size Summary'].indexOf(this.reportForm.value.type) > -1) {
      this.router.navigate(['/dashboard/report/common-size']);

    } else if (['detailed', 'summary'].indexOf(this.reportForm.value.type) > -1) {
      this.router.navigate(['/dashboard/report/basic']);

    } else if (['Comparative Detailed', 'Comparative Summary'].indexOf(this.reportForm.value.type) > -1) {
      this.router.navigate(['/dashboard/report/comparative']);

    } else if (['Comparative Detailed ULB', 'Comparative Summary ULB'].indexOf(this.reportForm.value.type) > -1) {
      this.router.navigate(['/dashboard/report/comparative-ulb']);

    } else {
      alert('Something went wrong!');
    }

  }

  openUlbModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  //Click event on parent checkbox  
  selectStateCheckbox(selectedSate) {
    // for (var i = 0; i < selectedSate.value.ulbs.length; i++) {
    //   selectedSate.value.ulbs[i].isSelected = selectedSate.value.isSelected;
    // }
  }

  //Click event on child checkbox  
  selectUlbCheckbox(ulb, selectedState, ulbs) {
    selectedState.value.isSelected = ulbs.some(function (itemChild: any) {
      return itemChild.isSelected == true;
    })

    if (ulb.value.isSelected) {
      this.selectedUlbs.push(ulb.value);
    } else {
      for (let i = 0; i < this.selectedUlbs.length; i++) {
        if (this.selectedUlbs[i].code == ulb.value.code) {
          this.selectedUlbs.splice(i, 1);
        }
      }
    }
  }


  unselectAllPopulation(event){
    this.ulbForm.ulbPopulationFilter = [];
    this.filterUlbs(event);
  }

  unselectAllULBTypes(event){
    this.ulbForm.ulbTypeFilter = [];
    this.filterUlbs(event);
  }


  filterUlbs(filterName){
    if(this.ulbForm.ulbPopulationFilter.length ==0 && this.ulbForm.ulbTypeFilter.length ==0){
      this.ulbs.data = JSON.parse(JSON.stringify(this.originalUlbList.data));
      return;
    } else if(filterName == 'ulbPopulationFilter'){
      this.ulbForm.ulbTypeFilter = [];
      this.ulbs.data = this.filterUlbByPopulation(this.originalUlbList.data);
    } else if(filterName == 'ulbTypeFilter'){
      this.ulbForm.ulbPopulationFilter = [];
      this.ulbs.data = this.filterUlbByType(this.originalUlbList.data);
    }
    // if(this.ulbForm.ulbFilter){
    //   this.filterUlbByLetter();
    // }
  }

  filterUlbByLetter(char){
    let resultData = {};
    const ulbList = JSON.parse(JSON.stringify(this.originalUlbList.data));
    
    var states = Object.keys(ulbList);
    // var states = Object.keys(this.ulbs.data);
    for (let i = 0; i < states.length; i++) {
      var ulbs = ulbList[states[i]]['ulbs'];
      // var ulbs = this.ulbs.data[states[i]]['ulbs'];
      if(ulbs && ulbs.length>0){
        
        let filteredUlbs = [];
        for (let j = 0; j < ulbs.length; j++) {
        
          if( ulbs[j] && ulbs[j].name.toUpperCase().charAt(0) == char){
            filteredUlbs.push(ulbs[j]);
          }
        }

        if(filteredUlbs.length > 0){
          resultData[states[i]] = {state: ulbList[states[i]].state, ulbs: []};
          resultData[states[i]]['ulbs'] = filteredUlbs;
        }
      }
      
    }
    this.ulbs.data = resultData;
  }

  filterUlbByPopulation(ulbList){
    
    let resultData = {};
    console.log('********populationFilterData : ', this.ulbForm.ulbPopulationFilter)

    const populationFilter = this.ulbForm.ulbPopulationFilter;
    var states = Object.keys(ulbList);
    // var states = Object.keys(this.ulbs.data);
    for (let i = 0; i < states.length; i++) {
      var ulbs = ulbList[states[i]]['ulbs'];
      // var ulbs = this.ulbs.data[states[i]]['ulbs'];
      if(ulbs && ulbs.length>0){
        
        let filteredUlbs = [];
        for (let j = 0; j < ulbs.length; j++) {

          for (let k = 0; k < populationFilter.length; k++) {
            
            if(ulbs[j].population > populationFilter[k]['min'] && ulbs[j].population <= populationFilter[k]['max']){
              filteredUlbs.push(ulbs[j]);
            }
          }
        }
        resultData[states[i]] = {state: ulbList[states[i]].state, ulbs: []};
        resultData[states[i]]['ulbs'] = filteredUlbs;
      }
      
    }

    return resultData;
    
  }

  filterUlbByType(ulbList){
    let resultData = {};
    console.log('********ulbTypeFilter : ', this.ulbForm.ulbTypeFilter)
    const ulbTypeFilter = this.ulbForm.ulbTypeFilter;
   
    var states = Object.keys(ulbList);
    for (let i = 0; i < states.length; i++) {
      var ulbs = ulbList[states[i]]['ulbs'];
      if(ulbs && ulbs.length>0){
        
        let filteredUlbs = [];
        for (let j = 0; j < ulbs.length; j++) {

          if(ulbTypeFilter.length == 0){
            filteredUlbs.push(ulbs[j]);
            continue;
          }
          for (let k = 0; k < ulbTypeFilter.length; k++) {
            
            if(ulbs[j].type == ulbTypeFilter[k]['id']){
              filteredUlbs.push(ulbs[j]);
            }
          }
        }
        resultData[states[i]] = {state: ulbList[states[i]].state, ulbs: []};
        resultData[states[i]]['ulbs'] = filteredUlbs;
      }
    }
    return resultData;
    
  }


  // filterUlbByPopulation(){
    
  //   console.log('********populationFilterData : ', this.ulbForm.ulbPopulationFilter)

  //   const populationFilter = this.ulbForm.ulbPopulationFilter;
  //   var states = Object.keys(this.originalUlbList.data);
  //   // var states = Object.keys(this.ulbs.data);
  //   for (let i = 0; i < states.length; i++) {
  //     var ulbs = this.originalUlbList.data[states[i]]['ulbs'];
  //     // var ulbs = this.ulbs.data[states[i]]['ulbs'];
  //     if(ulbs && ulbs.length>0){
        
  //       let filteredUlbs = [];
  //       for (let j = 0; j < ulbs.length; j++) {

  //         for (let k = 0; k < populationFilter.length; k++) {
            
  //           if(ulbs[j].population > populationFilter[k]['min'] && ulbs[j].population <= populationFilter[k]['max']){
  //             filteredUlbs.push(ulbs[j]);
  //           }
  //         }
  //       }
  //       this.ulbs.data[states[i]]['ulbs'] = filteredUlbs;

  //     }
      
  //   }
    
  // }

  // filterUlbByType(){
  //   let result = {}
  //   console.log('********populationFilterData : ', this.ulbForm.ulbTypeFilter)
  //   const ulbTypeFilter = this.ulbForm.ulbTypeFilter;
   
  //   var states = Object.keys(this.originalUlbList.data);
  //   for (let i = 0; i < states.length; i++) {
  //     var ulbs = this.originalUlbList.data[states[i]]['ulbs'];
  //     if(ulbs && ulbs.length>0){
        
  //       let filteredUlbs = [];
  //       for (let j = 0; j < ulbs.length; j++) {

  //         if(ulbTypeFilter.length == 0){
  //           filteredUlbs.push(ulbs[j]);
  //           continue;
  //         }
  //         for (let k = 0; k < ulbTypeFilter.length; k++) {
            
  //           if(ulbs[j].type == ulbTypeFilter[k]['id']){
  //             filteredUlbs.push(ulbs[j]);
  //           }
  //         }
  //       }
  //       this.ulbs.data[states[i]]['ulbs'] = filteredUlbs;

  //     }
      
  //   }
    
  // }

  

}
