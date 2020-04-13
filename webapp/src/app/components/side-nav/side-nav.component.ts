import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {ProjectService} from "../../services/project.service";
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  project: any;

  reason = '';
  projectTitle: String;

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
     // this.projectService.userProject$.subscribe(pr => this.projectTitle = pr.title);
  }

  back() {
    // this.router.navigate(['../', { title: this.projectTitle}], { relativeTo: this.route });
  }
}
