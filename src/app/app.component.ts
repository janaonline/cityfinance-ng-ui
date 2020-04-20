import { Component, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';

import { GlobalLoaderService } from './shared/services/loaders/global-loader.service';
import { SessionService } from './shared/services/session/session.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
  title = "PerfectAngular";

  showLoader = false;
  sessionId: string;

  constructor(public globalLoader: GlobalLoaderService, private sessionService: SessionService) {
    this.startSession();
    this.globalLoader
      .observerLoading()
      .pipe(delay(100))
      .subscribe(loadingStatus => {
        this.showLoader = loadingStatus;
      });
  }



  private startSession() {
    this.sessionService.generateSessionID().subscribe(res => {
      this.sessionId = res['data']._id;
    })
  }

  ngOnDestroy(): void {
    this.sessionService.endSession(this.sessionId).subscribe(res => {
    
   })
   }
}
