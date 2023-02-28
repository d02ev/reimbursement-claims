import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _authService: AuthService) {}

  canActivate(): boolean {
    if (this._authService.isAdmin()) return true;
    return false;
  }
}
