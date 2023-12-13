import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Chart from 'chart.js';
import { FiscalRankingService, UlbData } from '../../fiscal-ranking.service';
import { ComparisionFiltersComponent } from '../comparision-filters/comparision-filters.component';


@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit, OnChanges {
  public chart: any;
  @Input() ulb: any;
  @Input() topUlbs: UlbData[];
  allTypeGraphData = {};
  types = [
    { id: 'overAll', label: 'Over All' },
    { id: 'resourceMobilization', label: 'Resource mobilisation' },
    { id: 'expenditurePerformance', label: 'Expenditure performance' },
    { id: 'fiscalGovernance', label: 'Fiscal Governance' }
  ];
  type = 'overAll';

  datasetsFilter = {
    "State Average": true,
    "National Average": true,
    "Population Average": true,
  }

  ulbs = [];

  constructor(
    private matDialog: MatDialog,
    private fiscalRankingService: FiscalRankingService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ulb?.currentValue && this.ulbs.length == 0) {
      this.ulbs = [{ ...this.ulb, disabled: true }, ...this.topUlbs];
      this.getBarchartData();
    }
  }

  getBarchartData() {
    const ulbQuery = this.ulbs.map(item => `ulb[]=${item?.ulb}`).join('&');
    this.fiscalRankingService.getBarchartData(ulbQuery).subscribe((res: any) => {
      this.allTypeGraphData = res.graphData;
      this.createChart();
    })
  }

  get graphData() {
    return this.allTypeGraphData?.[this.type];
  }

  createChart() {
    if (this.chart) this.chart.destroy();
    const that = this;
    this.chart = new Chart("bar-chart-with-line", {
      type: 'bar',
      data: {
        ...this.graphData,
        datasets: this.graphData.datasets.map(item => ({
          ...item,
          hidden: !(this.datasetsFilter[item.label] != undefined ? this.datasetsFilter[item.label] : true)
        }))
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 100
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
        },
        legend: {
          position: 'bottom',
          display: true,
          labels: {
            boxWidth: 10
          },
          onClick: function (event, legendItem) {
            if (Object.keys(that.datasetsFilter).includes(legendItem.text)) {
              that.datasetsFilter[legendItem.text] = legendItem?.hidden;
            }
            Chart.defaults.global.legend.onClick.call(this, event, legendItem);
          }
        }
      }
    } as any);

    this.chart.canvas.style.height = '55vh';
  }

  openFilter() {
    this.matDialog.open(ComparisionFiltersComponent, {
      width: '500px',
      data: {
        ulbs: this.ulbs,
        datasetsFilter: this.datasetsFilter
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        if (res == 'reset') return this.reset();
        this.ulbs = res.ulbs;
        this.datasetsFilter = res.datasetsFilter;
        this.getBarchartData();
      }
    });
  }

  reset() {
    console.log('reset');
    this.ulbs = [{ ...this.ulb, disabled: true }];
    this.datasetsFilter = {
      "State Average": true,
      "National Average": true,
      "Population Average": true,
    };
    this.getBarchartData();
  }
}
