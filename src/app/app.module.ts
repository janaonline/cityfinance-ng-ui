import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatGridListModule,MatSidenavModule,MatMenuModule,MatListModule,
  MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
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
import { EntryLevelComponent } from './pages/entry-level/entry-level.component';
import { EntryListComponent } from './pages/entry-level/entry-list/entry-list.component';
import { EntryList1Component } from './pages/entry-level/entry-list1/entry-list1.component';
import { EntryList2Component } from './pages/entry-level/entry-list2/entry-list2.component';
import { EntryList3Component } from './pages/entry-level/entry-list3/entry-list3.component';
import { EntryList4Component } from './pages/entry-level/entry-list4/entry-list4.component';
import { EntryList5Component } from './pages/entry-level/entry-list5/entry-list5.component';
import {MatFormFieldModule} from '@angular/material/form-field';

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
    // FormControl,
    SharedModule,
    // CfChartsModule,
    AngularMaterialModule,
    CommonModule,
    AngularMultiSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatGridListModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,

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
    EntryLevelComponent,
    EntryListComponent,
    EntryList1Component,
    EntryList2Component,
    EntryList3Component,
    EntryList4Component,
    EntryList5Component,
    // InrCurrencyPipe,
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
