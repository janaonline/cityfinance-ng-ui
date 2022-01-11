import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-practices',
  templateUrl: './best-practices.component.html',
  styleUrls: ['./best-practices.component.scss']
})
export class BestPracticesComponent implements OnInit {

  constructor() { }
  filterComponent;
  cardData = [
    {
      label: 'Mira- Bhayandar Sewerage Management Project',
      info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
      commodo aliquet. Suspendisse in posuere tellus.`,
      link: '',
      type: 'pdf',
      updateDate: 'October 14, 2021'
    },
    {
      label: 'Mira- Bhayandar Sewerage Management Project',
      info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
      commodo aliquet. Suspendisse in posuere tellus.`,
      link: '',
      type: 'pdf',
      updateDate: 'October 14, 2021'
    },
    {
      label: 'Mira- Bhayandar Sewerage Management Project',
      info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
      commodo aliquet. Suspendisse in posuere tellus.`,
      link: '',
      type: 'excel',
      updateDate: 'October 14, 2021'
    },
    {
      label: 'Mira- Bhayandar Sewerage Management Project',
      info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
      commodo aliquet. Suspendisse in posuere tellus.`,
      link: '',
      type: 'pdf',
      updateDate: '06/01/2022'
    },
    {
      label: 'Mira- Bhayandar Sewerage Management Project',
      info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
      commodo aliquet. Suspendisse in posuere tellus.`,
      link: '',
      type: 'excel',
      updateDate: '06/01/2022'
    },
    {
      label: 'Mira- Bhayandar Sewerage Management Project',
      info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta vitae nisl
      commodo aliquet. Suspendisse in posuere tellus.`,
      link: '',
      type: 'pdf',
      updateDate: '06/01/2022'
    },

  ]
  ngOnInit(): void {
    this.filterComponent ={
      comp: 'bestPractices'
    }
  }

  filterData(e){
      console.log('best practices', e)
  }
}
