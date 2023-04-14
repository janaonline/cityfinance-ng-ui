import { Component, OnInit } from '@angular/core';
import { GtcService } from './gtc.service';

@Component({
  selector: 'app-gtc',
  templateUrl: './gtc.component.html',
  styleUrls: ['./gtc.component.scss']
})
export class GtcComponent implements OnInit {

  baseForm: any[];

  constructor(
    private gtcService: GtcService
  ) { }

  ngOnInit(): void {
    this.getBaseForm();
  }

  getBaseForm() {
    this.gtcService.getBaseForm().subscribe((res: any) => {
      console.log(res);
      this.baseForm = res;
    })
  }

  onPreview() {
    
  }

}
