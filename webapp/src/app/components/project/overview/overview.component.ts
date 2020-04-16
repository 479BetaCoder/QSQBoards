import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../../project-dialog/project-dialog.component';
import { map } from "rxjs/operators";
import * as ProjectDetailsActions from "../../../store/actions/project-details.action";
import { Observable, Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import ProjectDetailsState from 'app/store/states/project-details.state';
import Project from 'app/store/models/project';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  emptyImgUrl: string = '../../../assets/blank-profile-picture.png';
  projectDetails$: Observable<ProjectDetailsState>;
  ProjectDetailsSubscription: Subscription;
  projectDetails: Project;
  selectedProjectId: string;
  projectsDetailsError: Error = null;

  loggedInUser = JSON.parse(sessionStorage.getItem('User'));

  constructor(private activatedroute: ActivatedRoute, private projectDialog: MatDialog,
    private store: Store<{ projectDetails: ProjectDetailsState }>) {
    this.projectDetails$ = store.pipe(select('projectDetails'));
    this.activatedroute.parent.params.subscribe(params => {
      this.selectedProjectId = params.title;
    });
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
    this.store.dispatch(ProjectDetailsActions.BeginGetProjectDetailsAction({ payload: this.selectedProjectId }));
  }

  getProjectTitleAvatar() {
    if (this.projectDetails) {
      const projAvatarArr = this.projectDetails.title.split(" ")
      if (projAvatarArr.length > 1) {
        return projAvatarArr[0].charAt(0).concat(projAvatarArr[1].charAt(0)).toUpperCase();
      } else {
        return projAvatarArr[0].charAt(0).toUpperCase();
      }
    }
  }

  highcharts = Highcharts;
   chartOptions = {   
      chart : {
         plotBorderWidth: null,
         plotShadow: false
      },
      title : {
         text: 'Project Stats'   
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
      
            dataLabels: {
               enabled: false           
            },
      
            showInLegend: true
         }
      },
      series : [{
         type: 'pie',
         name: 'User Stories',
         data: [
            ['Open',   45.0],
            ['In Progress',       26.8],
            {
               name: 'finished',
               y: 12.8,
               sliced: true,
               selected: true
            }
         ]
      }]
   };


   burnDownHighcharts = Highcharts;
   burnDownChartOptions = {   
      chart: {
         type: "spline"
      },
      title: {
         text: "Burndown Chart"
      },
      subtitle: {
         text: "Source: Qsqboards"
      },
      xAxis:{
         categories:["1st", "5th", "10th", "15th", "20th", "25th","30th"]
      },
      yAxis: {          
         title:{
            text:"Story Points"
         } 
      },
      plotOptions: {
         series: {
            dataLabels: {
               enabled: true
            }
         }
      },
      series: [{
         name: 'Ideal Burndown',
         data: [30.0, 25.0, 20.0, 15.0, 10.0, 5.0, 0.0,-1.0]
      },
      {
         name: 'Actual Burndown',
         data: [30.0,30.0,28.0,25.0,20.0,15.0,0.0,-1.0]
      }]
   };
}
