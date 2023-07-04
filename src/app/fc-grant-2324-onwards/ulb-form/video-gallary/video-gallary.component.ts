import { Component, OnInit } from '@angular/core';
import { Video, VideoGallaryService } from './video-gallary.service';

@Component({
  selector: 'app-video-gallary',
  templateUrl: './video-gallary.component.html',
  styleUrls: ['./video-gallary.component.scss']
})
export class VideoGallaryComponent implements OnInit {

  videos: Video[] = [];

  constructor(
    private videoGallaryService: VideoGallaryService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.videoGallaryService.getVideos().subscribe(res => {
      this.videos = res.data;
    })
  }

}
