import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import * as constantRoutes from '../shared/constants';

export const routes: Routes = [
  { path: constantRoutes.loginRoute, component: LoginComponent },
  { path: constantRoutes.registerRoute, component: RegisterComponent },
  { path: constantRoutes.homeRoute, component: HomeComponent },
  { path: constantRoutes.userProfileRoute, component: UserProfileComponent },
  { path: constantRoutes.emptyRoute, redirectTo: 'qsqboards', pathMatch: 'full' },
];
