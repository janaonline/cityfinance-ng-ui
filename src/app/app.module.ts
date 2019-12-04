import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomHttpInterceptor } from 'src/app/security/custom-http.interceptor';

import { AppComponent } from './app.component';
import { AppRouter } from './app.route';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './security/auth-guard.service';
import { AppCommonModule } from './shared/modules/app-common/app-common.module';
import { RupeeConverterPipe } from './shared/pipes/rupee-converter.pipe';

@NgModule({
  declarations: [AppComponent, RupeeConverterPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouter,
    AppCommonModule,
    HttpClientModule,
    ReactiveFormsModule
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
  bootstrap: [AppComponent]
})
export class AppModule {}
