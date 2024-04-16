import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMinMaxRestriction]'
})
export class MinMaxRestrictionDirective {
    @Input('appMinMaxRestriction') minValue:any;
    @Input() maxValue:any;
    
    constructor(private el: ElementRef) { }
    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent | any) {
    let allowedLength = (this.maxValue.toString()).length;
      console.log('Keyup event triggered');
     let inputDigit = event.target['value'].split('.')[0];
    let length: any = inputDigit.length + 1;
      if(event.keyCode == 8 || event.keyCode == 9) return
      if(length > allowedLength){
        event.preventDefault();
      }
    }
  }