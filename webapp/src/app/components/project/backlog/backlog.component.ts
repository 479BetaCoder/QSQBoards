import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import {select, Store} from "@ngrx/store";
import SelectedProjectState from "../../../store/states/selectedProject.state";
import Project from 'app/store/models/project';
import * as SelectedProjectActions from "../../../store/actions/selectedProject.action";
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";
//import { Task } from '../../../models/task';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: "New"},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: "New"},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: "New"}
];

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  //tasks: Task[]
  selectedProject$: Observable<SelectedProjectState>;
  selectedProject: Project;
  SelectedProjectSubscription: Subscription;
  dataSource: any;
  displayedColumns: string[] = ['number', 'title', 'assignee', 'priority', 'status'];
  projectsError: Error = null;

  constructor(private projectService: ProjectService,
              private store: Store<{ selectedProject: SelectedProjectState}>) {
      this.selectedProject$ = store.pipe(select('selectedProject'));
      //this.tasks = this.projectService.getPendingTasks();
      //this.dataSource = this.tasks;
   }

  ngOnInit(): void {
    this.SelectedProjectSubscription = this.selectedProject$
      .pipe(
        map(res => {
          this.selectedProject = res.selectedProject;
          this.projectsError = res.projectsError;
        })
      )
      .subscribe();

    this.store.dispatch(SelectedProjectActions.BeginGetSelectedProjectsAction());
  }

}
