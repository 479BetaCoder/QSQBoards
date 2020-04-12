import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Project} from "../models/project";
import {User} from "../models/user";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Task } from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  user1: User = {
    UserName : "Dileep"
  };
  user2: User = {
    UserName : "Reddy"
  };
  project1: Project ={
    ProjectId : "werty",
    Title: "Project Name 1",
    Owner: this.user1,
    Description: "This is the description",
    Status: "new",
    Members:[
      this.user1,this.user2
    ]
  }
  project2: Project ={
    ProjectId : "werty",
    Title: "Project Name 2",
    Owner: this.user2,
    Description: "Go to Hell",
    Status: "new",
    Members:[
      this.user1,this.user2
    ]
  }

  task1: Task = {
    title : "Dummy Task 1",
    description : "Dummy Task 1 Description",
    comments: [
        {
          text: "comment1 for task 1",
          postedBy: this.user1
        }
      ],
    status : "New",
    priority: 1,
    storyId: "storyId",
    assignee: this.user2
}
task2: Task = {
  title : "Dummy Task 2",
  description : "Dummy Task 12Description",
  comments: [
      {
        text: "comment1 for task 2",
        postedBy: this.user2
      }
    ],
  status : "New",
  priority: 5,
  storyId: "storyId",
  assignee: this.user1
}

  static projects : Project[];
  projectObservables: any;


  constructor(private _http: HttpClient) { }
  headers = new HttpHeaders().set('Content-Type', 'application/json');

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


  getProject(projectTitle: String){
    const project: any = ProjectService.projects.find(x => x["title"] == projectTitle);
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

  getAllUsers() : Observable<Array<User>>{
    const users = this._http.get<Array<User>>(baseURL + '/users');
    return users;
  }

  getPendingTasks(){
    const tasks = [this.task1, this.task2];
    return tasks;
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
