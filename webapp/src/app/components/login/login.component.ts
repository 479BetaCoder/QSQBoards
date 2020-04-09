import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../services/LoginRegister.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { Socialusers } from '../Models/socialusers'
// import { SocialloginService } from '../Service/sociallogin.service';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private qsqservice: LoginRegisterService,
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
          localStorage.setItem('token', data.token);
          loginForFirst ?  this._router.navigate(['/profile']) : this._router.navigate(['/home']);
        },
        error => { }
      );
  }

  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.qsqservice.login(this.loginForm.value)
        .subscribe(
          data => {
            this.authService.userProfileSubject$.next(data);
            localStorage.setItem('token', data.token);
            this._router.navigate(['/home']);
          },
          error => { }
        );
    }
  }

  movetoregister() {
    this._router.navigateByUrl('/register', { relativeTo: this._activatedRoute });
  }
}
