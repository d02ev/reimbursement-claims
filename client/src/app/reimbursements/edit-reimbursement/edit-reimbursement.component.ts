import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-edit-reimbursement',
  templateUrl: './edit-reimbursement.component.html',
  styleUrls: ['./edit-reimbursement.component.css'],
})
export class EditReimbursementComponent implements OnInit {
  public claimModificationForm = new FormGroup({
    date: new FormControl(''),
    reimbursementType: new FormControl(''),
    requestedValue: new FormControl(''),
    currency: new FormControl(''),
    receipt: new FormControl(''),
  });
  public isError: boolean = false;
  public isSuccess: boolean = false;
  public errorResponse: string = '';
  public successResponse: string = '';
  public claimById: any;
  public userEmail: string = '';
  public selectedReceipt: any = '';

  constructor(
    private _authService: AuthService,
    private _errorService: ErrorService,
    private _reimbursementService: ReimbursementService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userEmail = this._authService.getUserEmailFromToken();
    this._reimbursementService
      .accessClaimById(this._activatedRoute.snapshot.params['claimId'])
      .subscribe({
        next: (response: any) => {
          this.claimModificationForm = new FormGroup({
            date: new FormControl(response.date),
            reimbursementType: new FormControl(response.reimbursementType),
            requestedValue: new FormControl(response.requestedValue),
            currency: new FormControl(response.currency),
            receipt: new FormControl(''),
          });
        },
      });
  }

  // getters
  get date() {
    return this.claimModificationForm.get('date');
  }
  get reimbursementType() {
    return this.claimModificationForm.get('reimbursementType');
  }
  get requestedValue() {
    return this.claimModificationForm.get('requestedValue');
  }
  get currency() {
    return this.claimModificationForm.get('currency');
  }
  get receipt() {
    return this.claimModificationForm.get('receipt');
  }

  onFileSelected(event: any) {
    this.selectedReceipt = (event.target as HTMLInputElement).files![0];
    this.claimModificationForm.patchValue({
      receipt: this.selectedReceipt,
    });
    this.claimModificationForm.get('receipt')!.updateValueAndValidity();
  }

  onSubmit() {
    this._reimbursementService
      .editClaim(
        this._activatedRoute.snapshot.params['claimId'],
        this.claimModificationForm.value
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
            this._router.navigate(['user/dashboard']);
          }, 5000);
        },
      });
  }

  onCancel() {
    this._router.navigate(['user/dashboard']);
  }

  logout() {
    this._authService.logoutUser();
  }
}
