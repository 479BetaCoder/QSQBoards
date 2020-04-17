import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import ProjectDetailsState from "../../../store/states/project-details.state";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectService} from "../../../services/project.service";
import {UserStoryService} from "../../../services/user-story.service";
import {select, Store} from "@ngrx/store";
import BoardState from "../../../store/states/board.state";
import {map} from "rxjs/operators";
import UserStory from "../../../store/models/userStory";
import * as BoardActions from "../../../store/actions/board.action";
import {Task} from "../../../store/models/task";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  createTaskForm: FormGroup;
  formData: any;
  updateForm: boolean;
  teamMates: any[];
  editUserStory: UserStory;
  storyId: string;
  priorities = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'high', viewValue: 'High'}];
  selectedProject: any;
  projectDetails$: Observable<ProjectDetailsState>;
  boardState$: Observable<BoardState>;
  ProjectDetailsSubscription: Subscription;
  BoardSubscription: Subscription;
  projectsDetailsError: Error = null;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private dialogRef: MatDialogRef<NewTaskComponent>,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private userStoryService: UserStoryService,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<{ projectDetails: ProjectDetailsState, userStory: BoardState }>,
  ) {
    this.projectDetails$ = store.pipe(select('projectDetails'));
    this.boardState$ = store.pipe(select('userStory'));
    this.formData = data;
  }

  ngOnInit() {
    this.createTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [{value : 'New', disabled: true}, [Validators.required]],
      assignee: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
    this.storyId = sessionStorage.getItem('storyId');
    this.selectedProject = JSON.parse(sessionStorage.getItem('SelectedProject'));
    this.teamMates = this.selectedProject.members;
    this.BoardSubscription = this.boardState$
      .pipe(
        map(res => {
          if (res) {
            this.editUserStory = res.userStory;
            this.projectsDetailsError = res.userStoriesError;
          }
        })
      ).subscribe();
    this.ProjectDetailsSubscription = this.projectDetails$
      .pipe(
        map(res => {
          if (res) {
            this.selectedProject = res.selectedProjectDetails;
            this.projectsDetailsError = res.projectsDetailsError;
          }
        })
      ).subscribe();
    if ( this.formData !== null) {
      this.updateTaskForm();
    }
  }

  updateTaskForm() {
    if (this.formData == null) {
      this.formData.heading = 'Create A Task';
    } else {
      this.updateForm = true;
      this.formData.heading = 'Update The Task';
      this.createTaskForm = this.fb.group({
        title: [this.formData.title, [Validators.required]],
        description: [this.formData.description, [Validators.required]],
        status: [this.formData.status, [Validators.required]],
        assignee: [this.formData.assignee.userName, [Validators.required]],
        priority: [this.formData.priority, [Validators.required]],
      });
    }
  }

  /*
  * Create service is called and new UserStory is created
  * */
  onSubmit() {
    if (!this.createTaskForm.valid) {
      return false;
    } else if (!this.updateForm) {
      const newTask: any = this.createTaskForm.value;
      newTask.status = 'New';
      newTask.storyId = this.storyId;
      this.userStoryService.createTask(newTask).subscribe(
        re => {
          console.log(re);
          this.store.dispatch(BoardActions.BeginGetUserStory({storyId: this.storyId}));
        }
      );
      this.dialogRef.close();
    } else if (this.updateForm) {
      const newTask: Task = this.createTaskForm.value;
      this.userStoryService.updateTask(newTask).subscribe(
        re => {
          console.log(re);
          this.store.dispatch(BoardActions.BeginGetUserStory({storyId: this.storyId}));
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
