import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-deletable',
  templateUrl: './select-deletable.component.html',
  styleUrls: ['./select-deletable.component.scss']
})
export class SelectDeletableComponent implements OnInit {

  options: any[] = [];

  count: number;

  selectedIds: number[] = [];

  constructor(
    private dialogRef: MatDialogRef<SelectDeletableComponent>, 
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.options = data.options;
    this.count = data.count;
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  isChecked(optionId: number): boolean {
    return this.selectedIds.includes(optionId);
  }

  toggleSelection(optionId: number): void {
    if (this.selectedIds.includes(optionId)) {
      this.selectedIds = this.selectedIds.filter(id => id !== optionId);
    } else {
      this.selectedIds.push(optionId);
    }
  }

  cancel() {
    this.dialogRef.close()
  }
  deleteSelected() {
    this.dialogRef.close(this.selectedIds);
  }
}
