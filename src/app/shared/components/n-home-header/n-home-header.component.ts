import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { UserUtility } from 'src/app/util/user/user';
import { Login_Logout } from 'src/app/util/logout.util';
import { IUserLoggedInDetails } from 'src/app/models/login/userLoggedInDetails';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-n-home-header',
  templateUrl: './n-home-header.component.html',
  styleUrls: ['./n-home-header.component.scss']
})
export class NHomeHeaderComponent implements OnInit {

  loggedInUserDetails;
  loggedInUserType;
  btnName = 'Login for 15th FC Grants';
  isLoggedIn = false;
  user: IUserLoggedInDetails = null;

  constructor(
    public _router: Router,
    private authService: AuthService,
  ) {
    this.isLoggedIn = this.authService.loggedIn();
    this.user = this.isLoggedIn ? this.user : null;

    if (this.isLoggedIn) {
      UserUtility.getUserLoggedInData().subscribe((value) => {
          this.user = value;
      });
    }
     if (this.isLoggedIn) {
          this.btnName = 'Logout';
        }else {
          this.btnName = 'Login for 15th FC Grants';
        }

   }
  size;

  ngOnInit(): void {
    this.authService.loginLogoutCheck.subscribe((res)=> {
      console.log('loginLogoutCheck', res);
      if(res){
        this.btnName = 'Logout';
      }
      if(!res){
        this.btnName = 'Login for 15th FC Grants';
      }
    })
    }
    removeSessionItem(){
      let postLoginNavigation = sessionStorage.getItem("postLoginNavigation"),
      sessionID = sessionStorage.getItem("sessionID")
      sessionStorage.clear()
      sessionStorage.setItem("sessionID",sessionID);
      if(postLoginNavigation) sessionStorage.setItem("postLoginNavigation",postLoginNavigation)
    }
    setFontSize(size){
         console.log(size)
          this.size= size
      }
  scroll(){
    window.scrollTo({
      top: 1000,

      behavior: 'smooth'
    });
  }
  // routerLink="/fc-home-page";
  loginLogout(){
    if(this.btnName == 'Login for 15th FC Grants') {
       this._router.navigateByUrl('/fc-home-page');
    }
    if(this.btnName == 'Logout') {
      this.btnName = 'Login for 15th FC Grants';
      this.authService.loginLogoutCheck.next(false);
      localStorage.clear();
      this.removeSessionItem();
      this._router.navigateByUrl('/home')
   }

  }
}
