import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../auth/authentication.service';
import * as constantRoutes from '../../shared/constants';
import { baseURL } from 'app/shared/baseurl';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  socialImage: any;
  updateForm: FormGroup;
  url: string | ArrayBuffer;
  imageName: string;
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private qsqService: UserService,
    public authService: AuthenticationService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    if (!sessionStorage.getItem('User')) {
      this.router.navigateByUrl('');
    }
    this.updateForm = this.fb.group({
      userName: [{ value: '', disabled: true }, [Validators.required]],
      emailId: [{ value: '', disabled: true }, [Validators.required]],
      password: ['', []],
      conPassword: ['', this.passValid],
      image:['',null]
    });
    this.setForm();
    this.updateForm.controls.password.valueChanges
      .subscribe(
        x => this.updateForm.controls.conPassword.updateValueAndValidity()
      );
  }

  setForm() {
    this.authService.userProfile$.subscribe(data => {
     // this.socialImage = data.image;
      this.url= "http://localhost:3000/v1/users/profileImg/"+data.image;
      this.imageName = data.image;
      this.updateForm.setValue({
        userName: data.userName,
        emailId: data.emailId,
        password: '',
        conPassword: '',
        image: ''
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
        this.updateForm.patchValue({image:this.imageName})
        this.qsqService.updateUser(this.updateForm.value)
          .subscribe(res => {
            this.router.navigateByUrl(constantRoutes.homeRoute);
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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
      let formData = new FormData();
      this.imageName = event.target.files[0].name;
      formData.append('profile_img', event.target.files[0]);
      this.qsqService.uploadImage(formData).subscribe();
    }
  }

  public delete(){
    this.url = null;
  }
}
