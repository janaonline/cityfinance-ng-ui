import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/mform_webform/web-form/snack-bar/snack-bar.component';

@Directive({
  selector: '[appMinMaxRestriction]'
})
export class MinMaxRestrictionDirective {
  @Input('appMinMaxRestriction') minValue: any;
  @Input() maxValue: any;
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    // 'Paste',
  ];
// calculating the length from maxValue and restrict from entering beyond allowed length;
  constructor(private el: ElementRef, private snackBar: MatSnackBar) { }
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent | any) {

    if (
      this.navigationKeys.indexOf(event.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      ((event.key === 'a' || event.code === 'KeyA') && event.ctrlKey === true) || // Allow: Ctrl+A
      ((event.key === 'c' || event.code === 'KeyC') && event.ctrlKey === true) || // Allow: Ctrl+C
      ((event.key === 'v' || event.code === 'KeyV') && event.ctrlKey === true) || // Allow: Ctrl+V
      ((event.key === 'x' || event.code === 'KeyX') && event.ctrlKey === true) || // Allow: Ctrl+X
      ((event.key === 'a' || event.code === 'KeyA') && event.metaKey === true) || // Allow: Cmd+A (Mac)
      ((event.key === 'c' || event.code === 'KeyC') && event.metaKey === true) || // Allow: Cmd+C (Mac)
      ((event.key === 'v' || event.code === 'KeyV') && event.metaKey === true) || // Allow: Cmd+V (Mac)
      ((event.key === 'x' || event.code === 'KeyX') && event.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }
    const inputElement: HTMLInputElement = this.el.nativeElement;
    // Check the type of the input element
    const inputType = inputElement.type;
    if (inputType != 'number') return;
    let allowedLength = (this.maxValue.toString()).length;
    let inputDigit = event.target['value'].split('.')[0];
    let length: any = inputDigit.length + 1;
    if (event.keyCode == 8 || event.keyCode == 9) return;
    if (allowedLength && length > allowedLength) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {

    const inputElement: HTMLInputElement = this.el.nativeElement;
    // Check the type of the input element
    const inputType:any = inputElement.type;
    const pastedText = event.clipboardData?.getData('text') || '';

    if (pastedText?.length > this.maxValue && inputType == 'text') {
      event.preventDefault();
      this.el.nativeElement.value = '';
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: [`Upto ${this.maxValue} is allowed`],
        duration: 3000
      });
    }else if(inputType == 'number') {
      event.preventDefault();
      this.el.nativeElement.value = '';
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: [`Paste is not allowed`],
        duration: 3000
      });
      
    }
  }
}