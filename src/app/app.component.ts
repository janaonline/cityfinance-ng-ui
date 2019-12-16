import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';

import { GlobalLoaderService } from './shared/services/loaders/global-loader.service';
import { RankingService } from './shared/services/ranking.service.js';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "PerfectAngular";

  showLoader = false;

  constructor(
    public globalLoader: GlobalLoaderService,
    private rankingService:RankingService
  ) {
    this.globalLoader
      .observerLoading()
      .pipe(delay(100))
      .subscribe(loadingStatus => {
        console.log(loadingStatus);
        this.showLoader = loadingStatus;
      });

    this.rankingService.loadRankinModuleData().subscribe((res:any) => {
      sessionStorage.setItem('ulbJson', JSON.stringify(res.data));
    });
  }
}
