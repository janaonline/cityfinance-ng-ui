import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Chart from 'chart.js';
import { FiscalRankingService } from '../../fiscal-ranking.service';
import { ComparisionFiltersComponent } from '../comparision-filters/comparision-filters.component';


@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit, OnChanges {
  public chart: any;
  @Input() ulb;
  allTypeGraphData = {};
  types = [
    { id: 'overAll', label: 'Over All' },
    { id: 'resourceMobilization', label: 'Resource mobilisation' },
    { id: 'expenditurePerformance', label: 'Expenditure performance' },
    { id: 'fiscalGovernance', label: 'Fiscal Governance' }
  ];
  type = 'overAll';

  ulbs = [];

  constructor(
    private matDialog: MatDialog,
    private fiscalRankingService: FiscalRankingService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ulb?.currentValue && this.ulbs.length == 0) {
      this.ulbs = [{ ...this.ulb, disabled: true }];
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

    this.chart = new Chart("bar-chart-with-line", {
      type: 'bar',
      data: this.graphData,
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
        }
      }
    } as any);

    this.chart.canvas.style.height = '55vh';
  }

  openFilter() {
    this.matDialog.open(ComparisionFiltersComponent, {
      minWidth: '400px',
      maxWidth: '500px',
      data: {
        ulbs: this.ulbs
      }
    }).afterClosed().subscribe(res => {
      console.log('res', res);
      if (res) {
        this.ulbs = res.ulbs;
        this.getBarchartData();
      }
    });
  }

}
