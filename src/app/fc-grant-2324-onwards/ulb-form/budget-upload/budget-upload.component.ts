import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
interface FYItem {
  fy: string;
  status: 'Pending' | 'Draft' | 'Uploaded' | 'Done' | 'Warning';
  icon: string;
  fileName?: string;          // filled when uploaded
}
@Component({
  selector: 'app-budget-upload',
  templateUrl: './budget-upload.component.html',
  styleUrls: ['./budget-upload.component.scss']
})
export class BudgetUploadComponent implements OnInit {
  constructor(private http: HttpClient,private snackBar: MatSnackBar) { }
fyList: FYItem[] = [
    {
      fy: 'FY 2021-22',
      status: 'Done',
      icon: 'https://cdn-icons-png.flaticon.com/128/5290/5290109.png'
    },
    {
      fy: 'FY 2022-23',
      status: 'Pending',
      icon: 'https://cdn-icons-png.flaticon.com/128/8213/8213126.png'
    },
    {
      fy: 'FY 2023-24',
      status: 'Pending',
      icon: 'https://cdn-icons-png.flaticon.com/128/8213/8213126.png'
    },
    {
      fy: 'FY 2024-25',
      status: 'Done',
      icon: 'https://cdn-icons-png.flaticon.com/128/5290/5290109.png'
    },
     {
      fy: 'FY 2025-26',
      status: 'Done',
      icon: 'https://cdn-icons-png.flaticon.com/128/5290/5290109.png'
    },
  ];
  selectedIdx = 0;                 // first year pre-selected
  allowedFileTypeStr = 'application/pdf';
  uploadedFileName: string | null = null;
  uploadedFileUrl: string | null = null;
uploadedFile: File | null = null;
  uploadError: string = '';
  isDragging = false;
   isFileValid = false;
  get colClass(): string {
    const cols = Math.floor(12 / this.fyList.length);
    return `col-6 col-sm-${cols}`;
  }
   /** Currently selected card object */
  get selectedItem(): FYItem {
    return this.fyList[this.selectedIdx];
  }

  /** Handle card click */
  selectYear(i: number): void {
    this.selectedIdx = i;
    this.uploadError = '';         // clear previous errors
  }
get doneYears(): string[] {
  return this.fyList
    .filter(item => item.status === 'Done' || item.status === 'Uploaded')
    .map(item => item.fy)
    .sort((a, b) => a.localeCompare(b)); // Sort descending if needed
}
showUploadError(message: string): void {
    this.snackBar.open(message, '', {
      duration: 4000,                 // auto-hide in 4 sec
      horizontalPosition: 'end',      // right-side
      verticalPosition: 'top',     // bottom of screen
      panelClass: ['snackbar-error']  // optional custom styling
    });
  }
  /** File selected via input */
 onFileSelected(ev: Event): void {
  const input = ev.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (file.type !== 'application/pdf') {
    this.showUploadError('Only PDF files are allowed.');
    input.value = '';
    this.isFileValid = false;
    return;
  }

  if (file.size > 20 * 1024 * 1024) {
    this.showUploadError('File size must be ≤ 20 MB.');
    input.value = '';
    this.isFileValid = false;
    return;
  }

  this.uploadedFile = file;
  this.uploadedFileName = file.name;
   // Extract base name (without path)
  const originalName = file.name;

  // Add selected FY prefix
  const fyPrefix = this.selectedItem?.fy?.replace(/\s+/g, '_') || 'FY_unknown'; // e.g., "FY_2023-24"
  const newFileName = `${fyPrefix}_${originalName}`;
  console.log('New file name:', newFileName);
  this.uploadedFileUrl = URL.createObjectURL(file);
  this.isFileValid = true;
  this.uploadError = '';
  input.value = ''; // optional
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
  ngOnInit(): void {
  }

}
