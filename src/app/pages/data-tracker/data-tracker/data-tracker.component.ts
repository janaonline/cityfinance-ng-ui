import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';

@Component({
  selector: "app-data-tracker",
  templateUrl: "./data-tracker.component.html",
  styleUrls: ["./data-tracker.component.scss"],
})
export class DataTrackerComponent implements OnInit {
  ledgerLogs = [];
  fileList: any = {};

  gridOptions = {
    enableColResize: true,
    enableSorting: true,
    enableFilter: true,
  };

  window = window;
  columnDefs = [
    { headerName: "State", field: "stateName" },
    { headerName: "ULB Name", field: "ulbName" },
    { headerName: "Year", field: "financialYear" },
    {
      headerName: "Audit Status",
      field: "audited",
      cellRenderer: ({ data }) => (data.audited ? "Audited" : "Unaudited"),
    },
    {
      headerName: "Download",
      field: "ulb_code_year",
      cellRenderer: function ({ data }) {
        return `<button (click)="openModal" class="btn btn-xs">Download</button>`;
      },
    },
  ];

  constructor(
    private dataEntryService: DataEntryService,
    public modalService: BsModalService,
    private _activatedRoute: ActivatedRoute,
    private _loaderSerivce: GlobalLoaderService
  ) {}

  routeBack: string;

  ngOnInit() {
    this._loaderSerivce.showLoader();
    this._activatedRoute.queryParams.subscribe((queryParams) => {
      this.routeBack = queryParams.backRoute;
      this.dataEntryService.getLedgerLogs(queryParams).subscribe((res) => {
        if (res["success"]) {
          this.ledgerLogs = res["data"];
        } else {
          alert("Failed");
        }
        this._loaderSerivce.stopLoader();
      });
    });
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onDownloadClicked({ data }, ref: TemplateRef<any>) {
    this.fileList = [];
    this.dataEntryService.getFileList(data._id).subscribe((result) => {
      this.fileList = result["data"];
    });
    this.modalService.show(ref);
  }
}
