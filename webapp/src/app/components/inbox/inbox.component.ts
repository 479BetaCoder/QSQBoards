import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table/table-data-source';
import { Task } from 'app/store/models/task';
import { UserStoryService } from 'app/services/user-story.service';
import { Observable, Subscription } from 'rxjs';
import UserState from 'app/store/states/user.state';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import ProjectState from 'app/store/states/project.state';
import ProjectDetailsState from 'app/store/states/project-details.state';
import * as UserActions from '../../store/actions/user.action';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  currentUserName: string;
  dataSource: any;
  displayedColumns: string[] = ['title', 'description', 'priority', 'status'];
  tasks: Task[];

  activeUsers$: Observable<UserState>;
  ActiveUsersSubscription: Subscription;
  userError: Error = null;
  
  constructor( private store: Store<{ projects: ProjectState, user: UserState, projectDetails: ProjectDetailsState }>) {
    this.activeUsers$ = store.pipe(select('user'));
   }

  ngOnInit(): void {
    this.tasks = [];
      if (sessionStorage.getItem('User')) {
        const user = JSON.parse(sessionStorage.getItem('User'));
        this.currentUserName = user.userName;
      }
     
      this.ActiveUsersSubscription = this.activeUsers$
      .pipe(
        map(res => {
          this.tasks = res.tasks;
          this.userError = res.userError;
          this.dataSource = this.tasks;
        })
      )
      .subscribe();
  }

}
