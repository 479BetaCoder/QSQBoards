import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../auth/authentication.service";
import * as constantRoutes from '../../shared/constants';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects: Project[];
  searchTerm: string;
  constructor(private projectService: ProjectService, private projectDialog: MatDialog, private router: Router,
    private authService: AuthenticationService) {
    this.projectService.getProjects().subscribe(items => {
      this.projects = items;
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('User')) {
      const user = JSON.parse(sessionStorage.getItem('User'));
      this.authService.userProfileSubject$.next(user);
    } else {
      this.router.navigateByUrl(constantRoutes.emptyRoute);
    }
  }

  openProjectDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.projectDialog.open(ProjectDialogComponent, dialogConfig);
  }

  getRandomColor(index) {
    const totalProjects = this.projects.length
    const minIndex = index / totalProjects;
    const color = Math.ceil(0x101111 * minIndex).toString(16);
    return '#' + ('d9a16b' + color).slice(-6);
  }

  getProjectTitleAvatar(project) {
    const projAvatarArr = project.title.split(" ")
    if (projAvatarArr.length > 1) {
      return projAvatarArr[0].charAt(0).concat(projAvatarArr[1].charAt(0)).toUpperCase();
    } else {
      return projAvatarArr[0].charAt(0).toUpperCase();
    }
  }

}
