import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
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
  dataSource: any;
  displayedColumns: string[] = ['number', 'title', 'assignee', 'priority', 'status'];

  constructor(private projectService: ProjectService,) {
    //ToDo: modify getpendingtasks to get tasks based on projectid
      //this.tasks = this.projectService.getPendingTasks();
      //this.dataSource = this.tasks;
   }

  ngOnInit(): void {
  }

}
