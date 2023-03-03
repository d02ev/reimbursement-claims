import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedReimbursementsComponent } from './admin/approved-reimbursements/approved-reimbursements.component';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DefaultHomeComponent } from './default-home/default-home.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { ApproveReimbursementComponent } from './reimbursements/approve-reimbursement/approve-reimbursement.component';
import { CreateReimbursementComponent } from './reimbursements/create-reimbursement/create-reimbursement.component';
import { DeclineReimbursementComponent } from './reimbursements/decline-reimbursement/decline-reimbursement.component';
import { EditReimbursementComponent } from './reimbursements/edit-reimbursement/edit-reimbursement.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  { path: '', component: DefaultHomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: 'user/dashboard',
    component: UserHomeComponent,
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: 'user/create',
    component: CreateReimbursementComponent,
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: 'user/edit/:claimId',
    component: EditReimbursementComponent,
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: 'admin/dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/approve/:claimId',
    component: ApproveReimbursementComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/decline/:claimId',
    component: DeclineReimbursementComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/dashboard/approved',
    component: ApprovedReimbursementsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/dashboard/declined',
    component: DeclineReimbursementComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
