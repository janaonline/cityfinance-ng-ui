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
    categoryId: '',
    subCategoryId: ''
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
    }, ({ error }) => {
      this.globalLoaderService.stopLoader();
      swal('Error', error?.message ?? 'Something went wrong', 'error');
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
      maxWidth: '50vw',
      maxHeight: '90vh',
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.globalLoaderService.showLoader();
        this.stateResourceService.createOrUpdate({ ...result, ...(data && { id: data._id }) }).subscribe(({ type, data }) => {
          this.globalLoaderService.stopLoader();
          if (type == 'blob') {
            this.dataEntryService.downloadFileFromBlob(data, `${result?.templateName}-errors.xlsx`);
            swal('Warning', "File has some invalid data please fix and re-upload", 'warning');
          } else if (type == 'json') {
            swal('Saved', "File uploaded successfully!", 'success');
            console.log(data);
            this.loadData();
          }
        }, ({ error }) => {
          this.globalLoaderService.stopLoader();
          swal('Error', error?.message ?? 'Something went wrong', 'error');
        })
      }
    });
  }

  get subCategories() {
    return this.categories.find(category => category._id == this.filters.categoryId)?.subCategories || [];
  }

  onUpdate(event, resource) {
    event.preventDefault();
    this.openAddResourceModel(resource);
  }


  applyFilter() {
    this.pageIndex = 0;
    this.loadData();
  }

  resetFilter() {
    this.pageIndex = 0;
    this.filters = {
      categoryId: '',
      stateId: '',
      subCategoryId: ''
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
    }, ({ error }) => {
      swal('Error', error?.message ?? 'Something went wrong', 'error');
    })

    console.log({ isAgree, fileIds });
  }
}
