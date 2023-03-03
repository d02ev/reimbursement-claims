import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultHomeComponent } from './default-home/default-home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './services/auth.service';
import { ReimbursementService } from './services/reimbursement.service';
import { TokenInterceptor } from './services/token.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { ErrorService } from './services/error.service';
import { UserHomeComponent } from './user-home/user-home.component';
import { CreateReimbursementComponent } from './reimbursements/create-reimbursement/create-reimbursement.component';
import { EditReimbursementComponent } from './reimbursements/edit-reimbursement/edit-reimbursement.component';
import { ApproveReimbursementComponent } from './reimbursements/approve-reimbursement/approve-reimbursement.component';
import { DeclineReimbursementComponent } from './reimbursements/decline-reimbursement/decline-reimbursement.component';
import { HomeComponent } from './admin/home/home.component';
import { ApprovedReimbursementsComponent } from './admin/approved-reimbursements/approved-reimbursements.component';
import { DeclinedReimbursementsComponent } from './admin/declined-reimbursements/declined-reimbursements.component';
import { AdminsComponent } from './super-admin/admins/admins.component';
import { ApproversComponent } from './super-admin/approvers/approvers.component';
import { SuperAdminHomeComponent } from './super-admin/super-admin-home/super-admin-home.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultHomeComponent,
    LoginComponent,
    RegisterComponent,
    UserHomeComponent,
    CreateReimbursementComponent,
    EditReimbursementComponent,
    ApproveReimbursementComponent,
    DeclineReimbursementComponent,
    HomeComponent,
    ApprovedReimbursementsComponent,
    DeclinedReimbursementsComponent,
    AdminsComponent,
    ApproversComponent,
    SuperAdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    ReimbursementService,
    ErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
