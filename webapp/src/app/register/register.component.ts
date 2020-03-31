import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QsqserviceService } from '../qsqservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  successMessage = '';
  myForm: FormGroup;
  constructor(private _qsqservice:QsqserviceService,
    private _router: Router, private _activateRoute:ActivatedRoute) {
    this.myForm = new FormGroup({
      emailId: new FormControl(null, Validators.email),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator)
    });

    this.myForm.controls.password.valueChanges
      .subscribe(
        x => this.myForm.controls.cnfpass.updateValueAndValidity()
      );
  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

  register(){
    this._qsqservice.submitRegister(this.myForm.value)
    .subscribe(
      data => this.successMessage = 'Registration Succesfull',
      error => this.successMessage = 'Error occurred'
    );
  }

  movetologin(){
    this._router.navigate(['../login'],{relativeTo: this._activateRoute});
  }
}
