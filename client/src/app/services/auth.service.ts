import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = 'http://localhost:5000/api/v1/auth'

  constructor(private _httpClient: HttpClient) { }

  // private methods
  private _decodeJwtToken(jwtToken: string | null): any {
    let jwtData = jwtToken!.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    return decodedJwtData;
  };

  private _getJwtToken() {
    return sessionStorage.getItem('authToken');
  };

  private _decodeRoleFromToken(): number {
    let decodedJwtData = this._decodeJwtToken(this._getJwtToken());
    return decodedJwtData['role'];
  };

  
  // public methods
  public getUserIdFromToken(): number {
    let decodedJwtData = this._decodeJwtToken(this._getJwtToken());
    return decodedJwtData['id'];
  };

  public getUserEmailFromToken(): string {
    let decodedJwtData = this._decodeJwtToken(this._getJwtToken());
    return decodedJwtData['email'];
  };

  public isUserLoggedIn(): boolean {
    return !!this._getJwtToken();
  };

  public isAdmin(): boolean {
    if (this.isUserLoggedIn() && this._decodeRoleFromToken() === 1) return true;
    return false;
  };

  public isSuperAdmin(): boolean {
    if (this.isUserLoggedIn() && this._decodeRoleFromToken() === -1) return true;
    return false;
  };

  public registerUser(registerationData: any): Observable<any> {
    return this._httpClient.post(
      this._baseUrl + '/register',
      registerationData
    );
  };

  public loginUser(loginData: any): Observable<any> {
    return this._httpClient.post(
      this._baseUrl + '/login',
      loginData
    );
  };

  public logoutUser(): void {
    sessionStorage.removeItem('authToken');
  };
}
