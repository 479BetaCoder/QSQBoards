import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';
import { Status } from '../../../shared/status';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  currentProjectTitle: String;
  dataSource: MatTableDataSource<BacklogItem>;
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sortBy:any;

  constructor(private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private storePrDetail: Store<{ projectDetails: ProjectDetailsState }>,
    private store: Store<{board: BoardState }>) {
    this.boardState$ = store.pipe(select('board'));
    this.projectDetails$ = storePrDetail.pipe(select('projectDetails'));
    if(this.backlogItems != undefined){
      this.dataSource = new MatTableDataSource(this.backlogItems);
    }
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

  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'title',
      value: filterValue
    });


    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setBacklogItems(){
    this.backlogItems = [];
    this.backlogUserStories =  this.allUserStories.filter(item => item.status != Status.Done);
    this.backlogUserStories.forEach(story =>{
        const item = new BacklogItem();
        item._id = story._id;
        item.assignee = "";
        item.description = story.description;
        item.status = story.status;
        item.storyPoints = story.storyPoints;
        item.priority = story.priority;
        item.title = story.title;
        item.type = "User Story";
        this.backlogItems.push(item);
        story.tasks.forEach(task =>{
          if(task.status != Status.Done){
            const taskItem = new BacklogItem();
            taskItem._id = task._id;
            taskItem.assignee = task.assignee != undefined?  task.assignee.userName : "";
            taskItem.description = task.description;
            taskItem.status = task.status;
            taskItem.priority = task.priority;
            taskItem.title = task.title;
            taskItem.type = "Task";
            this.backlogItems.push(taskItem);
          }
        })
    });
    this.dataSource = new MatTableDataSource(this.backlogItems);
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = 
    (data: BacklogItem, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
        return matchFilter.every(Boolean);
    };
  }

  getDate(){
    return formatDate(new Date(), 'yyyy/MM/dd', 'en');
  }

  editBacklogItem(backlogItem: BacklogItem) {
    const id = backlogItem._id;
    if(backlogItem.type == "User Story"){
      this.router.navigate(['../user-story-details/' + id], { relativeTo: this.activatedRoute });
    }
  }
}

