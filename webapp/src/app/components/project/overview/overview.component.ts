import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Project from '../../../store/models/project';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../../project-dialog/project-dialog.component';
import {map} from "rxjs/operators";
import * as ProjectActions from "../../../store/actions/project.action";
import {Observable, Subscription} from "rxjs";
import ProjectState from "../../../store/states/project.state";
import {select, Store} from "@ngrx/store";
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  emptyImgUrl: string = '../../../assets/blank-profile-picture.png';
  projectTitle: String;;
  project: any;
  project$: Observable<ProjectState>;
  ProjectSubscription: Subscription;
  projectList: Project[] = [];
  projectsError: Error = null;
  
  constructor(private projectService: ProjectService, private activatedroute: ActivatedRoute,
              private projectDialog: MatDialog,
              private store: Store<{ projects: ProjectState}>) {
    this.project$ = store.pipe(select('projects'));
    this.activatedroute.parent.params.subscribe(params => {
      this.projectTitle = params.title;
    });
    /*this.projectService.getProjects().subscribe(items => {
      this.projects = items;
    });
    this.project = this.projects[0];
    */
  }

  /*This implementation is temporary as this is a blocker for me, @Bhavya please ch*/
  ngOnInit(): void {
    this.ProjectSubscription = this.project$
      .pipe(
        map(res => {
          this.projectList = res.projects;
          this.projectsError = res.projectsError;
        })
      )
      .subscribe();

    this.store.dispatch(ProjectActions.BeginGetProjectsAction());
    // this.projectTitle = this.activatedroute.snapshot.params.title;
    this.project = this.projectList.find(x => x.title === this.projectTitle);
    this.projectService.userProjectSubject$.next(this.project);
  }

  openProjectDialog(project: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: project._id,
      title: project.title,
      description: project.description,
      members: project.members,
      status: project.status
    };

    this.projectDialog.open(ProjectDialogComponent, dialogConfig);
  }

  getRandomColor() {
    const index = this.projectList.indexOf(this.project);
    const totalProjects = this.projectList.length
    const minIndex = index / totalProjects;
    const color = Math.ceil(0x101111 * minIndex).toString(16);
    return '#' + ('d9a16b' + color).slice(-6);
  }

  getProjectTitleAvatar() {
    const projAvatarArr = this.project.title.split(" ")
    if (projAvatarArr.length > 1) {
      return projAvatarArr[0].charAt(0).concat(projAvatarArr[1].charAt(0)).toUpperCase();
    } else {
      return projAvatarArr[0].charAt(0).toUpperCase();
    }
  }
}
