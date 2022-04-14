import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';
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
  iFrameElement:any;
  copyMessage:boolean = false;
  iFrameData: any;
  constructor(
    public dialogRef: MatDialogRef<RevenuechartComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    ) { 
      console.log('ShareDialogComponent', data)
      this.iFrameData = data;
    }

  ngOnInit(): void {
    this.createIframe();
  }


  onClose() {
    this.dialogRef.close();
  }
  
  changeSize(event){
   console.log(event.target.value);
   let findObject = this.iFrameSize.find(item=> item.code == event.target.value);
   console.log(findObject);
   this.createIframe(findObject.width, findObject.height);
  }

  createIframe(width='720px',height='480px'){
   this.iFrameElement = `<iframe width="${width}" height="${height}" src="${this.iFrameData?.iFrameSrc}" frameborder="0" ></iframe>`
   console.log(this.iFrameElement)
  }

  copyIframeLink(inputElement){
    const copyMessage = 'Code Copied!'
    this.commonService.copyToClipboard(this.iFrameElement, copyMessage);

    // inputElement.select();
    // document.execCommand('copy');
    // inputElement.setSelectionRange(0, 0);
    // this.copyMessage =true;
    // setTimeout(() =>{
    //   this.copyMessage =false
    // },2000)
  }
}