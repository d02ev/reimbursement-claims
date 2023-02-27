import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { matchValidator } from 'src/app/common/form-validator';

import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registrationForm: any;
  public isError: boolean = false;
  public isSuccess: boolean = false;
  public successResponse: string = '';
  public errorResponse: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      PAN: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
      ]),
      bankName: new FormControl('', Validators.required),
      bankAccountNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{12}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/),
        matchValidator('confirmPassword', true),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/),
        matchValidator('password'),
      ]),
    });
  }

  // form control getters
  get fullName() {
    return this.registrationForm.get('fullName');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get PAN() {
    return this.registrationForm.get('PAN');
  }
  get bankName() {
    return this.registrationForm.get('bankName');
  }
  get bankAccountNumber() {
    return this.registrationForm.get('bankAccountNumber');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    this._authService.registerUser(this.registrationForm.value).subscribe({
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
          this.isSuccess = false;
          this._router.navigate(['auth/login']);
        }, 5000);
      },
    });
  }

  onReset() {
    this.registrationForm.reset();
  }
}
