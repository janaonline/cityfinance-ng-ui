import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { FileComponent } from './file/file.component';
import { FileRoutes } from './public-files.route';
import { GobalPartModule } from 'src/app/gobal-part/gobal-part.module';

@NgModule({
  imports: [CommonModule, FileRoutes, SharedModule, GobalPartModule],
  declarations: [FileComponent]
})
export class PublicFilesModule {}
