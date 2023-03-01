import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-create-reimbursement',
  templateUrl: './create-reimbursement.component.html',
  styleUrls: ['./create-reimbursement.component.css'],
})
export class CreateReimbursementComponent implements OnInit {
  public claimCreationForm: any;
  public isError: boolean = false;
  public isSuccess: boolean = false;
  public errorResponse: string = '';
  public successResponse: string = '';
  public userEmail: string = '';
  public selectedReceipt: any;

  constructor(
    private _authService: AuthService,
    private _errorService: ErrorService,
    private _reimbursementService: ReimbursementService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.claimCreationForm = new FormGroup({
      date: new FormControl('', Validators.required),
      reimbursementType: new FormControl('', Validators.required),
      requestedValue: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      receipt: new FormControl(''),
    });
    this.userEmail = this._authService.getUserEmailFromToken();
  }

  // getters
  get date() {
    return this.claimCreationForm.get('date');
  }
  get reimbursementType() {
    return this.claimCreationForm.get('reimbursementType');
  }
  get requestedValue() {
    return this.claimCreationForm.get('requestedValue');
  }
  get currency() {
    return this.claimCreationForm.get('currency');
  }
  get receipt() {
    return this.claimCreationForm.get('receipt');
  }

  onFileSelected(event: any) {
    this.selectedReceipt = (event.target as HTMLInputElement).files![0];
    this.claimCreationForm.patchValue({
      receipt: this.selectedReceipt,
    });
    this.claimCreationForm.get('receipt').updateValueAndValidity();
  }

  onSubmit() {
    this._reimbursementService
      .generateClaim(this.claimCreationForm.value)
      .subscribe({
        next: (response: any) => {
          this.isSuccess = true;
          this.successResponse = response.message;
        },
        error: (err: any) => {
          this.isError = true;
          this.errorResponse = this._errorService.errorMessage;
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        },
        complete: () => {
          setTimeout(() => {
            this.isSuccess = false;
            this._router.navigate(['user/dashboard']);
          }, 5000);
        },
      });
  }

  onCancel() {
    this._router.navigate(['user/dashboard']);
  }
}
