import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import * as constantRoutes from '../shared/constants';
import {ProjectDashboardComponent} from "../components/project/project-dashboard/project-dashboard.component";

export const routes: Routes = [

  { path: constantRoutes.loginRoute, component: LoginComponent },
  { path: constantRoutes.registerRoute, component: RegisterComponent },
  { path: constantRoutes.homeRoute, component: HomeComponent },
  { path: constantRoutes.userProfileRoute, component: UserProfileComponent },
  { path: constantRoutes.projectDashboard, component: ProjectDashboardComponent},
  { path: constantRoutes.emptyRoute, redirectTo: 'qsqboards', pathMatch: 'full' },
/*=======
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'project-dashboard', component: ProjectDashboardComponent},
  { path: 'profile', component: UserProfileComponent },
  { path: '',   redirectTo: '', pathMatch: 'full' }
>>>>>>> Stashed changes*/
];
