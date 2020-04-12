import {Routes} from '@angular/router';
import {OverviewComponent} from '../components/project/overview/overview.component';
import {SideNavComponent} from '../components/side-nav/side-nav.component';
import {HomeComponent} from '../components/home/home.component';
import { BoardComponent } from '../components/project/board/board.component';

export const navRoutes: Routes = [
    { path : 'home', component: SideNavComponent,
    children: [
        { path: '', component: HomeComponent },
        { path : ':title', component: OverviewComponent},
        { path : ':title/board', component: BoardComponent}
    ]}
];
