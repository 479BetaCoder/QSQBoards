import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { select, Store } from "@ngrx/store";
import Project from 'app/store/models/project';
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import ProjectDetailsState from '../../../store/states/project-details.state';
import {ActivatedRoute, Route, Router} from "@angular/router";
import * as ProjectDetailsActions from "../../../store/actions/project-details.action";
import {BacklogItem} from '../../../models/backlog.model';
import BoardState from 'app/store/states/board.state';
import UserStory from 'app/store/models/userStory';
import * as BoardActions from '../../../store/actions/board.action';
import * as constantRoutes from "../../../shared/constants";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  currentProjectTitle: String;
  dataSource: any;
  displayedColumns: string[] = ['title', 'assignee', 'priority', 'status', 'type'];
  projectDetails$: Observable<ProjectDetailsState>;
  ProjectDetailsSubscription: Subscription;
  projectDetails: Project;
  projectsDetailsError: Error = null;

  boardState$: Observable<BoardState>;
  boardSubscription: Subscription;
  allUserStories: UserStory[];
  allErrors: Error = null;

  backlogItems: BacklogItem[];
  backlogUserStories: UserStory[];

  constructor(private projectService: ProjectService,
    private dialog: MatDialog,
    private router: Router,
    private storePrDetail: Store<{ projectDetails: ProjectDetailsState }>,
    private store: Store<{board: BoardState }>) {
    this.boardState$ = store.pipe(select('board'));
    this.projectDetails$ = storePrDetail.pipe(select('projectDetails'));
    //this.projectDetails$ = store.pipe(select('projectDetails'));
    //this.tasks = this.projectService.getPendingTasks();
    //this.dataSource = this.tasks;
  }

  ngOnInit(): void {
      if (sessionStorage.getItem('User')) {
        this.ProjectDetailsSubscription = this.projectDetails$
          .pipe(
            map(res => {
              if (res) {
                this.projectDetails = res.selectedProjectDetails;
                this.projectsDetailsError = res.projectsDetailsError;
              }
            })).subscribe();
        this.boardSubscription = this.boardState$
          .pipe(
            map(response => {
              this.allUserStories = response.userStories;
              this.allErrors = response.userStoriesError;
              this.setBacklogItems();
            })
          ).subscribe();
        ///this.selectedProject = sessionStorage.getItem('SelectedProject');
        this.store.dispatch(BoardActions.BeginGetUserStoriesAction({projectId: this.projectDetails._id}));
      } else {
        this.router.navigateByUrl(constantRoutes.emptyRoute);
      }
    this.currentProjectTitle = this.projectDetails.title;
  }

  setBacklogItems(){
    this.backlogItems = [];
    this.backlogUserStories =  this.allUserStories.filter(item => item.status.toLowerCase() === 'todo' || item.status.toLowerCase() === 'in progress');
    this.backlogUserStories.forEach(story =>{
      const item = new BacklogItem();
        item.assignee = "";
        item.description = story.description;
        item.status = story.status;
        item.storyPoints = story.storyPoints;
        item.priority = story.priority;
        item.title = story.title;
        item.type = "Task";
        this.backlogItems.push(item);
    });
    this.dataSource = this.backlogItems;
  }

}
