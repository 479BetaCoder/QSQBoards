import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from "rxjs";
import ProjectDetailsState from "../../../store/states/project-details.state";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ProjectService} from "../../../services/project.service";
import {UserStoryService} from '../../../services/user-story.service';
import {select, Store} from "@ngrx/store";
import BoardState from "../../../store/states/board.state";
import {map, take} from "rxjs/operators";
import * as BoardActions from "../../../store/actions/board.action";
import UserStory from '../../../store/models/userStory';
import {Task} from "../../../store/models/task";
import {Location} from '@angular/common';
import {NewTaskComponent} from "../new-task/new-task.component";
import Project from "../../../store/models/project";
import User from "../../../store/models/user";


@Component({
  selector: 'app-user-story-details',
  templateUrl: './user-story-details.component.html',
  styleUrls: ['./user-story-details.component.scss']
})
export class UserStoryDetailsComponent implements OnInit {
  updateStoryForm: FormGroup;
  newStatus: 'Todo';
  storyId: string;
  editStory: UserStory;
  priorities = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'high', viewValue: 'High'}];
  status = [
    {value: 'New', viewValue: 'New'},
    {value: 'In Progress', viewValue: 'In Progress'},
    {value: 'one', viewValue: 'Done'}];
  selectedProject: Project;
  boardState$: Observable<BoardState>;
  boardSubscription: Subscription;
  allUserStories: UserStory[];
  allErrors: Error = null;
  projectsDetailsError: Error = null;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private dialog: MatDialog,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private userStoryService: UserStoryService,
    private store: Store<{ board: BoardState, projectDetails: ProjectDetailsState }>,
  ) {
    this.boardState$ = store.pipe(select('board'));
  }

  ngOnInit() {
    if (sessionStorage.getItem('User')) {
      this.mainForm();
      this.storyId = this.activatedRoute.snapshot.paramMap.get('id');
      this.store.dispatch(BoardActions.BeginGetUserStory({storyId: this.storyId}));
      this.selectedProject = JSON.parse(sessionStorage.getItem('SelectedProject'));
      this.userStoryService.getAllUserStories(this.selectedProject._id).subscribe((response) => {
        this.allUserStories = response;
        this.editStory = response.filter(story => story._id === this.storyId)[0];
        this.setForm();
      });
      /*this.store.pipe(select('projectDetails'), take(1)).subscribe((pro) => {
        this.selectedProject = pro;
        this.teamMates = pro.
      });*/
      this.boardSubscription = this.boardState$
        .pipe(
          map(response => {
            this.allErrors = response.userStoriesError;
            this.editStory = response.userStory;
            this.setForm();
          })
        ).subscribe();
      sessionStorage.setItem('storyId', this.storyId);
    }
  }

  setForm() {
    this.updateStoryForm.setValue({
      title: this.editStory.title,
      description: this.editStory.description,
      status: this.editStory.status,
      storyPoints: this.editStory.storyPoints,
      priority: this.editStory.priority,
    });
  }

  mainForm() {
    this.updateStoryForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      storyPoints: ['', [Validators.required, Validators.pattern]],
      priority: ['', [Validators.required]],
    });
  }

  createTask() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(NewTaskComponent, dialogConfig);
    // this.store.dispatch(BoardActions.BeginGetUserStory({storyId: this.storyId}));
  }

  onSubmit() {
    const updatedStory: UserStory = this.updateStoryForm.value;
    this.store.dispatch(BoardActions.BeginUpdateUserStory({storyId : this.storyId, payload: updatedStory}));
    this.location.back();
  }

  updateTask(task: Task) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      id: task._id,
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      status: task.status,
      priority: task.priority
    };

    this.dialog.open(NewTaskComponent, dialogConfig);
  }

  deleteTask(task, index) {
    if (window.confirm('Are you sure?')) {
      this.userStoryService.deleteTask(task._id).subscribe(() => {
          this.editStory.tasks.splice(index, 1);
        }
      );
    }
  }
}
