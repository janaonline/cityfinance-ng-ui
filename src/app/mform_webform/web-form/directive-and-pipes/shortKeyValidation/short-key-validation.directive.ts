import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appShortKeyValidation]'
})
export class ShortKeyValidationDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^a-z0-9A-Z\_]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
