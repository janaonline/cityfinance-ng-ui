import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input'
})
export class NumericInputDirective {

  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {

    if(this.el.nativeElement.type != 'number') return;
    const allowedKeys = [8, 9, 27, 13]; // Backspace, Tab, Escape, Enter

    if (allowedKeys.includes(event.keyCode)) {
      return;
    }

    const inputChar = String.fromCharCode(event.keyCode);
    const pattern = /^[0-9]*$/;

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
