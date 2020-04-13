import {Routes} from '@angular/router';
import {OverviewComponent} from '../components/project/overview/overview.component';
import { BoardComponent } from '../components/project/board/board.component';
import {ProjectDashboardComponent} from '../components/project/project-dashboard/project-dashboard.component';

export const navRoutes: Routes = [
    { path : 'project-dashboard/:title', component: ProjectDashboardComponent,
    children: [
        { path : 'board', component: BoardComponent},
        { path : '', component: OverviewComponent},
    ]}
];
