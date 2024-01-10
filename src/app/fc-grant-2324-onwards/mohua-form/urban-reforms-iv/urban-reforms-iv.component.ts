import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { UrbanReformsIvService } from './urban-reforms-iv.service';


interface IStateData {
  name: string;
}
@Component({
  selector: 'app-urban-reforms-iv',
  templateUrl: './urban-reforms-iv.component.html',
  styleUrls: ['./urban-reforms-iv.component.scss']
})
export class UrbanReformsIvComponent implements OnInit {
  
  states: IStateData[]= [];

  constructor(private urbanReformService: UrbanReformsIvService) { }

  ngOnInit(): void {
    this.urbanReformService.getStates().subscribe(res=>{
      this.states = res['data']
    })
  }
}
