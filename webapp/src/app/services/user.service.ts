import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) { }
/*  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('token', localStorage.getItem('token'));*/

  submitRegister(body: any) {
    return this._http.post( baseURL + '/users/signup', body, {
      observe: 'body'
    });
  }

  login(body: any): Observable<any> {
    return this._http.post(baseURL + '/users/login', body, {
      observe: 'body'
   });
  }

  updateUser(updateUser): Observable<any> {
    const url = `${baseURL}/users/`;
    return this._http.put(url, updateUser).pipe(
      catchError(this.errorHandling)
    );
  }
  // Error handling
  errorHandling(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
