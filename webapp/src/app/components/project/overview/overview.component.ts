import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../../project-dialog/project-dialog.component';
import { map } from "rxjs/operators";
import * as ProjectDetailsActions from "../../../store/actions/project-details.action";
import { Observable, Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import ProjectDetailsState from 'app/store/states/project-details.state';
import * as BoardActions from '../../../store/actions/board.action';
import Project from 'app/store/models/project';
import BoardState from "../../../store/states/board.state";
import UserStory from "../../../store/models/userStory";


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  emptyImgUrl: string = '../../../assets/blank-profile-picture.png';
  projectDetails$: Observable<ProjectDetailsState>;
  ProjectDetailsSubscription: Subscription;
  projectDetails: Project;
  selectedProjectId: string;
  projectsDetailsError: Error = null;
  boardState$: Observable<BoardState>;
  boardSubscription: Subscription;
  allUserStories: UserStory[];
  allErrors: Error = null;

  loggedInUser = JSON.parse(sessionStorage.getItem('User'));

  constructor(private activatedroute: ActivatedRoute,
              private projectDialog: MatDialog,
              private store: Store<{ projectDetails: ProjectDetailsState }>,
              private storeBoard: Store<{ board: BoardState }>) {
    this.boardState$ = storeBoard.pipe(select('board'));
    this.projectDetails$ = store.pipe(select('projectDetails'));
    this.activatedroute.parent.params.subscribe(params => {
      this.selectedProjectId = params.title;
    });
  }

  ngOnInit(): void {
    this.storeBoard.dispatch(ProjectDetailsActions.BeginGetProjectDetailsAction({ payload: this.selectedProjectId }));
    this.ProjectDetailsSubscription = this.projectDetails$
      .pipe(
        map(res => {
          this.projectDetails = res.selectedProjectDetails;
          this.projectsDetailsError = res.projectsDetailsError;
          sessionStorage.setItem('SelectedProject', JSON.stringify(this.projectDetails));
        })
      )
      .subscribe();
    
    this.store.dispatch(BoardActions.BeginGetUserStoriesAction({projectId: this.selectedProjectId}));
    this.boardSubscription = this.boardState$
      .pipe(
        map(response => {
          this.allUserStories = response.userStories;
          this.allErrors = response.userStoriesError;
        })
      ).subscribe();
    
  }

  getProjectTitleAvatar() {
    if (this.projectDetails) {
      const projAvatarArr = this.projectDetails.title.split(" ")
      if (projAvatarArr.length > 1) {
        return projAvatarArr[0].charAt(0).concat(projAvatarArr[1].charAt(0)).toUpperCase();
      } else {
        return projAvatarArr[0].charAt(0).toUpperCase();
      }
    }
  }

}
