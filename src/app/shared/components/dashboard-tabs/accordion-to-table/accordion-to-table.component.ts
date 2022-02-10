import { Component, OnInit } from '@angular/core';
import { BorrowingTabService } from '../borrowing-tab.service';

@Component({
  selector: 'app-accordion-to-table',
  templateUrl: './accordion-to-table.component.html',
  styleUrls: ['./accordion-to-table.component.css']
})

export class AccordionToTableComponent implements OnInit {
  constructor(private borrowingTabService: BorrowingTabService) {}
  formattedNamesMapping: { [nameIdentifier: string]: string } = {};
  private regexToSplitWordOnCapitalLetters = /([A-Z]+[^A-Z]*|[^A-Z]+)/;
  bondIssuerItemData;
  mainRows;
  paginatedbondIssuerItem;




  private capitalizedName(originalName: string) {
    const formattedName = originalName
      .split(this.regexToSplitWordOnCapitalLetters)
      .join(" ")
      .trim();

    return formattedName[0].toUpperCase() + formattedName.substring(1);
    // formattedName.trim();
  }

  private onGettingBondIssuerSuccess(res) {
    Object.keys(res).forEach((name) => {
      const capitalizedName = this.capitalizedName(name);
      this.formattedNamesMapping[name] = capitalizedName;
      res[name].forEach((name) => {
        const formattedName = this.capitalizedName(name);
        this.formattedNamesMapping[name] = formattedName;
      });
    });
    this.mainRows = res;
  }

  private createSubHeader() {
    let array = [];
    Object.keys(this.mainRows).forEach((key) => {
      const config = {
        text: this.formattedNamesMapping[key],
        colorWholeRow: true,
        bold: true,
        backgroundColor: "F8CBAD",
      };

      const subHeaderRow = [config];

      array.push(subHeaderRow);
      const detailRows = this.mainRows[key].map((subRow) => {
        const detailColumns = {
          text: this.formattedNamesMapping[subRow],
        };

        const ulbDataCoulmns = this.bondIssuerItemData.map((ulb) => ({
          text: ulb[subRow],
        }));
        return [detailColumns, ...ulbDataCoulmns];
      });
      array = array.concat(detailRows);
    });
    return array;
  }


  // tableView = true;
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
