import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CustomHttpInterceptor } from 'src/app/security/custom-http.interceptor';

import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { AppRouter } from './app.route';
import { AuthService } from './auth/auth.service';
import { HeatMapComponent } from './auth/home/heat-map/heat-map.component';
import { HomeComponent } from './auth/home/home.component';
import { MapSectionComponent } from './auth/home/map-section/map-section.component';
import { AuthGuard } from './security/auth-guard.service';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { AppCommonModule } from './shared/modules/app-common/app-common.module';
import { SharedModule } from './shared/shared.module';
import { CustomRouteReuseStrategy } from './util/router/reuse-strategy';

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
    // CfChartsModule,
    AngularMaterialModule,
    CommonModule,
    AngularMultiSelectModule,
    MatAutocompleteModule,
    MatInputModule,

    CarouselModule.forRoot(),
  ],
  providers: [
    CustomHttpInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },

    AuthService,
    AuthGuard,
  ],
  declarations: [
    AppComponent,
    DialogComponent,
    HomeComponent,
    MapSectionComponent,
    HeatMapComponent,
    // InrCurrencyPipe,
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
