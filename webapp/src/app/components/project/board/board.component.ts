import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../../models/board.model';
import {Column} from '../../../models/column.model';
import {MatDialog} from '@angular/material/dialog';
import {NewUserStoryComponent} from '../new-user-story/new-user-story.component';
import {Observable, Subject, Subscription} from 'rxjs';
import {UserStoryService} from '../../../services/user-story.service';
import {ProjectService} from '../../../services/project.service';
import UserStory from '../../../models/userStory';
import BoardState from '../../../store/states/board.state';
import * as BoardActions from '../../../store/actions/board.action';
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";

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
  todoColumn: Column;
  inProgressColumn: Column;
  doneColumn: Column;
  boardState$: Observable<BoardState>;
  boardSubscription: Subscription;
  allUserStories: UserStory[];
  allErrors: Error = null;
  constructor(private dialog: MatDialog, private userStoryService: UserStoryService,
              private projectService: ProjectService, private store: Store<{board: BoardState }>) {
    this.boardState$ = store.pipe(select('board'));
  }

  board: Board = new Board('Sprint Board', []);

  ngOnInit() {
    this.projectService.userProject$.subscribe(pr => this.projectId = pr._id);
    this.boardSubscription = this.boardState$
      .pipe(
        map(response => {
          this.allUserStories = response.userStories;
          this.allErrors = response.userStoriesError;
          this.drawTheBoard();
        })
    ).subscribe();
    this.store.dispatch(BoardActions.BeginGetUserStoriesAction({projectId: this.projectId}));
  }

  drawTheBoard() {
    /*this.projectService.userProject$.subscribe(pr => this.projectId = pr._id);
    this.userStoryService.getAllUserStories(this.projectId).subscribe((data) => {
      this.todoUserStories = data.filter(item => item.priority === 'medium');
      this.inProgressUserStories = data.filter(item => item.priority === 'low');
      this.doneUserStories = data.filter(item => item.priority === 'high');
      this.todoColumn = new Column('Todo', this.todoUserStories);
      this.inProgressColumn = new Column('In Progress', this.inProgressUserStories);
      this.doneColumn = new Column('Done', this.doneUserStories);
    });*/
      this.todoUserStories = this.allUserStories.filter(item => item.priority === 'medium');
      this.inProgressUserStories = this.allUserStories.filter(item => item.priority === 'low');
      this.doneUserStories = this.allUserStories.filter(item => item.priority === 'high');
      this.todoColumn = new Column('Todo', this.todoUserStories);
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
      event.item.data.status = 'Todo';
      console.log(event.item);
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
      const updateStory = Object.assign({}, event.item.data);
      updateStory.status = 'In Progress';
      this.store.dispatch(BoardActions.BeginUpdateUserStory({storyId : updateStory._id, payload: updateStory}));
      console.log(event.item);
    }
  }

  dropDone(event: CdkDragDrop<UserStory[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      event.item.data.status = 'Done';
      console.log(event.item);
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  deleteStory(item, column, index) {
    this.store.dispatch(BoardActions.BeginDeleteUserStory({storyId: item._id}));
    // column.tasks.splice(index, 1);
  }

 /* createUserStory() {
    this.board.columns[0].userStories.push('Item');
  }*/

  createUserStory() {
    this.dialog.open(NewUserStoryComponent, {width: '500px'});
  }
}
