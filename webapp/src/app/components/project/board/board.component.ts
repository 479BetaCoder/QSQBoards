import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../../store/models/board';
import {Column} from '../../../store/models/column';
import {MatDialog} from '@angular/material/dialog';
import {NewUserStoryComponent} from '../new-user-story/new-user-story.component';
import {Observable, Subject, Subscription} from 'rxjs';
import {UserStoryService} from '../../../services/user-story.service';
import {ProjectService} from '../../../services/project.service';
import UserStory from '../../../store/models/userStory';
import BoardState from '../../../store/states/board.state';
import * as BoardActions from '../../../store/actions/board.action';
import * as ProjectDetailsActions from '../../../store/actions/project-details.action';
import {select, Store} from '@ngrx/store';
import {map, take} from 'rxjs/operators';
import Project from "../../../store/models/project";
import ProjectDetailsState from "../../../store/states/project-details.state";
import {ActivatedRoute, Route, Router} from "@angular/router";
import * as constantRoutes from "../../../shared/constants";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  todoUserStories: UserStory[];
  inProgressUserStories: UserStory[];
  doneUserStories: UserStory[];
  projectId: string;
  selectedProject: any;
  projectDetails$: Observable<ProjectDetailsState>;
  ProjectDetailsSubscription: Subscription;
  todoColumn: Column;
  inProgressColumn: Column;
  doneColumn: Column;
  boardState$: Observable<BoardState>;
  boardSubscription: Subscription;
  allUserStories: UserStory[];
  allErrors: Error = null;
  projectsDetailsError: Error = null;
  // tslint:disable-next-line:max-line-length
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userStoryService: UserStoryService,
    private projectService: ProjectService,
    private store: Store<{board: BoardState , projectDetails: ProjectDetailsState}>) {
    this.boardState$ = store.pipe(select('board'));
    this.projectDetails$ = store.pipe(select('projectDetails'));
  }

  board: Board = new Board('Sprint Board', []);

  ngOnInit() {
    this.selectedProject = JSON.parse(sessionStorage.getItem('SelectedProject'));
    if (sessionStorage.getItem('User')) {
      this.boardSubscription = this.boardState$
        .pipe(
          map(response => {
            this.allUserStories = response.userStories;
            this.allErrors = response.userStoriesError;
            this.drawTheBoard();
          })
        ).subscribe();
      this.store.dispatch(BoardActions.BeginGetUserStoriesAction({projectId: this.selectedProject._id}));
    } else {
      this.router.navigateByUrl(constantRoutes.emptyRoute);
    }
  }

  drawTheBoard() {
      this.todoUserStories = this.allUserStories.filter(item => item.status.toLowerCase() === 'new');
      this.inProgressUserStories = this.allUserStories.filter(item => item.status.toLowerCase() === 'in progress');
      this.doneUserStories = this.allUserStories.filter(item => item.status.toLowerCase() === 'done');
      this.todoColumn = new Column('New', this.todoUserStories);
      this.inProgressColumn = new Column('In Progress', this.inProgressUserStories);
      this.doneColumn = new Column('Done', this.doneUserStories);
  }

  dropInTodo(event: CdkDragDrop<UserStory[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateTheStatus(event.item.data, 'New');
    }
  }

  dropInProgress(event: CdkDragDrop<UserStory[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateTheStatus(event.item.data, 'In Progress');
    }
  }

  dropDone(event: CdkDragDrop<UserStory[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.updateTheStatus(event.item.data, 'Done');
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  updateTheStatus(userStory: UserStory, status: string) {
    const updateStory = Object.assign({}, userStory);
    updateStory.status = status;
    this.store.dispatch(BoardActions.BeginUpdateUserStory({storyId : updateStory._id, payload: updateStory}));
    this.store.dispatch(BoardActions.BeginGetUserStoriesAction({projectId: this.selectedProject._id}));
  }

  deleteStory(item) {
    this.store.dispatch(BoardActions.BeginDeleteUserStory({storyId: item._id}));
    // column.tasks.splice(index, 1);
  }

  editTheStory(userStory: UserStory) {
    const id = userStory._id;
    this.router.navigate(['../user-story-details/' + id], { relativeTo: this.activatedRoute });
  }

  createUserStory() {
    this.dialog.open(NewUserStoryComponent, {width: '500px'});
  }
}
