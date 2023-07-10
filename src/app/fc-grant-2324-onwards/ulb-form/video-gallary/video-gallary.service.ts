import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

export interface Video {
  link: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoGallaryService {

  constructor(
    private http: HttpClient
  ) { }

  getVideos() {
    return this.http.get<{data: Video[]}>(`${environment.api.url}/video-gallary/list`);
  }

}
