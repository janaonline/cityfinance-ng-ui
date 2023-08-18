import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableNagetive]'
})
export class DisableNagetiveDirective {
  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    console.log('appDisableNagetive', event.key);
    if(event.key == '-') return event.preventDefault();
  }
}
