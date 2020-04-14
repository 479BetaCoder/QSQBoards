import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import Project from '../store/models/project';
import User from '../store/models/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  static projects: Project[];
  projectObservables: any;
  constructor(private _http: HttpClient) { }
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  userProjectSubject$ = new BehaviorSubject<any>(null);
  userProject$: Observable<any> = this.userProjectSubject$.asObservable();

  getProjects() {
    this.projectObservables = this._http.get<Array<Project>>(baseURL + '/projects');
    this.projectObservables.subscribe((items: Project[]) => {
      ProjectService.projects = items as Project[];
    },
      (err) => {
        console.log(err);
      }
    );

    return this.projectObservables;
  }


  getProject(projectTitle: string) {
    const project: any = ProjectService.projects.find(x => x.title == projectTitle);
    const p = Object.assign(new Project, project);
    return p;
  }

  createNewProject(body: any): Observable<any> {
    return this._http.post(baseURL + '/projects', body, {
      observe: 'body'
    });
  }

  updateProject(body: any, projectId: string): Observable<any> {
    return this._http.put(baseURL + '/projects/' + projectId, body, {
      observe: 'body'
    });
  }

  getAllUsers(): Observable<Array<User>> {
    const users = this._http.get<Array<User>>(baseURL + '/users');
    return users;
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
