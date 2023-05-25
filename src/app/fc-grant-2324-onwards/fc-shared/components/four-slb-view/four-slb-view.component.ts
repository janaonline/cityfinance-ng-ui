import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-four-slb-view',
  templateUrl: './four-slb-view.component.html',
  styleUrls: ['./four-slb-view.component.scss']
})
export class FourSlbViewComponent implements OnInit {

  constructor() { }
  //   const services: {
  //     key: keyof WaterManagement;
  //     name: string;
  //     benchmark: string;
  //     customValidator?: (control: AbstractControl) => any;
  //   }[] = [
  //       {
  //         key: "waterSuppliedPerDay",
  //         name: "Water supplied in litre per capita per day(lpcd)",
  //         benchmark: "135 LPCD",
  //       },
  //       {
  //         key: "reduction",
  //         name: "% of Non-revenue water",
  //         benchmark: "20%",
  //         customValidator: maxValidator,
  //       },
  //       {
  //         key: "houseHoldCoveredWithSewerage",
  //         name: "% of households covered with sewerage/septage services",
  //         benchmark: "100%",
  //         customValidator: maxValidator,
  //       },
  //       {
  //         key: "houseHoldCoveredPipedSupply",
  //         name: "% of households covered with piped water supply",
  //         benchmark: "100%",
  //         customValidator: maxValidator,
  //       },
  //     ];
  //     <thead>
  //     <th scope="col">Service Level Indicators</th>
  //     <th scope="col">Benchmark</th>
  //     <th scope="col">
  //         Actual Indicator<br /> 2020-21
  //     </th>

  //     <th *ngFor="let column of targets" scope="col">
  //         <span [innerHTML]="column.name"></span>
  //     </th>
  // </thead>

  // const targets = [
  //   { key: "2122", name: "Target <br> 2021-22" },
  //   { key: "2223", name: "Target <br> 2022-23" },
  //   { key: "2324", name: "Target <br> 2023-24" },
  //   { key: "2425", name: "Target<br> 2024-25" },
  // ];
  data = {
    "rows": [
      {
        serviceLevelIndicators: 'Water supplied in litre per capita per day(lpcd)',
        benchmark: '135 LPCD',
        achieved2122: '',
        target2223: '',
        achieved2223: '',
        target2122: '',
        target2324: '',
        target2425: '',
        wghtd_score: ''
      },
      {
        serviceLevelIndicators: '% of Non-revenue water',
        benchmark: '70 %',
        achieved2122: '',
        target2223: '',
        achieved2223: '',
        target2122: '',
        target2324: '',
        target2425: '',
        wghtd_score: ''

      },
      {
        serviceLevelIndicators: '% of households covered with sewerage/septage services',
        benchmark: '100 %',
        achieved2122: '',
        target2223: '',
        achieved2223: '',
        target2122: '',
        target2324: '',
        target2425: '',
        wghtd_score: ''

      },
      {
        serviceLevelIndicators: '% of households covered with piped water supply',
        benchmark: '100 %',
        achieved2122: '',
        target2223: '',
        achieved2223: '',
        target2122: '',
        target2324: '',
        target2425: '',
        wghtd_score: ''

      }, 
    ],
    "columns": [
      {
        "key": "serviceLevelIndicators",
        "display_name": "Service Level Indicators"
      },
      {
        "key": "benchmark",
        "display_name": "Benchmark"
      },
      {
        "key": "achieved2122",
        "display_name": "Achieved <br> 2021-22"
      },
      {
        "key": "target2223",
        "display_name": "Target <br> 2022-23"
      },
      {
        "key": "achieved2223",
        "display_name": "Achieved <br> 2022-23"
      },
      {
        "key": "target2122",
        "display_name": "Target <br> 2021-22"
      },
      {
        "key": "target2324",
        "display_name": "Target <br> 2023-24"
      },
      {
        "key": "target2425",
        "display_name": "Target <br> 2024-25"
      },
      {
        "key": "wghtd_score",
        "display_name": "Weighted Score"
      },

    ]
  }

  ngOnInit(): void {
  }

}
