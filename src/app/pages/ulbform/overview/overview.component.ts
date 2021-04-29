import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  headertext = 'The 15th Finance Commission Grants Management System facilitates seamless submission and flow of required information between Urban Local Bodies, State Governments and Ministry of Housuing and Urban Affairs for the purposes of availaing ULB Grants between 2021-2026.'
  cards = [
    'Linking PFMS Account',
    'Grant Transfer Certificate',
    'Detailed Utilization Report',
    'Annual Accounts',
    'Service Level Benchmarks',
    'Million Plus City Challenge Fund',
    'Plans for Water and Sanitation'
  ]

  resourceNames = ['Testing Manual']
  colors = [
    'linear-gradient(#73C557, #3A632C);',
    'linear-gradient(#42C9F6, #21657B);',
    'linear-gradient(#F16831, #793419);',
    'linear-gradient(#549D5E, #2A4F2F);',
    'linear-gradient(#FDCB2E, #7F6617);',
    'linear-gradient(#E71368, #740A34);',
    'linear-gradient(#9D198B, #4F0D46);',
  ]

  imageUrls = ['https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80']
}
