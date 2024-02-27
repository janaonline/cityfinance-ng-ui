import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-assessment-parameters',
  templateUrl: './assessment-parameters.component.html',
  styleUrls: ['./assessment-parameters.component.scss']
})
export class AssessmentParametersComponent implements OnInit {

  @Output() onGuidelinesPopup = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

}
