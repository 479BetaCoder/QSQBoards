import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {baseURL} from '../shared/baseurl';
import {catchError} from 'rxjs/operators';
import UserStory from "../models/userStory";

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {

  constructor(private http: HttpClient) {
  }

  createStory(newStory, projectId): Observable<any> {
    const url = `${baseURL}/user-stories/${projectId}`;
    return this.http.post(url, newStory).pipe(
      catchError(this.errorHandling)
    );
  }

  getAllUserStories(projectId): Observable<Array<UserStory>>  {
    // @ts-ignore
    return this.http.get(`${baseURL}/user-stories/${projectId}`);
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
