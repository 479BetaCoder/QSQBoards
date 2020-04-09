import {Routes} from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {HomeComponent} from '../components/home/home.component';
import {UserProfileComponent} from '../components/user-profile/user-profile.component';
import {OverviewComponent} from '../components/project/overview/overview.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent}
];
