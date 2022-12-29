import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

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
  routerNav(navlink){
     console.log(navlink);
  }
  address = ` Director, AMRUT <br />
  Ministry of Housing and Urban Affairs <br />
  210 C, Nirman Bhawan, Maulana Azad Road <br />
  New Delhi-110011`;
  mailId='mailto:contact@cityfinance.in';
  mailLabel = 'contact@cityfinance.in';
  getPageDetails(){
    this.router.events.subscribe((event) => {
      let urlArray;
      if (event instanceof NavigationEnd) {
        urlArray = event.url.split("/");
        if (urlArray.includes("fiscal")) {
         this.address = `Nirman Bhawan, <br /> New Delhi 110001`;
         this.mailId='mailto:rankings@cityfinance.in';
          this.mailLabel = 'rankings@cityfinance.in';
        }
         else {
          this.address = ` Director, AMRUT <br />
          Ministry of Housing and Urban Affairs <br />
          210 C, Nirman Bhawan, Maulana Azad Road <br />
          New Delhi-110011`;
          this.mailId='mailto:contact@cityfinance.in';
          this.mailLabel = 'contact@cityfinance.in';
        }
      }
      }
    );
  }
}
