import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../../models/board.model';
import {Column} from '../../../models/column.model';
import {MatDialog} from '@angular/material/dialog';
import {NewUserStoryComponent} from '../new-user-story/new-user-story.component';
import {Observable, Subject} from "rxjs";
import {UserStoryService} from "../../../services/user-story.service";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  allUserStories: Observable<any> = new Subject();
  projectId: string;
  todoColumn: Column;
  inProgressColumn: Column;
  doneColumn: Column;
  constructor(private dialog: MatDialog, private userStoryService: UserStoryService, private projectService: ProjectService) { }

  board: Board = new Board('Sprint Board', [
   /* new Column('Todo', [
      'Some random idea',
      'This is another random idea',
      'build an awesome application'
    ]),
    new Column('In Progress', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]),
    new Column('Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ])*/
  ]);

  ngOnInit() {
    this.drawTheBoard();
    // this.column = new Column('todo', this.allUserStories);
  }

  drawTheBoard() {
    this.projectService.userProject$.subscribe(pr => this.projectId = pr._id);
    this.userStoryService.getAllUserStories(this.projectId).subscribe((data) => {
      this.todoColumn = new Column('Todo', data);
      this.inProgressColumn = new Column('In Progress', data);
      this.doneColumn = new Column('Done', data);
      this.board.columns.push(this.todoColumn, this.inProgressColumn, this.doneColumn);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log(event.item);
    }
  }

  deleteStory(item, column, index) {
    column.tasks.splice(index, 1);
  }

 /* createUserStory() {
    this.board.columns[0].userStories.push('Item');
  }*/

  createUserStory() {
    this.dialog.open(NewUserStoryComponent, {width: '500px'});
  }
}
