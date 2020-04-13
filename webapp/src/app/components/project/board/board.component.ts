import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../../models/board.model';
import {Column} from '../../../models/column.model';
import {MatDialog} from '@angular/material/dialog';
import {NewUserStoryComponent} from '../new-user-story/new-user-story.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  board: Board = new Board('Test Board', [
    new Column('Todo', [
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
    ])
  ]);

  ngOnInit() {
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
    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;*/
    this.dialog.open(NewUserStoryComponent, {width: '500px'});
    //this.dialog.open(NewUserStoryComponent, dialogConfig);
  }
}
