import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[allowTwoDecimal]",
})
export class AllowTwoDecimal {
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^\d{0,6}\.?\d{0,2}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [
    "Backspace",
    "Tab",
    "End",
    "Home",
    "-",
    "ArrowLeft",
    "ArrowRight",
    "Del",
    "Delete",
  ];

  constructor(private el: ElementRef) {}
  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    console.log(this.el.nativeElement.value);
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [
      current.slice(0, position),
      event.key == "Decimal" ? "." : event.key,
      current.slice(position),
    ].join("");
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    let current: string = this.el.nativeElement.value;
    console.log(current);
    setTimeout(() => {
      let current = +this.el.nativeElement.value;

      current.toFixed(2);
      console.log(current.toFixed(2));
    }, 1000);
  }
}
