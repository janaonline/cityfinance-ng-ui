import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRestrictFirstCharAsSpace]'
})
export class RestrictFirstCharAsSpaceDirective {
  key: any;
  constructor(private _el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent | any) {
    const initalValue = this._el.nativeElement.value.trim();
    // console.log('initalValue',initalValue)
    // console.log('event', event)
    // console.log('nativeElement', this._el.nativeElement)
    let cursorPosition: any = event.target && event.target['selectionStart'];
    // console.log('cursorPosition', cursorPosition)
    this.key = event.keyCode;
    // if ((this.key === 32) && (initalValue.length === 0)) {
    //   event.preventDefault();
    // }
    if ((cursorPosition == 0) && (this.key === 32)) {
      event.preventDefault();
    }
  }
}
