import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';
import { ReimbursementService } from '../services/reimbursement.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  public userReimbursements: any = [];
  public userEmail: string = '';
  public isError: boolean = false;
  public errorResponse: string = '';

  constructor(
    private _authService: AuthService,
    private _reimbursementService: ReimbursementService,
    private _errorService: ErrorService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._reimbursementService
      .accessClaimsCreatedByUser(this._authService.getUserIdFromToken())
      .subscribe({
        next: (response: any) => {
          this.userReimbursements = response;
        },
        error: () => {
          this.isError = true;
          this.errorResponse = this._errorService.errorMessage;
        },
        complete: () => {},
      });

    this.userEmail = this._authService.getUserEmailFromToken();
  }

  deleteReimbursementClaim(claimId: any) {
    this._reimbursementService.deleteClaim(claimId).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }

  logout() {
    this._authService.logoutUser();
  }
}