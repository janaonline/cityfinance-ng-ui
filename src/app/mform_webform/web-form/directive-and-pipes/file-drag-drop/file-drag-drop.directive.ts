import { Directive, HostListener, HostBinding, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[fileDragDrop]'
})

export class FileDragDropDirective {
  //@Input() private allowed_extensions : Array<string> = ['png', 'jpg', 'bmp'];
  @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
  //@Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#eee';
  @HostBinding('style.border') private borderStyle = '2px dashed';
  @HostBinding('style.border-color') private borderColor = '#696D7D';
  @HostBinding('style.border-radius') private borderRadius = '5px';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'lightgray';
    this.borderColor = '#60daaa';
    this.borderStyle = '3px solid';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    this.borderColor = '#696D7D';
    this.borderStyle = '2px dashed';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: any) {
    console.log('onDrop', evt)
    console.log('target', evt.target.value)
    console.log('dataTransfer', evt.dataTransfer.files)
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    this.borderColor = '#696D7D';
    this.borderStyle = '2px dashed';
    // debugger;
    let files = evt.dataTransfer.files;
    let valid_files : Array<File> = files;
    this.filesChangeEmiter.emit(valid_files);
  }
}