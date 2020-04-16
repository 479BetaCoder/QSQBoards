import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';
import { Router } from "@angular/router";
import * as constantRoutes from '../../shared/constants';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profile: any;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('User')) {
      this.profile = JSON.parse(sessionStorage.getItem('User'));
      //this.authService.userProfile$.subscribe(prof => this.profile = prof);
    }
  }

  navigateToHome():void{
    this.router.navigateByUrl(constantRoutes.homeRoute);
  }
  logoutProfile(): void {
    this.authService.userProfile$.subscribe().unsubscribe();
    sessionStorage.removeItem('User');
    this.router.navigateByUrl(constantRoutes.emptyRoute);
  }

  editProfile(): void {
    this.router.navigateByUrl(constantRoutes.userProfileRoute);
  }
}
