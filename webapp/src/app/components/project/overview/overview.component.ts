import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input() projectId: String;

  project : Project;
  constructor(projectService: ProjectService, private activatedroute:ActivatedRoute) { 
    this.projectId = this.activatedroute.snapshot.params.projectId;
    this.project = projectService.getProject(this.projectId);
  }

  ngOnInit(): void {
  }

}
