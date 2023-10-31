import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-parameter',
  templateUrl: './assessment-parameter.component.html',
  styleUrls: ['./assessment-parameter.component.scss']
})
export class AssessmentParameterComponent implements OnInit {

  constructor() { }
  pageId:number = 1;
  currentPage:string = 'Resource Mobilisation';
  subHeading:string = 'Fueling Urban Growth';
  pageDefinition:string = `Resource Mobilization is a crucial parameter that evaluates the financial 
  strength and growth potential of Urban Local Bodies (ULBs). Discover the significance of
   resource mobilization, how it's assessed, and its impact on ULB rankings and urban development.`;

   assestParameters = {
      title: '',
      data : [
        {
          id: 1,
          key: 'resourceMobilisation',
          label: 'Resource Mobilisation'
        },
        {
          id: 2,
          key: 'ExpenditurePerformance',
          label: 'Expenditure Performance'
        },
        {
          id: 3,
          key: 'FiscalGovernance',
          label: 'Fiscal Governance'
        },

      ]

   };
   resourceMobilisationData = {
    id: 1,
    key: 'resourceMobilisation',
    name: 'Resource Mobilisation',
    subHeading: 'Fueling Urban Growth',
    description: `Resource Mobilization is a crucial parameter that evaluates the financial 
                  strength and growth potential of Urban Local Bodies (ULBs). Discover the significance of
                  resource mobilization, how it's assessed, and its impact on ULB rankings and urban development.`,
    imgUrl : `../../../assets/fiscal-rankings/smart-industry-control-concept 1.png`,
    questions: [
      {
        question: 'Why is Resource Mobilization Important?',
        ansewer: `Resource Mobilization is crucial for ULBs to ensure financial stability and growth.
         It enables them to provide essential services,
         infrastructure development, and quality of life improvements for urban residents.`
      },
      {
        question: 'How Resource Mobilization helps ULB Scoring?',
        ansewer: `Resource Mobilization significantly influences ULB rankings. Higher mobilization indicates better financial health,
         leading to higher scores and better ULB positions in the rankings.`
      }
    ],
    scoringInfo: {
        header: 'Scoring Information',
        items: [
          {
            key: 'numberOfIndicators',
            value: 6,
            title: 'Number of Indicators'
          },
          {
            key: 'maximumScoreforIndicator',
            value: 100,
            title: 'Maximum Score for Each Indicator'
          },
          {
            key: 'Maximum Score',
            value: 300,
            title: 'maximumScore'
          },
        ]
    },
    scoringMethodology: {
      header: 'Scoring Methodology',
      description: `Unveiling the Metrics Shaping Urban Financial Strength and How They're Scored. 
      Explore the assessment indicators that drive the financial health of Urban Local Bodies (ULBs) and understand the methodology behind their scoring.
       Gain insights into the significance of resource mobilization in urban development.`,
      imgUrl: '../../../assets/fiscal-rankings/resMobTable.png'
    }

   };

   expenditurePerformance = {
    id: 2,
    name: 'Expenditure Performance',
    subHeading: 'Fueling Urban Growth',
    description: `Explore the metrics that gauge Expenditure Performance and learn why it's a pivotal aspect for Urban Local Bodies (ULBs) across India.
    Understand how Expenditure Performance influences ULB rankings and delve into the scoring methodology.`,
    imgUrl : `../../../assets/fiscal-rankings/business-people-analyzing-data-graphs-and-charts-displayed-on-the-digital-tablet-screen 1.png`,
    questions: [
      {
        question: 'Why is Expenditure Performance Important?',
        ansewer: `Expenditure Performance is critical for ULBs to efficiently allocate resources, ensure quality infrastructure, and deliver services effectively.
         It contributes to improving the overall living conditions in urban areas.`
      },
      {
        question: 'How Expenditure Performance Affects ULB Scoring?',
        ansewer: `Expenditure Performance directly impacts ULB rankings.
         Higher performance in terms of capital expenditure and cost-effective operations & maintenance expenses results in better scores and higher ULB rankings.`
      }
    ],
    scoringInfo: {
      header: 'Scoring Information',
      items: [
        {
          key: 'numberOfIndicators',
          value: 6,
          title: 'Number of Indicators'
        },
        {
          key: 'maximumScoreforIndicator',
          value: 100,
          title: 'Maximum Score for Each Indicator'
        },
        {
          key: 'Maximum Score',
          value: 300,
          title: 'maximumScore'
        },
      ]
  },
    scoringMethodology: {
      header: '',
      description: ``,
      imgUrl: ''
    }

   };
   pageData3 = {
    id: 1,
    name: 'Resource Mobilisation',
    subHeading: 'Fueling Urban Growth',
    description: `Resource Mobilization is a crucial parameter that evaluates the financial 
                  strength and growth potential of Urban Local Bodies (ULBs). Discover the significance of
                  resource mobilization, how it's assessed, and its impact on ULB rankings and urban development.`,
    imgUrl : `../../../assets/fiscal-rankings/smart-industry-control-concept 1.png`,
    questions: [
      {
        question: '',
        ansewer: ''
      },
      {
        question: '',
        ansewer: ''
      }
    ],
    scoringInfo: {
      header: 'Scoring Information',
      items: [
        {
          key: 'numberOfIndicators',
          value: 6,
          title: 'Number of Indicators'
        },
        {
          key: 'maximumScoreforIndicator',
          value: 100,
          title: 'Maximum Score for Each Indicator'
        },
        {
          key: 'Maximum Score',
          value: 300,
          title: 'maximumScore'
        },
      ]
  },
    scoringMethodology: {
      header: '',
      description: ``,
      imgUrl: ''
    }

   }

  ngOnInit(): void {
  }
  setPageId(data){

  }
}
