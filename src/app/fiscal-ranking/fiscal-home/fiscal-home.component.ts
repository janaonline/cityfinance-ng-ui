import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-fiscal-home',
  templateUrl: './fiscal-home.component.html',
  styleUrls: ['./fiscal-home.component.scss']
})
export class FiscalHomeComponent implements OnInit {

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);

src="../../../assets/M FIGMA/laurentiu-morariu-8XZTZIfuNrM-unsplash 1.jpg";

arrReward:Array<any>=[
  {
  image : "../../../assets/M FIGMA/medal 1.png",
  title: "Rewards & Recognition",
  text: "Reward & recognise ULBs that have taken positive step towards revenue generation, expenditure management & building effective fiscal govenement systems."
  },
  {
    image : "../../../assets/M FIGMA/collaboration 1.png",
    title: "Peer Learnings",
    text: "Facilitate peer learnings by building a collaborative and learning environment that would enable scaling best oractises across ULBs."
  },
  {
      image : "../../../assets/M FIGMA/competition 1.png",
      title: "Healthy Competition",
      text: "Fuel healthy competition among ULBs & states with an aim of building a robust municipal finance ecosystem and a culture of financially healthy and sustainable ULBs."
  },
  {
    image : "../../../assets/M FIGMA/online-library 1.png",
    title: "Platform for Support",
    text: "Platform for identifying technical support needs of states/cities for implementing municipal finance reforms and informing policy decisions at union/state level."
  }
]

arrReward2:Array<any>=[
  {
  image : "../../../assets/M FIGMA/graph 1.png",
  title: "Resource Mobilization ",
  text: "signifies the size and growth trend in the total receipts and own revenues of the ULB..."
  },
  {
    image : "../../../assets/M FIGMA/doughnut 1.png",
    title: "Expenditure Performance ",
    text: "signifies size and quality of expenditure (spending) towards building infrastructure..."
  },
  {
      image : "../../../assets/M FIGMA/agreement 1.png",
      title: "Fiscal Governance ",
      text: "refers to robustness of systems in place with respect to transparency and accountability..."
  },
]


arrReward3:Array<any>=[
  {
  image : "../../../assets/M FIGMA/medal (1) 1.png",
  title: "Simple Ranking Methodology",
  text: "All ULBs are required to submit their key financial data and upload their financial documents on the www.cityfinance.in"
  },
  {
    image : "../../../assets/M FIGMA/upload 1.png",
    title: "100% Paperless Process",
    text: "All ULBs are required to submit their key financial data and upload their financial documents on the www.cityfinance.in"
  },
  {
      image : "../../../assets/M FIGMA/collection 1.png",
      title: "3 Data sources",
      text: "Audited Annual Accounts, Approved Annual Budget, Self-reported financial details."
  },
]

arrReward4:Array<any>=[
  {
  image : "../../../assets/M FIGMA/city 1.png",
  title: "Above 4 Million ",
  },
  {
    image : "../../../assets/M FIGMA/city 1 (1).png",
    title: "1 Million - 4 Million ",
  },
  {
      image : "../../../assets/M FIGMA/city 1 (2).png",
      title: "100K - 1 Million ",
      
  },
  {
    image : "../../../assets/M FIGMA/city 1 (3).png",
    title: "Less than 100,000 ",
    
},
]






  constructor() { }

  ngOnInit(): void {
  
  }
}
