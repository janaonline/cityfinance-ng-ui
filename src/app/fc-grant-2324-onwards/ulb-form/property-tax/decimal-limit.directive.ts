import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDecimalLimit]'
})
export class DecimalLimitDirective {
  @Input() appDecimalLimit: number;

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    console.log(event.key);
    if(this.appDecimalLimit == 0 && event.key == '.') return event.preventDefault();
    const inputValue = this.el.nativeElement.value;
    const eventValue = parseInt(event.key);
    if (isNaN(eventValue)) {
      return;
    }
    const decimal = inputValue.split('.')?.[1];
    
    console.log(decimal?.length, this.appDecimalLimit);
    if (decimal?.length >= this.appDecimalLimit) {
      event.preventDefault();
    }
  }
}
