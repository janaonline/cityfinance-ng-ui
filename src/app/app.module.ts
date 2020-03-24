import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {HomeComponent} from './auth/home/home.component';
import {HomeTabViewComponent} from './auth/home/home-tab-view/home-tab-view.component';
import {SharedModule} from './shared/shared.module';
import {CfChartsModule} from './shared/cf-charts/cf-charts.module';
import {AngularMaterialModule} from './angular-material.module';
import {CommonModule} from '@angular/common';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {MatDialogModule, MatTooltipModule} from '@angular/material';

@NgModule({
  entryComponents: [DialogComponent],
  imports: [
    AppRouter,
    BrowserModule,
    BrowserAnimationsModule,
    AppCommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CfChartsModule,
    AngularMaterialModule,
    CommonModule,
    AngularMultiSelectModule,

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
  declarations: [AppComponent, DialogComponent, HomeComponent, HomeTabViewComponent],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
