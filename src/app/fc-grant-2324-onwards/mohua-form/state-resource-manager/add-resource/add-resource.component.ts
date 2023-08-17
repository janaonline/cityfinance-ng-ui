import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { SweetAlert } from 'sweetalert/typings/core';
import { StateResourceService } from '../state-resource.service';

const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  
  dropdownSettings = {
    text: "State",
    enableSearchFilter: false,
    labelKey: "name",
    primaryKey: "_id",
    enableCheckAll: true,
    classes: "homepage-stateList custom-class",
  };
  states = [];
  selectedItems = [];

  categories = [];
  isFileUploading: boolean = false;
  oldData: any = {};
  mode: 'add' | 'view' | 'edit';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataEntryService: DataEntryService,
    private loaderService: GlobalLoaderService,
    private stateResourceService: StateResourceService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log('data', this.data.oldData);
    this.oldData = this.data.oldData;
    this.mode = this.data?.mode;
    this.categories = this.data.categories;
    this.states = this.data.states;
    this.form = this.fb.group({
      relatedIds: [[], [Validators.required]],
      categoryId: [this.data?.oldData?.category?._id || '', Validators.required],
      subCategoryId: [this.data?.oldData?.subCategory?._id || '', Validators.required],
      file: this.fb.group({
        url: [this.data?.oldData?.file?.url || '', Validators.required],
        name: [this.data?.oldData?.file?.name || '', Validators.required]
      })
    });

    console.log(this.form);

    this.form.get('categoryId').valueChanges.subscribe(res => {
      this.form.patchValue({ subCategoryId: '' });
    })
  }

  get getCategoryList() {
    return this.categories?.find(category => category._id == this.form.value.categoryId)?.subCategories;
  }

  get subCategory() {
    return this.getCategoryList?.find(subCategory => subCategory._id == this.form.value.subCategoryId);
  }

  get uploadFolderName() {
    return `mohua/2023-24/state-resource`
  }

  get allowedFiles() {
    return this.subCategory?.supportedTypes?.map(type => '.' + type).join();
  }
  get maxUploads() {
    return this.subCategory?.maxUploads;
  }

  ngOnInit(): void {
  }

  uploadFile(event: { target: HTMLInputElement }) {
    const maxFileSize = 5;
    const excelFileExtensions = ['xls', 'xlsx'];
    const file: File = event.target.files[0];
    if (!file) return;
    let isfileValid = this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if (isfileValid == false) {
      swal("Error", "File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>?@ \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
      return;
    }
    const fileExtension = file.name.split('.').pop();

    if ((file.size / 1024 / 1024) > maxFileSize) return swal("File Limit Error", `Maximum ${maxFileSize} mb file can be allowed.`, "error");
    this.loaderService.showLoader();
    this.isFileUploading = true;
    this.dataEntryService.newGetURLForFileUpload(file.name, file.type, this.uploadFolderName).subscribe(s3Response => {
      const { url, file_url } = s3Response.data[0];
      this.dataEntryService.newUploadFileToS3(file, url).subscribe(res => {
        if (res.type !== HttpEventType.Response) return;
        console.log({ file, file_url })
        this.form.patchValue({
          file: {
            name: file.name,
            url: file_url
          }
        })
        this.loaderService.stopLoader();
      });
    }, err => {
      this.loaderService.stopLoader();
      console.log(err)
    });
  }

  onSubmit() {
    this.dialogRef.close({
      ...this.form.value, 
      uploadType: this.subCategory?.uploadType,
      templateName: this.subCategory?.databaseTemplateName
    });
  }
  close() {
    this.dialogRef.close();
  }
  downloadTemplate(templateName) {
    this.loaderService.showLoader();
    this.stateResourceService.getTemplate(templateName).subscribe(blob => {
      this.dataEntryService.downloadFileFromBlob(blob, `${templateName}.xlsx`);
      this.loaderService.stopLoader();
    }, err => {
      this.loaderService.stopLoader();
    })
  }
}
