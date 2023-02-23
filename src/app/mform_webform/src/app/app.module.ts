import { Injector, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { WebFormViewComponent } from './web-form-view/web-form-view.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MyFilterPipe } from './myFilterPipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import  { createCustomElement } from '@angular/elements';
import { GetFileIcon } from './file-icon.pipe';

@NgModule({
  declarations: [
    MyFilterPipe,
    AppComponent,
    SnackBarComponent,
    WebFormViewComponent,
    GetFileIcon
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [],
  exports: [MyFilterPipe, GetFileIcon],
  entryComponents:[AppComponent],
  // bootstrap: [AppComponent]
})
export class AppModule{
  constructor (private injector: Injector){
    const el = createCustomElement(AppComponent,{injector});
    customElements.define('web-form',el);
  }

  ngDoBootstrap(){

  }
 }
