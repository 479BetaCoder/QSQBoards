import {Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {BoardComponent} from '../components/board/board.component';

export const homeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path : 'board', component: BoardComponent },
      { path: '', component: HomeComponent },
    ]
  },

];
