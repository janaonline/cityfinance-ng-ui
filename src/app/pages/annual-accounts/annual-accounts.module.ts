import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AnnualAccountsRoutingModule } from "./annual-accounts-routing.module";
import { AnnualAccountsCreateComponent } from "./annual-accounts-create/annual-accounts-create.component";
// import { AnnualAccountsViewComponent } from "./annual-accounts-view/annual-accounts-view.component";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatSelectModule,
  MatRadioModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSortModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    AnnualAccountsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  declarations: [AnnualAccountsCreateComponent],
  exports: [AnnualAccountsCreateComponent],
})
export class AnnualAccountsModule {}
