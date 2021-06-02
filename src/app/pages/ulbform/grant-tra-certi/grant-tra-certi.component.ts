import { Component, OnInit } from '@angular/core';
import { GTCertificateService } from './grant-tra-certi.service'
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-grant-tra-certi',
  templateUrl: './grant-tra-certi.component.html',
  styleUrls: ['./grant-tra-certi.component.scss']
})
export class GrantTraCertiComponent implements OnInit {

  constructor(
    private gtCertificate: GTCertificateService,
  ) {

  }
  data = []
  total = 0
  totalCount = []
  ngOnInit(): void {
    this.total = 0;
    this.gtCertificate.getData()
      .subscribe((res) => {
        console.log(res)
        for (let key in res['data']) {
          if (res['data'][key]['pdfUrl'] != null || undefined || '') {
            this.data.push(res['data'][key])
          }
        }


        console.log(this.total)
        console.log(this.data)
      },
        (err) => {
          console.log(err)
          swal('No Documents Uploaded by State Nodal Officer')
        }
      )


  }

}
