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

  onFileSelected($event: any): void {
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
      this.selectedFiles = ''; // Reset selected files if limit exceeded
      this.myForm.get('inputFiles')?.setValue(''); // Reset the form control
      this._loaderService.stopLoader();
      return;
    }

    this.fileNames = this.selectedFiles.map((file: any) => file.name.split("_")[0]);
    const ulbIds: string[] = [];
    let hasError = false;
    let completedCalls = 0;

    // Step 1: Loop through files, get ULB IDs and prepare metadata
    this.fileNames.forEach((code) => {
      this.bulkPDFUploadService.getUlbList(code).subscribe({
        next: (res) => {
          completedCalls++;
          if (!res || !res.data || res.data.length === 0) {
            hasError = true;
          } else {
            ulbIds.push(res.data[0]._id);
          }
          // Only call checkFinalStatus when all files have been processed
          this.checkFinalStatus(completedCalls, this.fileNames.length, hasError, ulbIds);
        },
        error: (error) => {
          hasError = true;
          completedCalls++;
          this.checkFinalStatus(completedCalls, this.fileNames.length, hasError, ulbIds);
        }
      });
    });
  }



  fyDatayear(yearsData: string): Observable<any> {
    return this.bulkPDFUploadService.yearsData(yearsData).pipe(
      tap(response => {
        console.log("Response:", response);
        // Process the response as needed
      }),
      catchError(error => {
        console.error('Error fetching years data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch years data.',
          timer: 2000,
          showConfirmButton: false,
        });
        this._loaderService.stopLoader();
        return throwError(error); // Handle error
      })
    );
  }

  checkFinalStatus(completed: number, total: number, hasError: boolean, ulbIds: string[]) {
    if (completed === total) {
      if (hasError) {
        this.removeFile();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'One or more PDFs could not be matched to a valid ULB.',
          timer: 2000,
          showConfirmButton: false,
        });
        this._loaderService.stopLoader();
      } else {
        this.fileNames = ulbIds; // Save or use the ULB IDs
        const fy = this.myForm.get('financialYear')?.value;
        this.fyDatayear(fy).subscribe({
          next: (response) => {
            this.fyData = response?.data || [];
            console.log('Years Data:', this.fyData);
            // Handle response (e.g., store or use the years data)
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });

        // Step 2: Prepare upload data (metadata) without submitting
        const uploadData: any[] = [];
        const uploadTasks = this.selectedFiles.map((file, index) => {
          return new Promise(async (resolve, reject) => {
            try {
              const fy = this.myForm.get('financialYear')?.value;
              const ulbId = ulbIds[index];
              const userDataStr = localStorage.getItem('userData');
              const userData = userDataStr ? JSON.parse(userDataStr) : null;
              const uploadedBy = userData?._id;

              this.bulkPDFUploadService.getSignedUrl(file, fy).subscribe({
                next: async (response: any) => {
                  try {
                    const signedUrl = response?.data?.[0]?.file_url;
                    if (!signedUrl) {
                      return reject('Missing signed URL or fileKey');
                    }

                    await this.bulkPDFUploadService.uploadToS3(signedUrl, file);
                    console.log(`File ${file.name} uploaded successfully to S3 for ULB ID: ${ulbId}`);
                    console.log(this.fyData, 'fyData');
                    const ulbData = {
                      ulbId: ulbId,
                      yearsData: [
                        {
                          designYearId: this.fyData?.designYearId,
                          designYear: this.fyData?.designYear,
                          currentFormStatus: 3,
                          sequence: this.fyData?.sequence,
                          uploadedBy: uploadedBy,
                          files: [
                            {
                              source: "dni",
                              type: "pdf",
                              url: signedUrl,
                              name: file.name,
                              created_at: new Date().toISOString(),
                            }
                          ]
                        }
                      ]
                    };

                    uploadData.push(ulbData);
                    resolve({});

                  } catch (uploadError) {
                    reject(uploadError);
                  }
                },
                error: (err) => reject(err)
              });
            } catch (outerError) {
              reject(outerError);
            }
          });
        });

        // Step 3: After all uploads, save the metadata in this.uploadData
        Promise.all(uploadTasks)
          .then(() => {
            console.log('All files processed. Metadata ready for submission.');
            this.uploadData = uploadData; // Save metadata for later submission
            this._loaderService.stopLoader();
          })
          .catch(error => {
            console.error('❌ Upload failed for some files:', error);
            Swal.fire({
              icon: 'error',
              title: 'Upload Failed',
              text: 'One or more files failed to upload.',
              timer: 2000,
              showConfirmButton: false,
            });
            this._loaderService.stopLoader();
          });
      }
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
