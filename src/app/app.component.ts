import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';

import { GlobalLoaderService } from './shared/services/loaders/global-loader.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "PerfectAngular";

  showLoader = false;

  constructor(public globalLoader: GlobalLoaderService) {
    this.globalLoader
      .observerLoading()
      .pipe(delay(100))
      .subscribe(loadingStatus => {
        this.showLoader = loadingStatus;
      });
  }
}
