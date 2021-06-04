import { Component } from '@angular/core';

@Component({
    selector: 'doughnut-bar-chart',
    templateUrl: './doughnut-bar-chart.component.html',
    styleUrls: ['./doughnut-bar-chart.component.scss'],
})
export class DoughnutChartArea {
    public chartType: string = 'doughnut';

    public chartDatasets: Array<any> = [
        { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
    ];

    public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

    public chartColors: Array<any> = [
        {
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
            borderWidth: 2,
        }
    ];

    public chartOptions: any = {
        responsive: true
    };
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }