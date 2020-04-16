import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import Project from '../store/models/project';
import { User } from '../store/models/user';
import { Task } from "../store/models/task";
import { UserStory } from '../store/models/userStory';

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

  task1: Task = {
    id : 1,
    title : "Dummy Task 1",
    description : "Dummy Task 1 Description",
    status : "New",
    priority: "1",
    //storyId: "storyId",
    storyPoints: "5",
    assignee: this.user2
}
task2: Task = {
  id : 2,
  title : "Dummy Task 2",
  description : "Dummy Task 12Description",
  status : "New",
  priority: "5",
  //storyId: "storyId",
  storyPoints: "5",
  assignee: this.user1
}

userStory1: UserStory = {
  id : 1,
  title : "Dummy User story 1",
  description : "Dummy Task 1 Description",
  status : "New",
  priority: "1",
  //storyId: "storyId",
  storyPoints: "5",
  assignee: this.user2
}
userStory2: UserStory = {
id : 2,
title : "Dummy User story 2",
description : "Dummy Task 12Description",
status : "New",
priority: "5",
//storyId: "storyId",
storyPoints: "5",
assignee: this.user1
}

  static projects : Project[];
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

  getPendingTasks(){
    const tasks = [this.task1, this.task2];
    return tasks;
  }

  getPendingUserStories(){
    const userStories = [this.userStory1, this.userStory2];
    return userStories;
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
