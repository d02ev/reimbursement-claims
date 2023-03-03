import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-approvers',
  templateUrl: './approvers.component.html',
  styleUrls: ['./approvers.component.css'],
})
export class ApproversComponent implements OnInit {
  public userEmail: any;
  public approvers: any = [];
  public isError: boolean = false;
  public errorResponse: any;

  constructor(
    private _authService: AuthService,
    private _errorService: ErrorService,
    private _adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.userEmail = this._authService.getUserEmailFromToken();
    this._adminService.accessAllApprovers().subscribe({
      next: (response: any) => {
        this.approvers = response;
      },
      error: () => {
        this.isError = true;
        this.errorResponse = this._errorService.errorMessage;
        setTimeout(() => {
          this.isError = false;
        }, 5000);
      },
      complete: () => {},
    });
  }

  makeUserAdmin(userId: any) {
    this._adminService.grantUserAdminPrivileges(userId).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }

  revokeUserAsApprover(userId: any) {
    this._adminService.revokeUserApproverRights(userId).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }

  logout() {
    this._authService.logoutUser();
  }
}
