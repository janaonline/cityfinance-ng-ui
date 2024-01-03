import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrbanReformsIvService } from '../urban-reforms-iv.service';

interface fileEntry {
  name: string,
  url: string,
  createAt: string
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  files: fileEntry[] = [];

  constructor(
    private urbanReformsViService: UrbanReformsIvService,
    private activatedRoute: ActivatedRoute
  ) { }

  get stateId() {
    return this.activatedRoute.snapshot.params?.stateId;
  }

  get stateName() {
    return this.activatedRoute.snapshot.queryParams?.name;
  }

  ngOnInit(): void {
    const params = {
      relatedIds: [this.stateId]
    }
    this.urbanReformsViService.getDocumentsByState(params).subscribe((res: any) => {
      console.log(res);
      this.files = res?.data?.map(item => ({
        name: item?.file?.name,
        url: item?.file?.url,
        createdAt: item?.createdAt
      }));
    });
    console.log('files', this.files);
  }
}
