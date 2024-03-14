import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Directive({
  selector: '[appNumberLength]'
})

export class NumberLengthDirective {
  @Input() appNumberLength: any;

  constructor(private el: ElementRef) { }
  @HostListener("keydown", ["$event"]) onKeydown(event: KeyboardEvent | any) {
  // console.log(event.target['value'])
  let length: any = event.target['value'].toString().length + 1;
  if(event.keyCode == 8 || event.keyCode == 9) return
  if(length>this.appNumberLength){
    event.preventDefault();
  }
  }
}

// directive for restriction of pasting the value outside range
@Directive({
  selector: '[appMinMaxRangeCheckOnPaste]'
})
export class MinMaxRangeCheckOnPasteDirective {
  @Input() appMinMaxRangeCheckOnPaste: { minRange: number, maxRange: number } | undefined;
  constructor(private el: ElementRef, private snackBar: MatSnackBar) { }

  @HostListener("paste", ["$event"]) onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
      // Ensure pasted text is a valid number
      if (!isValidNumber(pastedText)) {
        event.preventDefault();
        this.el.nativeElement.value = '';
        return;
      }
    // Attempt to parse the pasted text as a number
    const pastedNumber = parseFloat(pastedText);
    
    // Check if parsed number is within the specified range
    if (!isNaN(pastedNumber) && (
      (this.appMinMaxRangeCheckOnPaste?.minRange !== undefined && pastedNumber < this.appMinMaxRangeCheckOnPaste?.minRange) ||
      (this.appMinMaxRangeCheckOnPaste?.maxRange !== undefined && pastedNumber > this.appMinMaxRangeCheckOnPaste?.maxRange)
    )) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: [`Upto ${(this.appMinMaxRangeCheckOnPaste?.maxRange)} is allowed`],
        duration: 3000
      });
      this.el.nativeElement.value = '';
      event.preventDefault();
    }
  }

   
}

function isValidNumber(text: string): boolean {
  // Allow values like "1 to 9"
  const regex = /^[1-9][0-9]*$/;
  return regex.test(text);
}


