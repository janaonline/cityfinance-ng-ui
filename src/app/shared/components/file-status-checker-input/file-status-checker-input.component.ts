import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

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
export class FileStatusCheckerInputComponent implements OnInit {

  @Input('config') config: IFileStatusCheckerInputComponent;
  @Output('fileButtonClicked') fileButtonClicked: EventEmitter<string[]> = new EventEmitter();

  constructor() {

  }


  ngOnInit() {
    console.log(this.config.formGroup);
  }

  fileButtonClickHandler(formGroupNameKey: string, fileUrl: string) {
    this.fileButtonClicked.emit([formGroupNameKey, fileUrl]);
  }

  radioButtonClickHandler() {

  }
}
