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
    const dataToSend = new FormData();
    dataToSend.append('date', claimData.date);
    dataToSend.append('reimbursementType', claimData.reimbursementType);
    dataToSend.append('requestedValue', claimData.requestedValue);
    dataToSend.append('currency', claimData.currency);
    dataToSend.append('receipt', claimData.receipt);

    return this._httpClient.post(this._baseUrl, dataToSend);
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
    return this._httpClient.get(`${this._baseUrl}/${claimId}`);
  }

  public accessClaimsCreatedByUser(userId: any): Observable<any> {
    return this._httpClient.get(this._baseUrl + '/user/claims');
  }

  public approveClaim(claimId: any, approvingData: any): Observable<any> {
    return this._httpClient.patch(
      `${this._baseUrl}/approve/${claimId}`,
      approvingData
    );
  }

  public declineClaim(claimId: any, decliningData: any): Observable<any> {
    return this._httpClient.patch(
      `${this._baseUrl}/decline/${claimId}`,
      decliningData
    );
  }

  public editClaim(claimId: any, modifiedData: any): Observable<any> {
    const dataToSend = new FormData();
    dataToSend.append('date', modifiedData.date);
    dataToSend.append('reimbursementType', modifiedData.reimbursementType);
    dataToSend.append('requestedValue', modifiedData.requestedValue);
    dataToSend.append('currency', modifiedData.currency);
    dataToSend.append('receipt', modifiedData.receipt);

    return this._httpClient.patch(
      `${this._baseUrl}/edit/${claimId}`,
      dataToSend
    );
  }

  public deleteClaim(claimId: any): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/delete/${claimId}`);
  }
}
