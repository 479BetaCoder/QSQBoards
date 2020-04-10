import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProjectDialogComponent} from '../../project-dialog/project-dialog.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  projectTitle: String;
  project: any;
  projects: Project[];

  constructor(private projectService: ProjectService, private activatedroute:ActivatedRoute, private projectDialog: MatDialog) { 
    /*this.projectService.getProjects().subscribe(items => {
      this.projects = items;
    });
    this.project = this.projects[0];
    */
    this.projectTitle = this.activatedroute.snapshot.params.title
    this.project = this.projectService.getProject(this.projectTitle);
    //alert(this.projectTitle);
  }

  ngOnInit(): void {
  }

  openProjectDialog(project: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    alert(project.title);
    this.projectDialog.open(ProjectDialogComponent, {    
      data: {
        isUpdate:true
      }
 });
}
}
