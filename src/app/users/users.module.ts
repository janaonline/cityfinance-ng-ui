import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AngularMaterialModule } from "../angular-material.module";
import { AuthModule } from "../auth/auth.module";
import { SharedModule } from "../shared/shared.module";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { UserUtility } from "../util/user/user";
import { AnnualAccountsViewComponent } from "../pages/annual-accounts/annual-accounts-view/annual-accounts-view.component";
import { NgxPaginationModule } from "ngx-pagination";
import { AnnualAccountsModule } from "../pages/annual-accounts/annual-accounts.module";

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    AuthModule,
    SharedModule,
    AngularMaterialModule,
    NgxPaginationModule,
    AnnualAccountsModule,
  ],
  providers: [UserUtility],
  declarations: [UsersComponent, AnnualAccountsViewComponent],
})
export class UsersModule {}
