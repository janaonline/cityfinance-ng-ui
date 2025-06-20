import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BudgetUploadService } from './budget-upload.service';
import { GlobalLoaderService } from "../../../../app/shared/services/loaders/global-loader.service";

interface FYItem {
  fy: string;
  status: 'Pending' | 'Draft' | 'Uploaded' | 'Done' | 'Warning';
  icon: string;
  designYearId: string;
  uploadedBy?: string | null;
  fileName?: string;
  files?: any[];
  sequence?: number;
}
@Component({
  selector: 'app-budget-upload',
  templateUrl: './budget-upload.component.html',
  styleUrls: ['./budget-upload.component.scss']
})
export class BudgetUploadComponent implements OnInit {
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private budgetuploadservice: BudgetUploadService, public _loaderService: GlobalLoaderService,) { }
  fyList: FYItem[];
  // [
  //     {
  //       fy: 'FY 2021-22',
  //       status: 'Done',
  //       icon: 'https://cdn-icons-png.flaticon.com/128/5290/5290109.png'
  //     },
  //     {
  //       fy: 'FY 2022-23',
  //       status: 'Pending',
  //       icon: 'https://cdn-icons-png.flaticon.com/128/8213/8213126.png'
  //     },
  //     {
  //       fy: 'FY 2023-24',
  //       status: 'Pending',
  //       icon: 'https://cdn-icons-png.flaticon.com/128/8213/8213126.png'
  //     },
  //     {
  //       fy: 'FY 2024-25',
  //       status: 'Done',
  //       icon: 'https://cdn-icons-png.flaticon.com/128/5290/5290109.png'
  //     },
  //      {
  //       fy: 'FY 2025-26',
  //       status: 'Done',
  //       icon: 'https://cdn-icons-png.flaticon.com/128/5290/5290109.png'
  //     },
  //   ];
  selectedIdx = 0;                 // first year pre-selected
  allowedFileTypeStr = 'application/pdf';
  uploadedFileName: string | null = null;
  uploadedFileUrl: string | null = null;
  uploadedFilePath: string | null = null;
  uploadedFile: File | null = null;
  uploadError: string = '';
  isDragging = false;
  isFileValid = false;
  isLoading = true;
  uploadConfig: any = null;
  validations: any[] = [];
  pastedUrl: string = '';
  ngOnInit(): void {
    const userDataStr = localStorage.getItem('userData');
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    const ulb = userData?.ulb;

    if (!ulb) {
      this.snackBar.open('ULB ID not found in local storage.', 'Dismiss', { duration: 3000 });
      return;
    }

    this.budgetuploadservice.getYearsData(ulb).subscribe({
      next: (res: any) => {
        this._loaderService.showLoader();
        if (res.status && Array.isArray(res.data)) {
          this.fyList = res.data.map((item: any) => {
            this.isLoading = false;
            const fyLabel = `FY ${item.designYear}`;
            const hasFiles = item.files && item.files.length > 0;
            const file = hasFiles ? item.files[0] : null;
            const sequence = item.sequence;
            const displayName = hasFiles
              ? `CityReport_Budget_${item.designYear}.pdf`
              : null;
            return {
              fy: fyLabel,
              status: hasFiles ? 'Done' : 'Pending',
              icon: hasFiles
                ? 'https://cdn-icons-png.flaticon.com/128/5290/5290109.png'
                : 'https://cdn-icons-png.flaticon.com/128/8213/8213126.png',
              designYearId: item.designYearId,
              uploadedBy: item.uploadedBy,
              files: item.files,
              sequence: sequence,
              displayName: displayName,
              fileName: file?.name || null,
            } as FYItem;
          });
        }
        this._loaderService.stopLoader();
      },
      error: (err) => {
        console.error('Failed to load budget years:', err);
        this.snackBar.open('Failed to load data', 'Dismiss', { duration: 3000 });
      },
    });

    this.budgetuploadservice.getValidationConfig().subscribe({
      next: (res: any) => {
        if (res.status && res.data) {
          this.uploadConfig = res.data.uploadComponentConfig;
          this.validations = res.data.validations;
        } else {
          this.snackBar.open('Validation config not found.', 'Dismiss', { duration: 3000 });
        }
      },
      error: (err) => {
        console.error('Error loading validation config:', err);
        this.snackBar.open('Error loading validations.', 'Dismiss', { duration: 3000 });
      }
    });
  }
  onUrlInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pastedUrl = input.value;
    // Optionally: validate or debounce here
  }
  get colClass(): string {
    const cols = Math.floor(12 / this.fyList.length);
    return `col-6 col-sm-${cols}`;
  }
  get selectedItem(): FYItem | null {
    if (!this.fyList || this.fyList.length === 0) {
      return null;
    }
    return this.fyList[this.selectedIdx];
  }
  /** Handle card click */
  selectYear(i: number): void {
    this.selectedIdx = i;
    this.uploadError = '';         // clear previous errors
  }
  get doneYears(): string[] {
    if (!this.fyList || !Array.isArray(this.fyList)) return [];

    return this.fyList
      .filter(item => item.status === 'Done' || item.status === 'Uploaded')
      .map(item => item.fy)
      .sort((a, b) => a.localeCompare(b));
  }
  showUploadError(message: string): void {
    this.snackBar.open(message, '', {
      duration: 4000,                 // auto-hide in 4 sec
      horizontalPosition: 'end',      // right-side
      verticalPosition: 'top',     // bottom of screen
      panelClass: ['snackbar-error']  // optional custom styling
    });
  }
  showSuccess(message: string): void {
    this.snackBar.open(message, '', {
      duration: 4000,                 // auto-hide in 4 sec
      horizontalPosition: 'end',      // right-side
      verticalPosition: 'top',     // bottom of screen
      panelClass: ['snackbar-success']  // optional custom styling
    });
  }
  /** File selected via input */
  onFileSelected(ev: Event): void {

    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const fileType = file.type;
    const fileSize = file.size;
    const allowedTypes = this.validations.find(v => v.name === 'fileType')?.validator || [];
    const maxSize = this.validations.find(v => v.name === 'maxFileSize')?.validator || 20971520;
    const maxCount = this.validations.find(v => v.name === 'maxFileCount')?.validator || 1;

    if (!allowedTypes.includes(fileType)) {
      this.showUploadError('Only PDF files are allowed.');
      input.value = '';
      this.isFileValid = false;

      return;
    }

    if (fileSize > maxSize) {
      this.showUploadError('File size must be ≤ 20 MB.');
      input.value = '';
      this.isFileValid = false;

      return;
    }
    // this.uploadedFile = file;
    // this.uploadedFileName = file.name;
    // // Extract base name (without path)
    // const originalName = file.name;

    // // Add selected FY prefix
    // const fyPrefix = this.selectedItem?.fy?.replace(/\s+/g, '_') || 'FY_unknown'; // e.g., "FY_2023-24"
    // const newFileName = `${fyPrefix}_${originalName}`;
    this.budgetuploadservice.getSignedUrl(file, this.selectedItem.fy).subscribe({
      next: async (res: any) => {
        try {
          this._loaderService.showLoader();
          const s3Data = res.data[0];

          // Upload binary to S3 using fetch
          await this.budgetuploadservice.uploadToS3(s3Data.url, file);

          // ✅ Success
          this.uploadedFile = file;
          this.uploadedFileUrl = s3Data.file_url;
          this.uploadedFilePath = s3Data.path;
          const originalAlias = s3Data.file_alias; 
          const trimmedName = originalAlias.split('_')[0] + '.pdf';
          this.uploadedFileName = trimmedName;
          this.isFileValid = true;
          this.uploadError = '';
          this._loaderService.stopLoader();
          // this.snackBar.open('File uploaded successfully.', 'Dismiss', { duration: 3000 });

        } catch (err) {
          console.error('Upload failed:', err);
          this.showUploadError('Failed to upload file to S3.');
          this.isFileValid = false;
        }
      },
      error: err => {
        console.error('Failed to get signed URL:', err);
        this.showUploadError('Could not get upload URL.');
        this.isFileValid = false;
      }
    });
    console.log('New file name:', this.uploadedFile);
    this.uploadedFileUrl = URL.createObjectURL(file);
    this.isFileValid = true;
    this.uploadError = '';
    input.value = ''; // optional
  }
  submitFile(): void {
    this._loaderService.showLoader();
    if (!this.isFileValid || !this.uploadedFile || !this.uploadedFileUrl || !this.uploadedFileName) {
      this.showUploadError('No valid file to submit.');
      this._loaderService.stopLoader();
      return;
    }

    const userDataStr = localStorage.getItem('userData');
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    const ulb = userData?.ulb;
    const uploadedBy = userData?._id;

    if (!ulb || !uploadedBy) {
      this.showUploadError('ULB or user ID missing.');
      return;
    }

    const selected = this.selectedItem;

    const payload = {
      yearsData: [
        {
          designYearId: selected.designYearId,
          designYear: selected.fy.replace('FY ', ''),
          currentFormStatus: 1,
          sequence: selected.sequence || 6,
          uploadedBy,
          files: [
            {
              source: 'ulb',
              type: 'pdf',
              url: this.uploadedFilePath,
              name: this.uploadedFileName,
              created_at: new Date().toISOString()
            }
          ]
        }
      ]
    };

    this.budgetuploadservice.updatePdfs(ulb, payload).subscribe({
      next: (res: any) => {
        this._loaderService.showLoader();
        this.showSuccess('File submitted successfully!');
        // this.snackBar.open('File submitted successfully!', 'Dismiss', { duration: 3000 });
        this.isFileValid = false;
        this.uploadedFile = null;
        this.uploadedFileName = null;
        this.uploadedFileUrl = null;
        this.ngOnInit(); // Refresh data
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this._loaderService.stopLoader();
      },
      error: (err) => {
        console.error('Submit error:', err);
        this.showUploadError('Failed to submit the file.');
        this._loaderService.stopLoader();
      }
    });
  }

  previewUploadedFile(): void {
    if (!this.uploadedFileUrl) return;

    const link = document.createElement('a');
    link.href = this.uploadedFileUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.click();
  }

  removeUploadedFile(): void {
    this.uploadedFile = null;
    this.uploadedFileName = null;
    this.uploadedFileUrl = null;
    this.isFileValid = false;
  }
  /** Drag & drop support */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.simulateInputChange(file);
    }
  }

  /** Simulate file selection from drop event */
  simulateInputChange(file: File): void {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    const input = document.getElementById('fileInput') as HTMLInputElement;
    input.files = dataTransfer.files;
    this.onFileSelected({ target: input } as unknown as Event);
  }

  isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }
  saveUrl(): void {
    if (!this.isValidUrl(this.pastedUrl)) {
      this.snackBar.open('Invalid URL. Please check and try again.', 'Dismiss', { duration: 3000 });
      return;
    }
    const userDataStr = localStorage.getItem('userData');
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    const ulb = userData?.ulb;
    const uploadedBy = userData?._id;
    const selected = this.selectedItem;
    const filePayload = {
      source: 'ulb',
      type: 'url',
      url: this.pastedUrl,
      name: this.pastedUrl,
      created_at: new Date().toISOString()
    };

    const body = {
      yearsData: [
        {
          designYearId: selected.designYearId,
          designYear: selected.fy.replace('FY ', ''),
          source: ulb,
          currentFormStatus: 1,
          sequence: selected.sequence,
          uploadedBy: uploadedBy,
          files: [filePayload]
        }
      ]
    };

    this.budgetuploadservice.updatePdfs(ulb, body).subscribe({
      next: () => {
        this.snackBar.open('URL saved successfully!', 'Dismiss', { duration: 3000 });
        this.pastedUrl = '';
        this.ngOnInit();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.error('Failed to save URL:', err);
        this.snackBar.open('Save failed.', 'Dismiss', { duration: 3000 });
      }
    });
  }

}
