import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FiscalRankingService, Table } from '../fiscal-ranking.service';
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
      key: 'overAllRank',
      label: 'All',
    },
    {
      key: 'resourceMobilizationRank',
      label: 'Resource Mobilization (RM)'
    },
    {
      key: 'expenditurePerformanceRank',
      label: 'Expenditure Performance (EP)'
    },
    {
      key: 'fiscalGovernanceRank',
      label: 'Fiscal Governance (FG)'
    },
  ]

  filter: FormGroup;
  table: Table = {
    response: null,
  };
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
    { color: "#E5E5E5", text: "0", min: 0, max: 0 },
    { color: "#FFF281", text: "1 to 2", min: 1, max: 2 },
    { color: "#FFDB5B", text: "3 to 5", min: 3, max: 5 },
    { color: "#F8A70B", text: "6 to 8", min: 6, max: 8 },
    { color: "#31CFF1", text: "9 to 10", min: 9, max: 10 },
    { color: "#04DC00", text: "10+", min: 11, max: Infinity },
  ];
  isShowingMap: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private fiscalRankingService: FiscalRankingService,
    private fb: FormBuilder
  ) {
    this.filter = this.fb.group({
      populationBucket: '1',
      stateData: [''],
      state: '',
      category: 'overAllRank',
    });

    this.filter.get('stateData')?.valueChanges.subscribe(value => {
      this.table.response = null;
      this.filter.patchValue({ state: value?.[0]?._id || '' }, { emitEvent: false });
    });
    this.filter.get('category')?.valueChanges.subscribe(() => {
      this.table.response = null;
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

  get footnote() {
    if(this.filter.value?.populationBucket == '1') {
      return "Note: These are the ULBs that submitted their records to complete the ranking."
    }
  }

  loadData() {
    this.loadTopRankedStatesMap();
    this.loadTopRankedUlbs(this.table, '');
  }

  loadTopRankedUlbs(table: Table, queryParams: string = '') {
    this.isShowingMap = false;
    this.fiscalRankingService.topRankedUlbs(queryParams, table?.response?.columns, this.params).subscribe((res: any) => {
      this.isShowingMap = true;
      this.table.response = res.tableData;
      this.markers = res.mapDataTopUlbs;
    })
  }


  onUpdate(table, event) {
    this.loadTopRankedUlbs(table, event?.queryParams);
  }

  loadStates() {
    this.fiscalRankingService.states().subscribe((res: any) => {
      this.stateList = res.data;
    });
  }

  loadTopRankedStatesMap() {
    this.fiscalRankingService.topRankedStates(this.params).subscribe((res: any) => {
      this.colorCoding = res?.states?.map(state => ({ ...state, percentage: state.count }));
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
