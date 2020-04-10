import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProjectDialogComponent} from '../project-dialog/project-dialog.component';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../auth/authentication.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects: Project[];
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
      this.router.navigateByUrl('');
    }
  }

  openProjectDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.projectDialog.open(ProjectDialogComponent, dialogConfig);
}
}
