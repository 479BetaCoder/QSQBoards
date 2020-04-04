import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../auth/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private profile: any;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.profile = this.authService.userProfile$;
  }

}
