import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMinMaxRestriction]'
})
export class MinMaxRestrictionDirective {
  @Input('appMinMaxRestriction') minValue: any;
  @Input() maxValue: any;
// calculating the length from maxValue and restrict from entering beyond allowed length;
  constructor(private el: ElementRef) { }
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent | any) {
    const inputElement: HTMLInputElement = this.el.nativeElement;
    // Check the type of the input element
    const inputType = inputElement.type;
    if (inputType != 'number') return;
    let allowedLength = (this.maxValue.toString()).length;
    let inputDigit = event.target['value'].split('.')[0];
    let length: any = inputDigit.length + 1;
    if (event.keyCode == 8 || event.keyCode == 9) return;
    if (allowedLength && length > allowedLength) {
      event.preventDefault();
    }
  }
}