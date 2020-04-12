import {Routes} from '@angular/router';
import {OverviewComponent} from '../components/project/overview/overview.component';
import {SideNavComponent} from '../components/side-nav/side-nav.component';
import {HomeComponent} from '../components/home/home.component';
import { BoardComponent } from '../components/project/board/board.component';
import {ProjectDashboardComponent} from '../components/project/project-dashboard/project-dashboard.component';

export const navRoutes: Routes = [
    { path : ':title', component: ProjectDashboardComponent,
    children: [
        { path : '', component: OverviewComponent},
        { path : 'board', component: BoardComponent}
    ]}
];
