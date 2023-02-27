import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // private attributes
  private _errorMessage: string =
    'Unknown Error Occurred! Please Try Again Later!';

  constructor(private _errorService: ErrorService) {}

  // private methods
  private _setError(err: HttpErrorResponse): void {
    if (err.error instanceof ErrorEvent) this._errorMessage = err.error.message;
    else {
      if (err.status !== 0) this._errorMessage = err.error.message;
    }
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this._setError(err);
        this._errorService.errorMessage = this._errorMessage;
        return throwError(() => new Error(this._errorMessage));
      })
    );
  }
}
