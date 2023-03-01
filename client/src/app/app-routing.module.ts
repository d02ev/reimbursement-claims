import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DefaultHomeComponent } from './default-home/default-home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { CreateReimbursementComponent } from './reimbursements/create-reimbursement/create-reimbursement.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
