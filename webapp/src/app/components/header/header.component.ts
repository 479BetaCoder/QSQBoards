import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profile: any;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.userProfile$.subscribe(prof =>  this.profile = prof);
  }
  logoutProfile(): void {
    this.authService.userProfile$.subscribe().unsubscribe();
  }
}
