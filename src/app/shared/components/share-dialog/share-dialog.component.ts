import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RevenuechartComponent } from '../revenuechart/revenuechart.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {
  iFrameSize = [
    {name: 'Small 720×480', code: 'small', width: '720px',height:'480px'},
    {name: 'Large 1440×1080', code: 'large', width: '1440px',height:'1080px'},
    {name: 'Fullscreen', code: 'fullscreen', width: '100%',height:'100%'},
  ];
  src="https://datausa.io/profile/naics/oil-gas-extraction/workforce/monthly-employment?viz=true"
  iFrame:any;
  copyMessege:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<RevenuechartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.createIframe();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  
  changeSize(event){
   console.log(event.target.value);
   let findObject = this.iFrameSize.find(item=> item.code == event.target.value);
   console.log(findObject);
   this.createIframe(findObject.width,findObject.height);
  }

  createIframe(width='720px',height='480px'){
   this.iFrame = `<iframe width="${width}" height="${height}" src="${this.src}" frameborder="0" ></iframe>`
   console.log(this.iFrame)
  }
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.copyMessege =true;
    setTimeout(() =>{
      this.copyMessege =false
    },2000)
  }


  copyText(val: string){
  let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}