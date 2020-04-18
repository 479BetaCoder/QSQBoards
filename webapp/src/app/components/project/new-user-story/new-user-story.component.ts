import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProjectService} from '../../../services/project.service';
import {UserStoryService} from '../../../services/user-story.service';
import UserStory from '../../../store/models/userStory';
import {select, Store} from '@ngrx/store';
import * as BoardActions from '../../../store/actions/board.action';
import BoardState from '../../../store/states/board.state';
import {map} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import ProjectDetailsState from "../../../store/states/project-details.state";

@Component({
  selector: 'app-new-user-story',
  templateUrl: './new-user-story.component.html',
  styleUrls: ['./new-user-story.component.scss']
})
export class NewUserStoryComponent implements OnInit {
  createStoryForm: FormGroup;
  userProject: any;
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
    private dialogRef: MatDialogRef<NewUserStoryComponent>,
    private projectService: ProjectService,
    private userStoryService: UserStoryService,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<{ projects: BoardState }>,
    private storeProjectDetails: Store<{ projectDetails: ProjectDetailsState }>,
  ) {
    this.projectDetails$ = storeProjectDetails.pipe(select('projectDetails'));
  }

  ngOnInit() {
    this.selectedProject = JSON.parse(sessionStorage.getItem('SelectedProject'));
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
    this.createStoryForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [{value : 'New', disabled: true}, [Validators.required]],
      storyPoints: ['', [Validators.required, Validators.pattern]],
      priority: ['', [Validators.required]],
    });
  }

  /*
  * Create service is called and new UserStory is created
  * */
  onSubmit() {
    if (!this.createStoryForm.valid) {
      return false;
    } else {
      const newUserStory: UserStory = this.createStoryForm.value;
      newUserStory.status = 'New';
      this.store.dispatch(BoardActions.BeginCreateUserStory({ projectId:  this.selectedProject._id, payload: newUserStory }));
      this.dialogRef.close();
      /*this.userStoryService.createStory(this.createStoryForm.value, this.userProject._id).subscribe(
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
