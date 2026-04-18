import {Injectable} from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../app/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate() {
    return this.authService.ensureAuthenticated().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/']);
        }
      }),
      map((isAuthenticated) => isAuthenticated)
    );
  }

}
