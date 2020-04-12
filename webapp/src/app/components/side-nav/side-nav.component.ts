import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  projectTitle: String;
  project: any;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  constructor(private projectService: ProjectService, private activatedroute:ActivatedRoute) {
    this.projectTitle = this.activatedroute.snapshot.params.title
    this.project = this.projectService.getProject(this.projectTitle);
   }

  ngOnInit(): void {
  }

}
