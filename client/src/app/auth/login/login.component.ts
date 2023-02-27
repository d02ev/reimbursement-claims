import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: any;
  public isError: boolean = false;
  public errorResponse: string = '';

  constructor(private _authService: AuthService, private _router: Router, private _errorService: ErrorService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this._authService.loginUser(this.loginForm.value).subscribe({
      next: (response: any) => {
        sessionStorage.setItem('authToken', response.jwtToken);
      },
      error: () => {
        this.isError = true;
        this.errorResponse = this._errorService.errorMessage;

        setTimeout(() => {
          this.isError = false;
        }, 5000);
      },
    });
  }
}
