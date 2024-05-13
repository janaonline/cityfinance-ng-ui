import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { SweetAlert } from 'sweetalert/typings/core';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { StateResourceService } from './state-resource.service';
import { ActivatedRoute } from '@angular/router';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { MatPaginator } from '@angular/material/paginator';

const swal: SweetAlert = require("sweetalert");


@Component({
  selector: 'app-state-resource-manager',
  templateUrl: './state-resource-manager.component.html',
  styleUrls: ['./state-resource-manager.component.scss']
})
export class StateResourceManagerComponent implements OnInit {
  
  @ViewChild('paginator') paginator: MatPaginator;
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
    private globalLoaderService: GlobalLoaderService,
    private activatedRoute: ActivatedRoute,
    private commonServices: CommonServicesService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }



  loadData() {
    const payload = {
      design_year: this.design_year,
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

  openAddResourceModel(mode: 'add' | 'edit', data?) {
    const dialog = this.matDialog.open(AddResourceComponent, {
      data: {
        mode,
        oldData: data,
        categories: this.categories,
        states: this.states,
        design_year : this.design_year
      },
      maxWidth: '55vw',
      maxHeight: '90vh',
    })

    dialog.componentInstance.refresh.subscribe(() => {
      this.loadData();
    })
    
    dialog.afterClosed().subscribe(result => {
      console.log(result);
      if (!result) return;
      if (result.actionType === 'createOrUpdate') {
        this.globalLoaderService.showLoader();
        this.stateResourceService.createOrUpdate({ ...result, ...(data && { id: data._id }) }).subscribe(({ type, data }: any) => {
          this.globalLoaderService.stopLoader();
          if (type == 'blob') {
            this.dataEntryService.downloadFileFromBlob(data, `${result?.templateName}-errors.xlsx`);
            swal('Warning', "File has some invalid data please fix and re-upload", 'warning');
          } else if (type == 'json') {
            swal('Saved', "File uploaded successfully!", 'success');
            this.loadData();
          }
        }, ({ error }) => {
          this.globalLoaderService.stopLoader();
          swal('Error', error?.message ?? 'Something went wrong', 'error');
        });
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
    if(this.paginator) this.paginator.firstPage();
    this.loadData();
  }

  resetFilter() {
    this.pageIndex = 0;
   if(this.paginator) this.paginator.firstPage();
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

  onCategoryChange(value) {
    if (!value) this.filters.subCategoryId = '';
  }
// get selected year id from route.
  get design_year() {
    return this.activatedRoute.parent.snapshot.params?.yearId;
  }
// get year into this format = 2023-24, 2024-25
  get yearName() {
    return this.commonServices.getYearName(this.design_year);
  }
}
