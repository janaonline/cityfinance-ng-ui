import { Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit, } from '@angular/core';
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';
import { Router } from '@angular/router';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
@Component({
  selector: 'app-mohuaform',
  templateUrl: './mohuaform.component.html',
  styleUrls: ['./mohuaform.component.scss']
})
export class MohuaformComponent implements OnInit, AfterViewInit {

  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType;
  sticky: boolean = false;
  elementPosition: any;
  showLoader = true;
  @ViewChild('stickyMenu') menuElement: ElementRef;
  constructor(
    private _router: Router,
    @Inject(DOCUMENT) private _document,
    private renderer2: Renderer2,
  ) {
    this.loggedInUserType = this.loggedInUserDetails.role;
    if (!this.loggedInUserType) {
      this._router.navigate(["/home"]);
      this.showLoader = false;
    }
    switch (this.loggedInUserType) {
      case USER_TYPE.ULB:
        this._router.navigate(["/ulbform/overview"]);
        this.showLoader = false;
        // this._router.navigate(["/home"]);
        break;
      case USER_TYPE.STATE:
        this._router.navigate(["/stateform/dashboard"]);
        this.showLoader = false;
        //  this._router.navigate(["/home"]);
        break;
      case USER_TYPE.MoHUA:
      case USER_TYPE.PARTNER:
      case USER_TYPE.ADMIN:
        this._router.navigate(["/mohua/dashboard"]);
        this.showLoader = false;
        break;
      //
      // case USER_TYPE.PARTNER:
      // case USER_TYPE.ADMIN:
      // case undefined:
      // case null:
      //   return;
      // default:
      //   this._router.navigate(["/home"]);
      //   break;
    }
  }

  ngOnInit(): void {
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';

    s.text = `   
      window.JOONBOT_WIDGET_ID = "f846bb00-1359-4196-9ecf-47094ddc04f7";
      window.JB_source = (JSON.parse(localStorage.getItem("userData"))).name;
      var n, o;
      o = document.createElement("script");
      o.src = "https://js.joonbot.com/init.js", o.defer = !0, o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous";
      n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
  `;
    this.renderer2.appendChild(this._document.body, s);
  }
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

}
