import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking-categories',
  templateUrl: './ranking-categories.component.html',
  styleUrls: ['./ranking-categories.component.scss']
})
export class RankingCategoriesComponent implements OnInit {

  items = ['Above 4 Million', '1 Million - 4 Million', '100K - 1 Million', 'Less than 100,000'];

  constructor() { }

  ngOnInit(): void {
  }

}
