import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appDisabledDirective]'
})
export class DisabledDirectiveDirective {
  @Input() appDisabledDirective: boolean = false;

  subscription = new Subscription();

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    const el = this.elRef.nativeElement;
    this.subscription = fromEvent(el.parentNode, 'click', { capture: true }).subscribe((e: any) => {
      if (e.target === el) {
        e.stopPropagation()
      }
    }); 
  }


  @HostListener("keydown", ["$event"]) onKeydown(event: KeyboardEvent) {
    if(!this.appDisabledDirective){
      event.preventDefault();
    }
    }
}
