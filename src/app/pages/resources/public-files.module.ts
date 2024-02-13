import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { FileComponent } from './file/file.component';
import { FileRoutes } from './public-files.route';
import { GlobalPartModule } from 'src/app/global-part/global-part.module';

@NgModule({
  imports: [CommonModule, FileRoutes, SharedModule, GlobalPartModule],
  declarations: [FileComponent]
})
export class PublicFilesModule {}
