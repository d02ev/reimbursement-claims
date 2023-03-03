import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  public userEmail: any;
  public admins: any = [];
  public isError: boolean = false;
  public errorResponse: any;

  constructor(
    private _authService: AuthService,
    private _errorService: ErrorService,
    private _adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.userEmail = this._authService.getUserEmailFromToken();
    this._adminService.accessAllAdmins().subscribe({
      next: (response: any) => {
        this.admins = response;
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

  revokeUserAsAdmin(userId: any) {
    this._adminService.revokeUserAdminPrivileges(userId).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }

  makeUserApprover(userId: any) {
    this._adminService.grantUserApproverRights(userId).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }

  logout() {
    this._authService.logoutUser();
  }
}
