import { Component, OnInit ,NgModule} from '@angular/core';
import { FormGroup,FormsModule } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-bulk-pdf',
  templateUrl: './bulk-pdf.component.html',
  styleUrls: ['./bulk-pdf.component.scss']
})
export class BulkPdfComponent implements OnInit {
uploadBulkPdf() {
throw new Error('Method not implemented.');
}
bulkEntryForm: FormGroup;
selectedFinancialYear: any;

  constructor() { }

  ngOnInit(): void {
  }

}
