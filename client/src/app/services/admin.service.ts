import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private _baseUrl: string = 'http://localhost:5000/api/v1/admin';
  
  constructor(private _httpClient: HttpClient) {}

  public accessAllUsers(): Observable<any> {
    return this._httpClient.get(this._baseUrl);
  }

  public accessAllApprovers(): Observable<any> {
    return this._httpClient.get(this._baseUrl + '/user/approvers');
  }

  public accessAllAdmins(): Observable<any> {
    return this._httpClient.get(this._baseUrl + '/user/admins');
  }

  public accessUser(userId: any): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/${userId}`);
  }

  public grantUserAdminPrivileges(userId: any): Observable<any> {
    return this._httpClient.patch(`${this._baseUrl}/grant/${userId}`, {});
  }

  public revokeUserAdminPrivileges(userId: any): Observable<any> {
    return this._httpClient.patch(`${this._baseUrl}/revoke/${userId}`, {});
  }

  public grantUserApproverRights(userId: any): Observable<any> {
    return this._httpClient.patch(`${this._baseUrl}/approver/${userId}`, {});
  }

  public revokeUserApproverRights(userId: any): Observable<any> {
    return this._httpClient.patch(`${this._baseUrl}/approver/revoke/${userId}`, {});
  }
}
