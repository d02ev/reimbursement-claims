import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-decline-reimbursement',
  templateUrl: './decline-reimbursement.component.html',
  styleUrls: ['./decline-reimbursement.component.css'],
})
export class DeclineReimbursementComponent implements OnInit {
  public decliningForm: any;
  public userEmail: any;
  public isError: boolean = false;
  public isSuccess: boolean = false;
  public errorResponse: string = '';
  public successResponse: string = '';

  constructor(
    private _authService: AuthService,
    private _erroService: ErrorService,
    private _reimbursementService: ReimbursementService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userEmail = this._authService.getUserEmailFromToken();
    this.decliningForm = new FormGroup({
      internalNotes: new FormControl(''),
    });
  }

  get internalNotes() {
    return this.decliningForm.get('internalNotes');
  }

  onSubmit() {
    this._reimbursementService
      .declineClaim(
        this._activatedRoute.snapshot.params['claimId'],
        this.decliningForm.value
      )
      .subscribe({
        next: (response: any) => {
          this.isSuccess = true;
          this.successResponse = response.message;
        },
        error:() => {
          this.isError = true;
          this.errorResponse = this._erroService.errorMessage;
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        },
        complete: () => {
          setTimeout(() => {
            this._router.navigate(['admin/dashboard']);
          }, 3000)
        }
      });
  }

  onCancel() {
    this._router.navigate(['admin/dashboard']);
  }

  logout() {
    this._authService.logoutUser();
  }
}
