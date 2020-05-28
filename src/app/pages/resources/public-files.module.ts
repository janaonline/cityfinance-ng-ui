import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileComponent } from './file/file.component';
import { FileRoutes } from './public-files.route';

@NgModule({
  imports: [CommonModule, FileRoutes],
  declarations: [FileComponent],
})
export class PublicFilesModule {}
