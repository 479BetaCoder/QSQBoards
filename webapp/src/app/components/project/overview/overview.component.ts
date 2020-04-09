import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  project : Project;
  constructor(projectService: ProjectService) { 
    this.project = projectService.getProject();
  }

  ngOnInit(): void {
  }

}
