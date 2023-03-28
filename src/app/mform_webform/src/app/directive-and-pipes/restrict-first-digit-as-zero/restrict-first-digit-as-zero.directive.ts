import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRestrictFirstDigitAsZero]'
})
export class RestrictFirstDigitAsZeroDirective {
  /* This is a regular expression that will match any number that starts with a 1-9 and has any number of
  digits after it. */
  // restrictionPattern = RegExp('[1-9]{1}[0-9]*');
  @Input() appRestrictFirstDigitAsZero: boolean = true;

  constructor(
    // private _el: ElementRef
  ) { }

  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent | any) {
/* Preventing the user from entering the first digit as zero. */
    if (this.appRestrictFirstDigitAsZero) {
      let cursorValue: any = event['target']['value'];
      if ((event['key'] == '0') && (!cursorValue || cursorValue == '0') && (cursorValue?.length == 0)) {
        event.preventDefault();
      }
    }
  }
}
