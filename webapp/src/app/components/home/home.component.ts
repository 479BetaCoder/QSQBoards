import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProjectDialogComponent} from '../project-dialog/project-dialog.component';
import {User} from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects: Project[];
  user1: User = {
    UserName : "Dileep"
  };
  user2: User = {
    UserName : "Reddy"
  };
  constructor(private projectService: ProjectService,private projectDialog: MatDialog) {
    this.projects = projectService.getProjects();
   }

  ngOnInit(): void {
  }

  openProjectDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      users: [this.user1,this.user2]
  };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.projectDialog.open(ProjectDialogComponent, dialogConfig);
}
}