import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UPLOAD_STATUS} from '../../../util/enums';

export interface IFileStatusCheckerInputComponent {
  formGroupName: string,
  status: 'completeness' | 'correctness',
  messageFormControlKey: string
  formGroup: FormGroup,
}

@Component({
  selector: 'app-file-status-checker-input',
  templateUrl: './file-status-checker-input.component.html',
  styleUrls: ['./file-status-checker-input.component.scss']
})
export class FileStatusCheckerInputComponent implements OnInit, AfterViewInit {

  @Input('config') config: IFileStatusCheckerInputComponent;
  @Output('fileButtonClicked') fileButtonClicked: EventEmitter<string[]> = new EventEmitter();
  showMessageInput = false;

  constructor() {

  }


  ngOnInit() {
    const value = this.config.formGroup.get([this.config.formGroupName, this.config.status]).value;
    if (value) {
      this.showMessageInput = value.toUpperCase() === UPLOAD_STATUS.REJECTED;
      this.config.formGroup.updateValueAndValidity();
    }
    const formControlValueObserver = this.config.formGroup.get([this.config.formGroupName, this.config.status]).valueChanges;
    formControlValueObserver.subscribe(value => {
      if (value) {
        this.showMessageInput = value.toUpperCase() === UPLOAD_STATUS.REJECTED;
        this.config.formGroup.updateValueAndValidity();
      }
    });
  }

  fileButtonClickHandler(formGroupNameKey: string, fileUrl: string) {
    this.fileButtonClicked.emit([formGroupNameKey, fileUrl]);
  }

  radioButtonClickHandler(event: Event) {
    const formControlValue = this.config.formGroup.get([this.config.formGroupName, this.config.status]).value;
    this.showMessageInput = formControlValue && formControlValue.toUpperCase() === UPLOAD_STATUS.REJECTED;
    this.config.formGroup.get([this.config.formGroupName, this.config.messageFormControlKey]).reset();
    this.config.formGroup.updateValueAndValidity();
  }

  ngAfterViewInit(): void {

  }
}
