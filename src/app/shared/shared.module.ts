import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PreLoaderComponent],
  exports: [PreLoaderComponent]
})
export class SharedModule {}
