import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { SweetAlert } from 'sweetalert/typings/core';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { StateResourceService } from './state-resource.service';

const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-state-resource-manager',
  templateUrl: './state-resource-manager.component.html',
  styleUrls: ['./state-resource-manager.component.scss']
})
export class StateResourceManagerComponent implements OnInit {

  dataLoaded: boolean = false;
  totalDocuments = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [2, 10, 20, 30];
  documents: any[] = [];
  states: any[] = [];
  categories: any[] = [];

  filters = {
    stateId: '',
    categoryId: ''
  }

  constructor(
    private matDialog: MatDialog,
    private dataEntryService: DataEntryService,
    private stateResourceService: StateResourceService,
    private globalLoaderService: GlobalLoaderService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }



  loadData() {
    const payload = {
      skip: this.pageIndex * this.pageSize,
      limit: this.pageSize,
      ...this.filters,
    }

    this.globalLoaderService.showLoader();
    this.stateResourceService.getResourceList(payload).subscribe(({ data }: any) => {
      this.globalLoaderService.stopLoader();
      this.documents = data.documents;
      this.totalDocuments = data.totalDocuments;
      if (!this.dataLoaded) {
        this.categories = data.categories;
        this.states = data.states;
      }
      this.dataLoaded = true;
    }, err => {
      this.globalLoaderService.stopLoader();
    })
  }

  openAddResourceModel(mode: 'add' | 'view' | 'edit', data?) {
    this.matDialog.open(AddResourceComponent, {
      data: {
        mode,
        oldData: data,
        categories: this.categories,
        states: this.states
      },
      maxWidth: '50vw'
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.globalLoaderService.showLoader();
        this.stateResourceService.createOrUpdate({ ...result, ...(data && { id: data._id }) }).subscribe(({ type, data}) => {
          this.globalLoaderService.stopLoader();
          if(type == 'blob') {
            this.dataEntryService.downloadFileFromBlob(data, `${result?.templateName}-errors.xlsx`);
            swal('Warning', "File has some invalid data please fix and re-upload", 'warning');
          } else if (type == 'json') {
            swal('Saved', "File uploaded successfully!", 'success');
            console.log(data);
            this.loadData();
          }
        }, err => {
          console.log({ err });
          this.globalLoaderService.stopLoader();
        })
      }
    });
  }

  onUpdate(event, resource) {
    event.preventDefault();
    this.openAddResourceModel(resource);
  }

  // async onDelete(event: Event, id: string) {
  //   event.preventDefault();
  //   const agree = await swal("Confirmation !", `Are you sure you want to submit this action?`, "warning", {
  //     buttons: {
  //       Submit: {
  //         text: "Submit",
  //         value: true,
  //       },
  //       Cancel: {
  //         text: "Cancel",
  //         value: false,
  //       },
  //     },
  //   })
  //   if (!agree) return;
  //   this.stateResourceService.deleteById(id).subscribe(res => {
  //     this.loadData();
  //   })
  // }

  applyFilter() {
    this.pageIndex = 0;
    this.loadData();
  }

  resetFilter() {
    this.pageIndex = 0;
    this.filters = {
      categoryId: '',
      stateId: ''
    };
    this.loadData();
  }

  pageChange({ pageSize, pageIndex }) {
    console.log(pageIndex);
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadData();
  }

  async removeStateFromFiles(document) {
    console.log(document);
    const fileIds = document.files?.map(file => file._id);
    const stateId = document.state._id;
    const isAgree = await swal(
      "Are you sure?",
      `There are ${document?.files?.length} do you want to delete`,
      "warning"
      , {
        buttons: {
          Delete: {
            text: "Delete",
            className: 'btn-danger',
            value: true,
          },
          Cancel: {
            text: "Cancel",
            className: 'btn-light',
            value: false,
          },
        },
      }
    );

    if (!isAgree) return;
    this.stateResourceService.removeStateFromFiles({
      fileIds, stateId
    }).subscribe(res => {
      this.loadData();
    }, err => {
      console.log(err);
    });

    console.log({ isAgree, fileIds });
  }
}
