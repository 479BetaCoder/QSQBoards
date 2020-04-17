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
  newStatus: 'New';
  storyId: any;
  priorities = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'high', viewValue: 'High'}];
  selectedProject: any;
  projectDetails$: Observable<ProjectDetailsState>;
  ProjectDetailsSubscription: Subscription;
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
    private store: Store<{ projects: BoardState }>,
    private storeProjectDetails: Store<{ projectDetails: ProjectDetailsState }>,
  ) {
    this.projectDetails$ = storeProjectDetails.pipe(select('projectDetails'));
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.storyId = params.id);
    this.ProjectDetailsSubscription = this.projectDetails$
      .pipe(
        map(res => {
          if (res) {
            this.selectedProject = res.selectedProjectDetails;
            this.projectsDetailsError = res.projectsDetailsError;
          }
        })).subscribe();
    this.mainForm();
  }

  mainForm() {
    this.createTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [{value: 'New', disabled: true}, [Validators.required]],
      assignee: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
  }

  /*
  * Create service is called and new UserStory is created
  * */
  onSubmit() {
    if (!this.createTaskForm.valid) {
      return false;
    } else {
      const newTask: Task = this.createTaskForm.value;
      newTask.status = 'New';
      this.userStoryService.createTask(newTask, this.storyId);
      /*this.store.dispatch(BoardActions.BeginCreateUserStory({
        projectId: this.selectedProject._id,
        payload: newUserStory
      }));*/
      this.dialogRef.close();
      /*this.userStoryService.createStory(this.createTaskForm.value, this.userProject._id).subscribe(
        () => {
          console.log('Stories successfully created!');
          // this.ngZone.run(() => this.router.navigateByUrl('/boards'));
          this.dialogRef.close();
        }, (error) => {
          console.log(error);
        });*/
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
