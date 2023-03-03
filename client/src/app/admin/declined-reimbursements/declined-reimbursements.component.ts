import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-declined-reimbursements',
  templateUrl: './declined-reimbursements.component.html',
  styleUrls: ['./declined-reimbursements.component.css'],
})
export class DeclinedReimbursementsComponent implements OnInit {
  public userEmail: any;
  public isError: boolean = false;
  public declinedClaims: any = [];
  public errorResponse: any;

  constructor(
    private _authService: AuthService,
    private _errorService: ErrorService,
    private _reimbursementService: ReimbursementService
  ) {}

  ngOnInit(): void {
      this.userEmail = this._authService.getUserEmailFromToken();
      this._reimbursementService.accessDeclinedClaims().subscribe({
        next: (response: any) => { this.declinedClaims = response; },
        error: () => {
          this.isError = true;
          this.errorResponse = this._errorService.errorMessage;
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        },
        complete: () => {}
      });
  }

  logout() {
    this._authService.logoutUser();
  }
}
