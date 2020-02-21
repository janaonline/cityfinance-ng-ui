import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomHttpInterceptor} from 'src/app/security/custom-http.interceptor';
import {AppComponent} from './app.component';
import {AppRouter} from './app.route';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './security/auth-guard.service';
import {DialogComponent} from './shared/components/dialog/dialog.component';
import {AppCommonModule} from './shared/modules/app-common/app-common.module';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [AppComponent, DialogComponent],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouter,
    AppCommonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    CustomHttpInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
