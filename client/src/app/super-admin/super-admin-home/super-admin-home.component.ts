import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-super-admin-home',
  templateUrl: './super-admin-home.component.html',
  styleUrls: ['./super-admin-home.component.css'],
})
export class SuperAdminHomeComponent implements OnInit {
  public userEmail: any;
  public users: any = [];
  public isError: boolean = false;
  public errorResponse: any;

  constructor(
    private _authService: AuthService,
    private _errorService: ErrorService,
    private _adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.userEmail = this._authService.getUserEmailFromToken();
    this._adminService.accessAllUsers().subscribe({
      next: (response: any) => {
        this.users = response;
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

  logout() {
    this._authService.logoutUser();
  }
}
