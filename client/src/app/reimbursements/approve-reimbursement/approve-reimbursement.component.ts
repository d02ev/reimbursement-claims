import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-approve-reimbursement',
  templateUrl: './approve-reimbursement.component.html',
  styleUrls: ['./approve-reimbursement.component.css'],
})
export class ApproveReimbursementComponent implements OnInit {
  public approvalForm: any;
  public userEmail: any;
  public isSuccess: boolean = false;
  public isError: boolean = false;
  public successResponse: string = '';
  public errorResponse: string = '';

  constructor(
    private _authService: AuthService,
    private _errorService: ErrorService,
    private _reimbursementService: ReimbursementService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userEmail = this._authService.getUserEmailFromToken();
    this.approvalForm = new FormGroup({
      approvedBy: new FormControl('', [Validators.required]),
      approvedValue: new FormControl('', Validators.required),
      internalNotes: new FormControl(''),
    });
  }

  get approvedBy() {
    return this.approvalForm.get('approvedBy');
  }
  get approvedValue() {
    return this.approvalForm.get('approvedValue');
  }
  get internalNotes() {
    return this.approvalForm.get('internalNotes');
  }

  onSubmit() {
    this._reimbursementService
      .approveClaim(
        this._activatedRoute.snapshot.params['claimId'],
        this.approvalForm.value
      )
      .subscribe({
        next: (response: any) => {
          this.isSuccess = true;
          this.successResponse = response.message;
        },
        error: () => {
          this.isError = true;
          this.errorResponse = this._errorService.errorMessage;
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        },
        complete: () => {
          setTimeout(() => {
            this._router.navigate(['admin/dashboard']);
          }, 3000);
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
