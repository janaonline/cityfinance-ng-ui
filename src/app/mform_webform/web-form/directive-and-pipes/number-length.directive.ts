import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberLength]'
})

export class NumberLengthDirective {
  @Input() appNumberLength: any;

  constructor() { }
  @HostListener("keydown", ["$event"]) onKeydown(event: KeyboardEvent | any) {
  // console.log(event.target['value'])
  let length: any = event.target['value'].toString().length + 1
  // console.log(event)
  // console.log(event.keyCode)
  // console.log(this.appNumberLength)
  if(event.keyCode == 8 || event.keyCode == 9) return
  if(length>this.appNumberLength){
    event.preventDefault()
  }
  }
}