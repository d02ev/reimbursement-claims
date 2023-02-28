import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminGuard implements CanActivate {
  constructor(private _authService: AuthService) {}

  canActivate(): boolean {
    if (this._authService.isSuperAdmin()) return true;
    return false;
  }
}
