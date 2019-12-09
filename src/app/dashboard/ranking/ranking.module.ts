import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingRouter } from './ranking.router';
import { RankingComponent } from './ranking.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RankingRouter,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [RankingComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class RankingModule { }
