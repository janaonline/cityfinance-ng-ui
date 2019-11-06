import { AppRouter } from './app.route';
import { AuthGuard } from './security/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from 'src/app/security/custom-http.interceptor';
import { AuthService } from './auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from './shared/modules/app-common/app-common.module';
import { RupeeConverterPipe } from './shared/pipes/rupee-converter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RupeeConverterPipe,
  ],
  imports: [
    BrowserModule,
    AppRouter,
    AppCommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CustomHttpInterceptor,
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
export class AppModule { }
