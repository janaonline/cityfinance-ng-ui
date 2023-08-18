import { Directive, HostListener, ElementRef, Input } from "@angular/core";
import { blockChar } from '../../models/restrict-char/restrict-char';
@Directive({
  selector: "[appAlphabetOnly]",
})
export class AlphabetOnlyDirective {
  key: any;
  @Input() appAlphabetOnly: any;

  blockChar: any = blockChar;

  @HostListener("keydown", ["$event"]) onKeydown(event: KeyboardEvent | any) {
    this.key = event.keyCode;
    let arr;
    let isString = false;
    // let getVal: any = event.target['value'];
    let block:any;
    if (this.appAlphabetOnly.hasOwnProperty('isRestricted')) {
      block = [...this.blockChar, ...this.appAlphabetOnly.restrictChar];
    } else {
      if(this.appAlphabetOnly && this.appAlphabetOnly.length){
         block = this.blockChar
        block = block.filter((el: any) => this.appAlphabetOnly.indexOf( el ) < 0);
      }else{
         block= this.blockChar;
      }
    }
    let str = block.join("").toString();
    let isText = str.includes(event.key);
    if (isText) {
      event.preventDefault();
    }
   
  }
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent){
    if (this.appAlphabetOnly.hasOwnProperty('restrictCopyPaste') && this.appAlphabetOnly.restrictCopyPaste) {
      e.preventDefault();
    }
    // e.preventDefault() 

      // const isRestrictPasteExist = this.appAlphabetOnly.find(item => item == '####') 
      // if (isRestrictPasteExist) {
      //   e.preventDefault() 
      // }
  }
}
