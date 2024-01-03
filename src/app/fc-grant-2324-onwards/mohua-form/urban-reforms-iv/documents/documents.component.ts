import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrbanReformsIvService } from '../urban-reforms-iv.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  files = [];

  constructor(
    private urbanReformsViService: UrbanReformsIvService,
    private activatedRoute: ActivatedRoute
  ) { }

  get stateId() {
    return this.activatedRoute.snapshot.params?.stateId;
  }

  ngOnInit(): void {
    this.urbanReformsViService.getDocumentsByState().subscribe(res => {
      this.files = [
        {
            name: 'first',
            url: 'https://jana-cityfinance-stg.s3.ap-south-1.amazonaws.com/mohua/2023-24/state-resources/property-tax-gsdp-document/12%20MB_45c5958a-563e-4a15-a50f-d6fd7c2b70ab.pdf',
            createdAt: '2019-11-16T06:55:49.269Z'
        },
        {
            name: 'second',
            url: 'https://jana-cityfinance-stg.s3.ap-south-1.amazonaws.com/mohua/2023-24/state-resources/property-tax-gsdp-document/12%20MB_45c5958a-563e-4a15-a50f-d6fd7c2b70ab.pdf',
            createdAt: '2019-11-16T06:55:49.269Z'
        },
        {
            name: 'third',
            url: 'https://jana-cityfinance-stg.s3.ap-south-1.amazonaws.com/mohua/2023-24/state-resources/property-tax-gsdp-document/12%20MB_45c5958a-563e-4a15-a50f-d6fd7c2b70ab.pdf',
            createdAt: '2019-11-16T06:55:49.269Z'
        },
      ]
    })
  }



}
