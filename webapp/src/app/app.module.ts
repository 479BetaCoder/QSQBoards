import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
// import { MainDeskComponent } from './main-desk/main-desk.component';

import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import {LoginRegisterService} from './services/LoginRegister.service';
import {ProjectService} from './services/project.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {baseURL} from './shared/baseurl';
import socialConfigs from './shared/socialConfigs';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule, MatNavList} from '@angular/material/list';
import { OverviewComponent } from './components/project/overview/overview.component';
import { BoardComponent } from './components/project/board/board.component';
//import { BoardComponent } from './components/board/board.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {RouterModule} from '@angular/router';
import {homeRoutes} from './app-routing/home-routes';
import {TokenInterceptorService} from './interceptors/TokenInterceptorService';

//import { BoardComponent } from './components/board/board.component';


@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    UserProfileComponent,
    SideNavComponent,
    OverviewComponent,
    BoardComponent,
    //BoardComponent,
    // UserDashboardComponent,
    // MainDeskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatSnackBarModule,
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
    RouterModule.forChild(homeRoutes)
  ],
  providers: [
    LoginRegisterService,
    ProjectService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    },
    { provide: 'BaseURL', useValue: baseURL },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
