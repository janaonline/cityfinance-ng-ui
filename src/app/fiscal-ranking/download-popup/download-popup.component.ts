import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-download-popup',
  templateUrl: './download-popup.component.html',
  styleUrls: ['./download-popup.component.scss']
})
export class DownloadPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _router: Router,
    private renderer: Renderer2
  ) { }
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  ngOnInit(): void {
    if(this.data?.key == 'video') this.playVideo(this.data?.videos[0])
  }
   async simpleDownload(url){
    const link = this.renderer.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', `${url}`);
      link.setAttribute('download', 'City Finance Rankings 2022_Draft Guidelines.pdf');
    //  link.download = `City Finance Rankings 2022_Draft Guidelines.pdf`
      link.click();
      link.remove();

  }
  closeDia(){
    this.dialog.closeAll();
  }
  
  
  playVideo(video){
      for(let item of this.data.videos){
        let myVideo: any = document.getElementById(`${item?.id}`);
       if(item.isActive) myVideo.pause();
        item.isActive = false;
      }
     video.isActive = true;
    let myVideo: any = document.getElementById(`${video?.id}`);
    if(video.isActive)  myVideo.play();
     
  }
}
