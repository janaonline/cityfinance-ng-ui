import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: "app-completed",
  templateUrl: "./completed.component.html",
  styleUrls: ["./completed.component.scss"],
})
export class CompletedComponent implements OnInit {
  @Input() submitted = false;
  @Input() customMessage: string;
  @Output()
  showOld = new EventEmitter();
  @Output() previous: EventEmitter<boolean> = new EventEmitter();
  @Output() preview: EventEmitter<boolean> = new EventEmitter();

  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  submitClicked = false;

  constructor() {}

  ngOnInit() {}

  onSubmitClicked() {
    this.submitClicked = true;
    this.submit.emit(true);
  }
}
