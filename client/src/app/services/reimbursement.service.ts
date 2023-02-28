import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReimbursementService {
  private _baseUrl: string = 'http://localhost:5000/api/v1/reimbursement';

  constructor(private _httpClient: HttpClient) {}

  // public methods
  public generateClaim(claimData: any): Observable<any> {
    return this._httpClient.post(this._baseUrl, claimData);
  }

  public accessAllClaims(): Observable<any> {
    return this._httpClient.get(this._baseUrl);
  }

  public accessPendingClaims(): Observable<any> {
    return this._httpClient.get(this._baseUrl + '/pending');
  }

  public accessApprovedClaims(): Observable<any> {
    return this._httpClient.get(this._baseUrl + '/approved');
  }

  public accessDeclinedClaims(): Observable<any> {
    return this._httpClient.get(this._baseUrl + '/declined');
  }

  public accessClaimById(claimId: any): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/:${claimId}`);
  }

  public accessClaimCreatedByUser(): Observable<any> {
    return this._httpClient.get(this._baseUrl + '/user');
  }

  public approveClaim(claimId: any, approvingData: any): Observable<any> {
    return this._httpClient.patch(`${this._baseUrl}/approve/${claimId}`, approvingData);
  }

  public declineClaim(claimId: any, decliningData: any): Observable<any> {
    return this._httpClient.patch(`${this._baseUrl}/decline/${claimId}`, decliningData);
  }

  public editClaim(claimId: any, modifiedData: any): Observable<any> {
    return this._httpClient.patch(`${this._baseUrl}/edit/${claimId}`, modifiedData);
  }

  public deleteClaim(claimId: any): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/delete/${claimId}`);
  }
}
