import {Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {BoardComponent} from '../components/board/board.component';
import {OverviewComponent} from '../components/project/overview/overview.component';


export const homeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: ':projectTitle', component: OverviewComponent, data : {projectId : 'werty'}},
      { path : 'board', component: BoardComponent },
      { path: '', component: HomeComponent },
    ]
  },

];
