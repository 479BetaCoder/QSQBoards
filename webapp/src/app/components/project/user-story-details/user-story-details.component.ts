import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from "rxjs";
import ProjectDetailsState from "../../../store/states/project-details.state";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProjectService} from "../../../services/project.service";
import {UserStoryService} from "../../../services/user-story.service";
import {select, Store} from "@ngrx/store";
import BoardState from "../../../store/states/board.state";
import {map, take} from "rxjs/operators";
import * as BoardActions from "../../../store/actions/board.action";
import UserStory from "../../../store/models/userStory";
import userStory from "../../../store/models/userStory";
import {NewUserStoryComponent} from "../new-user-story/new-user-story.component";
import {NewTaskComponent} from "../new-task/new-task.component";
import Project from "../../../store/models/project";

@Component({
  selector: 'app-user-story-details',
  templateUrl: './user-story-details.component.html',
  styleUrls: ['./user-story-details.component.scss']
})
export class UserStoryDetailsComponent implements OnInit {
  updateStoryForm: FormGroup;
  newStatus: 'Todo';
  storyId: string;
  editStory: userStory;
  priorities = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'high', viewValue: 'High'}];
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
      this.store.dispatch(BoardActions.BeginGetUserStory({storyId: this.storyId}));
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
    this.dialog.open(NewTaskComponent, {width: '500px'});
  }

  onSubmit() {
    console.log('');
  }
}
