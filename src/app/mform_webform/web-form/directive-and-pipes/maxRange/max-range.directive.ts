import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';

const DUR_MAXIMUM_PROJECT_SUPPORT = 1000;
@Directive({
  selector: '[appMaxRange]'
})
export class MaxRangeDirective {
  @Input() appMaxRange: any;
  @Input() questionData: any;

  constructor(private el: ElementRef, private snackBar: MatSnackBar) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {

    const inputValue = this.el.nativeElement.value;
    const newValue = this.transformNumber(+inputValue) as number;

    if (inputValue > this.appMaxRange?.maxRange || this.maxAllowDurProjects(+event.target.value)) {
      this.el.nativeElement.value = newValue;
      event.stopPropagation();
    }
  }

  maxAllowDurProjects(newValue: number) {
    const { shortKey, forParentValue } = this.appMaxRange;
    if(!['wm_numberOfProjects', 'sw_numberOfProjects'].includes(shortKey)) return false;
    console.log('maxAllowDurProjects', this.questionData);
    const wmSum = this.questionData.find(question => question.shortKey == "waterManagement_tableView")
      ?.childQuestionData.reduce((sum, row) => row?.[2]?.visibility ? (sum + (+row?.[2]?.modelValue || 0)) : 0, 0)

    const swmSum = this.questionData.find(question => question.shortKey == "solidWasteManagement_tableView")
      ?.childQuestionData.reduce((sum, row) => row?.[2]?.visibility ? (sum + (+row?.[2]?.modelValue || 0)) : 0, 0)


    let a = this.getChildQuestionValue('waterManagement_tableView', shortKey, forParentValue)
    let b = this.getChildQuestionValue('solidWasteManagement_tableView', shortKey, forParentValue)
    const sum = wmSum + swmSum + newValue - a - b;

    return sum > DUR_MAXIMUM_PROJECT_SUPPORT;
    console.log('maxAllowDurProjects', sum);
  }

  getChildQuestionValue(parentShortKey, shortKey, forParentValue) {
    const value = +this.questionData?.find(q => q.shortKey == parentShortKey)?.childQuestionData?.[forParentValue - 1]?.find(child => child.shortKey == shortKey)?.modelValue;
    return value || 0;
  }

  transformNumber(num: number) {
    let [integer, decimal] = num.toString().split('.');
    integer = integer.substring(0, integer.length - 1);
    if (decimal == undefined) return integer;
    return +[integer, decimal].join('.');
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const allowDecimal = +this.el.nativeElement.getAttribute('ng-reflect-app-decimal-limit')
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    let positiveNumber: any = Math.abs(parseFloat(pastedText));
    if (allowDecimal == 0) {
      positiveNumber = +('' + positiveNumber).split('.')[0];
    }
    if (positiveNumber > this.appMaxRange?.maxRange || this.maxAllowDurProjects(+positiveNumber)) {
      positiveNumber = '';
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: [`Upto ${this.appMaxRange?.maxRange} is allowed`],
        duration: 3000
      });
    }
    this.el.nativeElement.value = '' + positiveNumber;
  }
}

