import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numericCommaSeparator]'
})
export class NumericCommaSeparatorDirective {
  private regex: RegExp = new RegExp(/^[0-9a-zA-z]+(,[0-9a-zA-z]+){0,11}$/g);

    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home' ];
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9\,]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
