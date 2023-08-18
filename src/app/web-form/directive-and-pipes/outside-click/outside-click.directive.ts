import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {

  constructor(private _elementRef: ElementRef) { }

  @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement: any) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    console.log('clickedInside', clickedInside)
    if (!clickedInside) {
      this.clickOutside.emit(clickedInside);
    }
  }

}
