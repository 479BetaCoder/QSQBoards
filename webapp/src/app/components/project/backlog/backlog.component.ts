import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { select, Store } from "@ngrx/store";
import Project from 'app/store/models/project';
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import ProjectDetailsState from '../../../store/states/project-details.state';
import * as ProjectDetailsActions from "../../../store/actions/project-details.action";
import {BacklogItem} from '../../../models/backlog.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: "New" },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: "New" },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: "New" }
];

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  currentProjectTitle: String;
  dataSource: any;
  displayedColumns: string[] = ['title', 'assignee', 'priority', 'status', 'type'];
  projectDetails$: Observable<ProjectDetailsState>;
  ProjectDetailsSubscription: Subscription;
  projectDetails: Project;
  projectsDetailsError: Error = null;

  constructor(private projectService: ProjectService,
    private store: Store<{ projectDetails: ProjectDetailsState }>) {
    this.projectDetails$ = store.pipe(select('projectDetails'));
    //this.tasks = this.projectService.getPendingTasks();
    //this.dataSource = this.tasks;
  }

  ngOnInit(): void {
    this.ProjectDetailsSubscription = this.projectDetails$
      .pipe(
        map(res => {
          this.projectDetails = res.selectedProjectDetails;
          this.projectsDetailsError = res.projectsDetailsError;
        })
      )
      .subscribe();

    // this.store.dispatch(ProjectDetailsActions.BeginGetProjectDetailsAction());
    this.currentProjectTitle = this.projectDetails.title;
  }

}
