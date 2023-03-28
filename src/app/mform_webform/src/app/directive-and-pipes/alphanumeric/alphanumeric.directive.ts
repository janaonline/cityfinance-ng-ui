import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphanumeric]'
})
export class AlphanumericDirective {

  constructor() { }
  @HostListener("keydown", ["$event"]) onKeydown(event: KeyboardEvent | any) {
        let pattern = /^[a-zA-Z0-9]*$/;
       let result = pattern.test(event.key.toString());
        if(!result){
          event.preventDefault();
        }
  }
}
