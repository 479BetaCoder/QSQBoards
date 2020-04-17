import {ActivatedRoute, Route, Router} from "@angular/router";
import * as constantRoutes from "../../../shared/constants";
import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as Highcharts from 'highcharts';
import {Observable, Subject, Subscription} from 'rxjs';
import ProjectDetailsState from "../../../store/states/project-details.state";
import UserStory from '../../../store/models/userStory';
import BoardState from '../../../store/states/board.state';
import {map} from 'rxjs/operators';
import * as BoardActions from '../../../store/actions/board.action';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

   projectDetails$: Observable<ProjectDetailsState>;
  ProjectDetailsSubscription: Subscription;
  boardState$: Observable<BoardState>;
  boardSubscription: Subscription;
  allUserStories: UserStory[];
  allErrors: Error = null;
  projectsDetailsError: Error = null;
  selectedProject: any;
  openCount : number = 0;
  inProgressCount: number =0;
  finishedCount : number =0;
  lowCount : number = 0;
  mediumCount: number =0;
  highCount : number =0;

  constructor(private router: Router,private storePrDetail: Store<{ projectDetails: ProjectDetailsState }>,
   private store: Store<{board: BoardState }>) {
      this.boardState$ = store.pipe(select('board'));
    this.projectDetails$ = storePrDetail.pipe(select('projectDetails'));
    
    }

  ngOnInit(): void {
   if (sessionStorage.getItem('User')) {
      this.ProjectDetailsSubscription = this.projectDetails$
        .pipe(
          map(res => {
            if (res) {
              this.selectedProject = res.selectedProjectDetails;
              this.projectsDetailsError = res.projectsDetailsError;
            }
          })).subscribe();
      this.boardSubscription = this.boardState$
        .pipe(
          map(response => {
            this.allUserStories = response.userStories;
            this.allErrors = response.userStoriesError;
          })
        ).subscribe();
      this.store.dispatch(BoardActions.BeginGetUserStoriesAction({projectId: this.selectedProject._id}));
      this.constructGraphData();
    } else {
      this.router.navigateByUrl(constantRoutes.emptyRoute);
    }
  }

  constructGraphData(){
      this.allUserStories.forEach(
         story => {
            if(story.status == "todo"){
               this.openCount++;
            }
            if(story.status == "In Progress"){
               this.inProgressCount++;
            }
            if(story.status == "Done"){
               this.finishedCount++;
            }
            if(story.priority == "low"){
               this.lowCount++;
            }
            if(story.priority == "medium"){
               this.mediumCount++;
            }
            if(story.priority == "high"){
               this.highCount++;
            }
         }
      )

      this.chartOptions = {
         chart : {
            plotBorderWidth: null,
            plotShadow: false
         },
         title : {
            text: 'Project Stats'   
         },
         tooltip : {
               pointFormat: '{series.name}:{point.y}'
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
               ['ToDo',   this.openCount],
               ['In Progress', this.inProgressCount],
               {
                  name: 'Done',
                  y: this.finishedCount,
                  sliced: true,
                  selected: true
               }
            ]
         }]
      };


      this.burnDownChartOptions = {
         chart: {
            type: 'bar'
         },
         title: {
            text: 'Priority vs Number of Tasks'
         },
         legend : {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 250,
            y: 100,
            floating: true,
            borderWidth: 1,
           
            backgroundColor: ('#FFFFFF'), shadow: true
            },
            xAxis:{
               categories: ['Tasks'], title: {
               text: null
            } 
         },
         yAxis : {
            min: 0, title: {
               text: 'Number of tasks', align: 'high'
            },
            labels: {
               overflow: 'justify'
            }
         },
         plotOptions : {
            bar: {
               dataLabels: {
                  enabled: true
               }
            }
         },
         credits:{
            enabled: false
         },
         series: [
            {
               name: 'Hign',
               data: [this.highCount]
            }, 
            {
               name: 'Medium',
               data: [this.mediumCount]
            }, 
            {
               name: 'Low',
               data: [this.lowCount]      
            }
         ]
      };
  }

  highcharts = Highcharts;
  chartOptions = {};


   burnDownHighcharts = Highcharts;
   burnDownChartOptions = {
   };
}
