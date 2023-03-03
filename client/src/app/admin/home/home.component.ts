import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public userEmail: string = '';
  public pendingClaims: any = [];
  public isError: boolean = false;
  public errorResponse: any;

  constructor(
    private _authService: AuthService,
    private _errorService: ErrorService,
    private _reimbursementService: ReimbursementService
  ) {}

  ngOnInit(): void {
    this.userEmail = this._authService.getUserEmailFromToken();
    this._reimbursementService.accessPendingClaims().subscribe({
      next: (response: any) => {
        this.pendingClaims = response;
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

  logout() {
    this._authService.logoutUser();
  }
}
