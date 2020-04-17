import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
// import { MainDeskComponent } from './main-desk/main-desk.component';

import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { baseURL } from './shared/baseurl';
import socialConfigs from './shared/socialConfigs';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { OverviewComponent } from './components/project/overview/overview.component';
import { BoardComponent } from './components/project/board/board.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { navRoutes } from './app-routing/project-routes';
import { TokenInterceptorService } from './interceptors/TokenInterceptorService';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { UserFilterPipe } from './shared/user-filter.pipe';
import { ProjectFilterPipe } from './shared/project-filter.pipe';
import { StoreModule } from '@ngrx/store';
import { HighchartsChartModule } from 'highcharts-angular';
// @ts-ignore
import { EffectsModule } from '@ngrx/effects';
import { NewUserStoryComponent } from './components/project/new-user-story/new-user-story.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatLineModule } from '@angular/material/core';
import { routes } from './app-routing/routes';
import { ProjectDashboardComponent } from './components/project/project-dashboard/project-dashboard.component';
import { UserStoryDetailsComponent } from './components/project/user-story-details/user-story-details.component';
import { MatTableModule } from '@angular/material/table';
import { BacklogComponent } from './components/project/backlog/backlog.component';

// Reducers and effects
import { ProjectReducer } from './store/reducers/project.reducer';
import { ProjectEffects } from './effects/project.effects';
import { UserReducer } from './store/reducers/user.reducer';
import { UserEffects } from './effects/user.effects';
import { ProjectDetailsReducer } from './store/reducers/project-details.reducer';
import { ProjectDetailsEffects } from './effects/project-details.effects';
import { BoardReducer } from './store/reducers/board.reducer';
import { BoardEffects } from './effects/board.effects';
import { AnalyticsComponent } from './components/project/analytics/analytics.component';

const rootReducer = {
  projects: ProjectReducer,
  user: UserReducer,
  projectDetails: ProjectDetailsReducer,
  board: BoardReducer,
};

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    UserProfileComponent,
    SideNavComponent,
    OverviewComponent,
    BoardComponent,
    ProjectDialogComponent,
    UserFilterPipe,
    ProjectFilterPipe,
    ProjectDashboardComponent,
    NewUserStoryComponent,
    BacklogComponent,
    UserStoryDetailsComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    RouterModule.forRoot(routes),
    RouterModule.forChild(navRoutes),
    MatDialogModule,
    MatSelectModule,
    DragDropModule,
    MatLineModule,
    MatSelectModule,
    MatTableModule,
    HighchartsChartModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([ProjectEffects, BoardEffects, UserEffects, ProjectDetailsEffects])
  ],
  providers: [
    UserService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    },
    { provide: 'BaseURL', useValue: baseURL },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  entryComponents: [NewUserStoryComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
