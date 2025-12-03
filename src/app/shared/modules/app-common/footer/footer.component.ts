import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
const DEFAULT_ADDRESS = `Ministry of Housing and Urban Affairs</br>
Sankalp Bhawan, GPOA-2</br>
Pt. Ravi Shankar Shukla Lane</br>
New Delhi-110001`;

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  totalUsersVisit: number;

  constructor(private _commonService: CommonService,
    private router: Router) {
    this.getPageDetails();
  }

  ngOnInit() {
    this.fetchUserVisitCount();
  }

  private fetchUserVisitCount() {
    this._commonService
      .getWebsiteVisitCount()
      .subscribe((res) => (this.totalUsersVisit = res));
  }
  routerNav(navlink) {
    console.log(navlink);
  }
  address = DEFAULT_ADDRESS;
  mailId = 'mailto:contact@cityfinance.in';
  mailLabel = 'contact@cityfinance.in';
  getPageDetails() {
    this.router.events.subscribe((event) => {
      let urlArray;
      if (event instanceof NavigationEnd) {
        urlArray = event.url.split("/");
        if (urlArray.includes("rankings")) {
          this.address = `Nirman Bhawan, <br /> New Delhi 110001`;
          this.mailId = 'mailto:rankings@cityfinance.in';
          this.mailLabel = 'rankings@cityfinance.in';
        }
        else {
          this.address = DEFAULT_ADDRESS;
          this.mailId = 'mailto:contact@cityfinance.in';
          this.mailLabel = 'contact@cityfinance.in';
        }
      }
    }
    );
  }

  getNationalPageUrl() {
    this._commonService.getNationalPageUrl();
  }
  blogPage() {
    window.open('https://blog.cityfinance.in/', '_blank');
  }
}
