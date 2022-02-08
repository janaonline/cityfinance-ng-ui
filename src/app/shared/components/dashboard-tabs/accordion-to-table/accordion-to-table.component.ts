import { Component, OnInit } from '@angular/core';
import { BorrowingTabService } from '../borrowing-tab.service';

@Component({
  selector: 'app-accordion-to-table',
  templateUrl: './accordion-to-table.component.html',
  styleUrls: ['./accordion-to-table.component.css']
})

export class AccordionToTableComponent implements OnInit {
  constructor(private borrowingTabService: BorrowingTabService) {}

  tableView = true;
  TableTitles:any;
     HeaderDataOfBorrowTab(){
       this.borrowingTabService.getHeaderName().subscribe(
        (res : any) => {
          console.log("HeaderName", res?.detailsOfInstrument);
           this.TableTitles = res.detailsOfInstrument;
          // console.log("firstTitle", this.firstTitle);
        }
      );
     }
     ColumnDataOfBorrowTab() {
      this.borrowingTabService.getColumnData().subscribe(
        (res:any) => {
          console.log("ColumnData", res?.data)
        }
      )
     }

  ngOnInit(): void {
    this.HeaderDataOfBorrowTab();
    this.ColumnDataOfBorrowTab();
  }
}
