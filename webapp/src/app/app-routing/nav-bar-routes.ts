import {Routes} from '@angular/router';
import {OverviewComponent} from '../components/project/overview/overview.component';
import {SideNavComponent} from '../components/side-nav/side-nav.component';
import {HomeComponent} from '../components/home/home.component';
import { BoardComponent } from '../components/project/board/board.component';
import { BacklogComponent } from '../components/project/backlog/backlog.component';

export const navRoutes: Routes = [
    { path : 'home', component: SideNavComponent,
    children: [
        { path : ':title', component: OverviewComponent},
        { path : ':title/board', component: BoardComponent},
        { path : ':title/backlog', component: BacklogComponent}
    ]}
];
