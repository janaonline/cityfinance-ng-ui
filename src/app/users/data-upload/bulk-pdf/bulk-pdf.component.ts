import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, debounceTime, tap } from 'rxjs/operators';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { BulkPDFUploadService } from './bulk-pdf.service'
import { reject } from 'lodash';
import { Observable, throwError } from 'rxjs';
import { GlobalLoaderService } from "../../../../app/shared/services/loaders/global-loader.service";

@Component({
  selector: 'app-bulk-pdf',
  templateUrl: './bulk-pdf.component.html',
  styleUrls: ['./bulk-pdf.component.scss'],

})
export class BulkPdfComponent implements OnInit {
  uploadData: any[];
  constructor(private fb: FormBuilder, private bulkPDFUploadService: BulkPDFUploadService, public _loaderService: GlobalLoaderService) { }

  selectedFiles: any;
  fileNames: string[] = [];
  financialYears: string[] = [
    '2020-21',
    '2021-22',
    '2022-23',
    '2023-24',
    '2024-25',
    '2025-26',

  ];
  fyData: any;
  myForm: FormGroup = this.fb.group({
    financialYear: ['2020-21'],
    inputFiles: ['']
  })



  ngOnInit(): void {
    this.myForm.get('financialYear')?.valueChanges.pipe(
      debounceTime(300), // Wait for 300ms pause in events
    )
      .subscribe({
        next: (year) => {
          this.onFinancialYearChange(year);
        },
        error: (err) => {
          console.error('Error in financial year change:', err);
        }
      });
  }

 checkFile() {
    if (this.myForm.get("inputFiles").value) {
      Swal.fire({
        title: "Selected file will be removed",
        text: " Re-selecting the year will remove the selected file. Do you want to continue?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.selectedFiles = "";
      this.myForm.get("inputFiles")?.setValue("");
        } else if (result.isDenied) {
          
        }
      });
    }
  }
async onFileSelected($event: any): Promise<void> {
  this._loaderService.showLoader();
  const files: FileList = $event.target.files;
  this.selectedFiles = Array.from(files);

  if (this.selectedFiles.length > 10) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Maximum 10 files can be selected at a time.",
      timer: 2000,
      showConfirmButton: false,
    });
    this.selectedFiles = '';
    this.myForm.get('inputFiles')?.setValue('');
    this._loaderService.stopLoader();
    return;
  }

  this.fileNames = this.selectedFiles.map(file => file.name.split("_")[0]);
  const ulbIds: string[] = [];
  let hasError = false;

  try {
    // Step 1: Resolve ULB IDs synchronously
    for (const code of this.fileNames) {
      const ulbRes = await this.bulkPDFUploadService.getUlbList(code).toPromise();
      if (!ulbRes?.data?.length) {
        hasError = true;
        break;
      } else {
        ulbIds.push(ulbRes.data[0]._id);
      }
    }

    if (hasError) {
      Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "unable to retrive data of one or more ULB codes",
      timer: 2000,
      showConfirmButton: false,
    });
      throw new Error("One or more ULB codes could not be resolved.");
    }

    // Step 2: Fetch financial year data
    const fy = this.myForm.get('financialYear')?.value;
    const fyRes = await this.bulkPDFUploadService.yearsData(fy).toPromise();
    this.fyData = fyRes?.data;
    if (!this.fyData) throw new Error("Year data not found");

    // Step 3: Upload PDFs one by one and prepare metadata
    const uploadData: any[] = [];
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      const ulbId = ulbIds[i];
      const userDataStr = localStorage.getItem('userData');
      const uploadedBy = userDataStr ? JSON.parse(userDataStr)?._id : null;

      const signedUrlRes:any = await this.bulkPDFUploadService.getSignedUrl(file, fy).toPromise();
      console.log(signedUrlRes,'this is signed url response')
      const signedUrl = signedUrlRes?.data?.[0]?.file_url;
      const fileKey = signedUrlRes?.data?.[0]?.path;

      if (!signedUrl || !fileKey) {
        throw new Error(`Signed URL missing for file: ${file.name}`);
      }

      await this.bulkPDFUploadService.uploadToS3(signedUrl, file)

      uploadData.push({
        ulbId,
        yearsData: [
          {
            designYearId: this.fyData?.designYearId,
            designYear: this.fyData?.designYear,
            currentFormStatus: 3,
            sequence: this.fyData?.sequence,
            uploadedBy,
            files: [
              {
                source: "dni",
                type: "pdf",
                url: fileKey,
                name: file.name,
                created_at: new Date().toISOString(),
              }
            ]
          }
        ]
      });
    }

    this.uploadData = uploadData;
    console.log("✅ All files uploaded and metadata ready:", uploadData);
    this._loaderService.stopLoader();

  } catch (err) {
    console.error("❌ Error during upload process:", err);
    Swal.fire({
      icon: 'error',
      title: 'Upload Failed',
      text: err.message || 'An error occurred while uploading files.',
      timer: 2000,
      showConfirmButton: false,
    });
    this.removeFile();
    this._loaderService.stopLoader();
  }
}


  submitBulkPDf(uploadData: any[]) {
    this._loaderService.showLoader();
    if (uploadData.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No data to submit',
        text: 'Please upload files first.',
        timer: 2000,
        showConfirmButton: false,
      });
      this._loaderService.stopLoader();
      return;
    }

    this.bulkPDFUploadService.uploadBulkPdfData(uploadData).subscribe({
      next: (response) => {
        console.log('Bulk upload success:', response);
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful',
          text: 'All files uploaded and data sent.',
          timer: 2000,
          showConfirmButton: false,
        });
        
        this.removeFile(); // Reset selected files on error
        this._loaderService.stopLoader();
      },
      error: (err) => {

        console.error('Error sending bulk upload data:', err);
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'Failed to send bulk data to the backend.',
          timer: 2000,
          showConfirmButton: false,
        });
        this.removeFile(); // Reset selected files on error
        this._loaderService.stopLoader();

      }
    });
  }

  removeFile() {
    this.selectedFiles = ''; // Reset selected files if limit exceeded
    this.myForm.get('inputFiles')?.setValue(''); // Reset the form control
    return;
  }

  onFinancialYearChange(year: string) {
    console.log('Financial Year Changed:', year);
    // throw new Error('Method not implemented.');
  }

}
