import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginRegisterService} from '../../services/LoginRegister.service';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  socialImage: any;
  updateForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private qsqService: LoginRegisterService,
    public authService: AuthenticationService,
    private router: Router) {  }

  ngOnInit() {
    // const id = this.actRoute.snapshot.paramMap.get('id');
    this.updateForm = this.fb.group({
      userName: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      password: ['', []],
      conPassword: ['', this.passValid],
      image: ['', []]
    });
    this.setForm();
    this.updateForm.controls.password.valueChanges
      .subscribe(
        x => this.updateForm.controls.conPassword.updateValueAndValidity()
      );
  }

  setForm() {
    this.authService.userProfile$.subscribe(data => {
      this.socialImage = data.image;
      this.updateForm.setValue({
        userName: data.userName,
        emailId: data.emailId,
        password: '',
        conPassword: '',
        image: data.image
      });
    });
  }

  /*
  * Calling the update method and route to home.
  * */
  onSubmit() {
    if (!this.updateForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        this.qsqService.updateUser(this.updateForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/home');
            console.log('Content updated successfully!');
          }, (error) => {
            console.log(error);
          });
      }
    }
  }

  passValid(control: AbstractControl) {
    if (control && (control.value !== null || true)) {
      const confPassword = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== confPassword || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

}
