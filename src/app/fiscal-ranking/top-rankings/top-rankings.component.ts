import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { ColorDetails, Marker } from '../india-map/india-map.component';
import { SearchPopupComponent } from '../ulb-details/search-popup/search-popup.component';

@Component({
  selector: 'app-top-rankings',
  templateUrl: './top-rankings.component.html',
  styleUrls: ['./top-rankings.component.scss']
})
export class TopRankingsComponent implements OnInit {

  breadcrumbLinks: BreadcrumbLink[] = [
    {
      label: 'City Finance Ranking - Home',
      url: '/rankings/home'
    },
    {
      label: 'Top rankings',
      url: '/rankings/top-rankings',
      class: 'disabled'
    }
  ];

  markers: Marker[] = [];

  types = [
    {
      key: 'overAll',
      label: 'All',
    },
    {
      key: 'resourceMobilization',
      label: 'Resource Mobilization'
    },
    {
      key: 'expenditurePerformance',
      label: 'Expenditure Performance'
    },
    {
      key: 'fiscalGovernance',
      label: 'Fiscal Governance'
    },
  ]

  // filter = {
  //   type: 'lkfsjdlf',
  //   category: 'slfhdsl',
  //   state: 'jjsj'
  // };

  filter: FormGroup;

  table = { response: null };

  selectedMap: string = 'topUlbs'; // Initialize to default value

  stateList = [];


  populationCategories = [
    { _id: '1', name: '4M+' },
    { _id: '2', name: '1M to 4M' },
    { _id: '3', name: '100K to 1M' },
    { _id: '4', name: '<100K' }
  ];

  dropdownSettings = {
    singleSelection: true,
    text: "India",
    enableSearchFilter: true,
    labelKey: "name",
    primaryKey: "_id",
    showCheckbox: false,
    classes: "homepage-stateList custom-class",
  };

  colorCoding;

  colorDetails: ColorDetails[] = [
    { color: "#04DC00", text: "76%-100%", min: 76, max: 100 },
    { color: "#F8A70B", text: "51%-75%", min: 51, max: 75 },
    { color: "#FFDB5B", text: "26%-50%", min: 26, max: 50 },
    { color: "#FFF281", text: "1%-25%", min: 1, max: 15 },
    { color: "#E5E5E5", text: "0%", min: 0, max: 0 },
  ];

  constructor(
    private matDialog: MatDialog,
    private fiscalRankingService: FiscalRankingService,
    private fb: FormBuilder
  ) { 
    this.filter = this.fb.group({
      populationBucket: '',
      stateData: [''],
      state: '',
      sortBy: 'overAll',
      sortOrder: 1
    });

    this.filter.get('stateData')?.valueChanges.subscribe(value => {
      this.filter.patchValue({ state: value?.[0]?._id || ''}, { emitEvent: false });
    });
    this.filter.valueChanges.subscribe(() => this.loadData());
  }
  
  ngOnInit(): void {
    this.loadStates();
    this.loadData();
  }

  get params() {
    const params = this.filter.value;
    delete params.stateData;
    return params;
  }

  loadData() {
    this.getStateWiseForm();
    this.loadTopRankedUlbs();
  }

  loadTopRankedUlbs() {
    this.fiscalRankingService.topRankedUlbs(this.params).subscribe((res: any) => {
      this.table.response = res.tableData;
      this.markers = res.mapDataTopUlbs;
    })
  }

  loadStates() {
    this.fiscalRankingService.states().subscribe((res: any) => {
      this.stateList = res.data;
    });
  }

  getStateWiseForm() {
    this.fiscalRankingService.getStateWiseForm().subscribe(res => {
      this.colorCoding = res?.data.heatMaps;
    });
  }

  openSearch() {
    this.matDialog.open(SearchPopupComponent, {
      width: '100vw',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'search-page',
    })
  }
}
