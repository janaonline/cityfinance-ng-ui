import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { SweetAlert } from 'sweetalert/typings/core';
import { StateResourceService } from '../state-resource.service';
import { mohuaForm } from 'src/app/fc-grant-2324-onwards/fc-shared/utilities/folderName'


const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  @Output() refresh = new EventEmitter<any>(true);

  dropdownSettings = {
    text: "State",
    enableSearchFilter: true,
    badgeShowLimit: 2,
    labelKey: "name",
    primaryKey: "_id",
    enableCheckAll: true,
  };
  states = [];
  selectedItems = [];

  categories = [];
  isFileUploading: boolean = false;
  oldData: any = {};
  mode: 'add' | 'edit';
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
      categoryId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      files: [[], [Validators.required]],
    });

    console.log(this.form);

    this.form.get('categoryId').valueChanges.subscribe(res => {
      this.form.patchValue({ subCategoryId: '' });
    })
    this.form.get('subCategoryId').valueChanges.subscribe(res => {
      this.form.patchValue({ files: [] });
    })
  }

  get getSubCategoryList() {
    return this.categories?.find(category => category._id == this.form.value.categoryId)?.subCategories;
  }

  get subCategory() {
    return this.getSubCategoryList?.find(subCategory => subCategory._id == this.form.value.subCategoryId);
  }

  get uploadFolderName() {
    return `mohua/2023-24/${mohuaForm.STATE_RESOURCES}/`
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
    const maxFileSize = 10;
    const files = Array.from(event.target.files);
    if(this.maxUploads < (files.length + this.form.value?.files?.length)) return swal("File Limit Error", `Maximum ${this.maxUploads} files can be upload`, "error");
    if(files.some(file => (file.size / 1024 / 1024) > maxFileSize)) return swal("File Limit Error", `Maximum ${maxFileSize} mb file can be allowed.`, "error");
    for (const file of files) {
      if (!file) return;
      let isfileValid = this.dataEntryService.checkSpcialCharInFileName(event.target.files);
      if (isfileValid == false) {
        swal("Error", "File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>?@ \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
        return;
      }
      const fileExtension = file.name.split('.').pop();
  
      if (!this.subCategory?.supportedTypes?.includes(fileExtension)) return swal("Error", `Only ${this.allowedFiles} ${this.subCategory?.supportedTypes?.length == 1 ? 'is' : 'are'} allowed`, "error");
  
      this.loaderService.showLoader();
      this.isFileUploading = true;
      const fullFolderName = this.uploadFolderName + this.subCategory?.name?.replace(/[\/?<>\\:*|"\s]/g, '-')?.toLowerCase();
      this.dataEntryService.newGetURLForFileUpload(file.name, file.type, fullFolderName).subscribe(s3Response => {
        const { url, file_url } = s3Response.data[0];
        this.dataEntryService.newUploadFileToS3(file, url).subscribe(res => {
          if (res.type !== HttpEventType.Response) return;
          console.log({ file, file_url })
          this.form.patchValue({
            files: [
              ...(this.form.value?.files || []),
              {
                name: file.name,
                url: file_url
              }
            ]
          });
          this.loaderService.stopLoader();
        });
      }, err => {
        this.loaderService.stopLoader();
        console.log(err)
      });
    }
  }

  onSubmit() {
    this.dialogRef.close({
      actionType: 'createOrUpdate',
      ...this.form.value,
      uploadType: this.subCategory?.uploadType,
      templateName: this.subCategory?.databaseTemplateName
    });
  }
  deleteAll() {
    this.deleteFiles(this.oldData.files?.map(file => file._id));
  }
  async deleteFiles(fileIds: string[]) {
    const isAgree = await swal(
      "Are you sure?",
      `There are ${fileIds.length} do you want to delete`,
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
      fileIds, stateId: this.oldData?.state?._id
    }).subscribe(res => {
      swal('Successful', 'Successfully deleted', 'success');
      if (this.oldData.files.length != fileIds.length) {
        this.oldData.files = this.oldData?.files?.filter(file => !fileIds.includes(file._id));
        return;
      }
      setTimeout(() => {
        this.refresh.emit();
        this.dialogRef.close()
      }, 500);
    }, ({ error }) => {
      swal('Error', error?.message ?? 'Something went wrong', 'error');
    })
  }
  close() {
    this.dialogRef.close();
  }
  downloadTemplate(templateName) {
    this.loaderService.showLoader();
    this.stateResourceService.getTemplate(templateName, { relatedIds: this.form.value?.relatedIds?.map(item => item?._id) }).subscribe(blob => {
      this.dataEntryService.downloadFileFromBlob(blob, `${templateName}.xlsx`);
      this.loaderService.stopLoader();
    }, err => {
      this.loaderService.stopLoader();
    })
  }
}
