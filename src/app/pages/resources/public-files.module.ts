import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { FileComponent } from './file/file.component';
import { FileRoutes } from './public-files.route';

@NgModule({
  imports: [CommonModule, FileRoutes, SharedModule],
  declarations: [FileComponent]
})
export class PublicFilesModule {}
