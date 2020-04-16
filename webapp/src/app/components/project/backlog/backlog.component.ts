import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import {select, Store} from "@ngrx/store";
import SelectedProjectState from "../../../store/states/selectedProject.state";
import Project from 'app/store/models/project';
import * as SelectedProjectActions from "../../../store/actions/selectedProject.action";
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import { Task } from '../../../store/models/task';
import { UserStory } from '../../../store/models/userStory';
import {BacklogItem} from '../../../models/backlog.model';

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

  tasks: Task[];
  userStories : UserStory[];
  backlogItems : BacklogItem[];
  selectedProject$: Observable<SelectedProjectState>;
  selectedProject: Project;
  SelectedProjectSubscription: Subscription;
  dataSource: any;
  displayedColumns: string[] = ['title', 'assignee', 'priority', 'status', 'type'];
  projectsError: Error = null;

  constructor(private projectService: ProjectService,
              private store: Store<{ selectedProject: SelectedProjectState}>) {
      //this.selectedProject$ = store.pipe(select('selectedProject'));
      this.backlogItems = [];
      this.projectService.getPendingTasks().forEach(task => {
        const item = new BacklogItem();
        item.assignee = task.assignee;
        item.id = task.id;
        item.description = task.description;
        item.status = task.status;
        item.storyPoints = task.storyPoints;
        item.priority = task.priority;
        item.title = task.title;
        item.type = "Task";
        this.backlogItems.push(item);
      });
      this.projectService.getPendingUserStories().forEach(task => {
        const item = new BacklogItem();
        item.assignee = task.assignee;
        item.id = task.id;
        item.description = task.description;
        item.status = task.status;
        item.storyPoints = task.storyPoints;
        item.priority = task.priority;
        item.title = task.title;
        item.type = "User Story";
        this.backlogItems.push(item);
      });
      this.dataSource = this.backlogItems;
   }

  ngOnInit(): void {
  //   this.SelectedProjectSubscription = this.selectedProject$
  //     .pipe(
  //       map(res => {
  //         this.selectedProject = res.selectedProject;
  //         this.projectsError = res.projectsError;
  //       })
  //     )
  //     .subscribe();

  //   this.store.dispatch(SelectedProjectActions.BeginGetSelectedProjectsAction());
  }

}
