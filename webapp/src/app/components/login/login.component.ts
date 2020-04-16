import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { Socialusers } from '../Models/socialusers'
// import { SocialloginService } from '../Service/sociallogin.service';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { AuthenticationService } from '../../auth/authentication.service';
import * as constantRoutes from '../../shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  successMessage = '';
  loginForm: FormGroup;
  constructor(
    private qsqservice: UserService,
    public OAuth: AuthService,
    public authService: AuthenticationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

  }

  ngOnInit() {
    sessionStorage.removeItem('User');
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then(socialuser => {
      console.log(socialProvider, socialuser);
      console.log(socialuser);
      // this.authService.userProfileSubject$.next(socialuser);
      const reqObject = {
        emailId: socialuser.email,
        userName: socialuser.firstName + socialuser.lastName,
        password: socialuser.authToken,
        image: socialuser.photoUrl,
        socialAuth: 'SocialAuth' + socialuser.authToken
      };
      this.qsqservice.submitRegister(reqObject)
        .subscribe(
          data => {
            this.loginSocialUser(reqObject, true);
          },
          error => {
            if (error.status === 422) {
              this.loginSocialUser(reqObject, false);
            }
          }
        );
    });
  }

  loginSocialUser(reqObject, loginForFirst) {
    this.qsqservice.login(reqObject)
      .subscribe(
        data => {
          this.authService.userProfileSubject$.next(data);
          sessionStorage.setItem('User', JSON.stringify(data));
          loginForFirst ? this._router.navigate([constantRoutes.registerRoute]) : this._router.navigate([constantRoutes.homeRoute]);
        },
        error => {
          
        }
      );
  }

  login() {
    if (this.loginForm.valid) {
      this.qsqservice.login(this.loginForm.value)
        .subscribe(
          data => {
            this.authService.userProfileSubject$.next(data);
            sessionStorage.setItem('User', JSON.stringify(data));
            this._router.navigate([constantRoutes.homeRoute]);
          },
          error => {
            if(error.status == 401)
            {
              this.successMessage = "Invalid Credentials!";
            }
            else{
              this.successMessage = "Error occured while login!";
            } }
        );
    }
  }

  movetoregister() {
    this._router.navigateByUrl(constantRoutes.registerRoute, { relativeTo: this._activatedRoute });
  }
}
