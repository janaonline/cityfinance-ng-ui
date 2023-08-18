import { Directive, HostListener, Input } from '@angular/core';

const multiplicationFactor = 0.125;

@Directive({
  selector: '[appScrollTable]'
})
export class ScrollTableDirective {
  @Input() appScrollTable: any;

  constructor() { }

  @HostListener('wheel', ['$event']) onClick(e: WheelEvent) {
    if (this.appScrollTable.scrollIndex === undefined) {
      this.appScrollTable.scrollIndex = 0;
    }

    this.appScrollTable.scrollIndex =  Math.range(
      this.appScrollTable.scrollIndex + (e.deltaY * multiplicationFactor),
      0,
      this.appScrollTable.childQuestionData?.length - 20
    );
  }
}
