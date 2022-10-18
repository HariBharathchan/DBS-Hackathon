import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isFormSubmitted: boolean;
  registrationForm: FormGroup;
  isLoggedIn: boolean;
  validationMessages = {
      userId: [
          { type: 'required', message: 'User ID is required.' }
        ],
      userName: [
          { type: 'required', message: 'User Name is required.' },
      ],
      password: [
          { type: 'required', message: 'Password is required.'}
      ]
    };
  validationPattern = {
    facultyName: new RegExp(`[a-zA-Z]+$`)
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
      this.isFormSubmitted = false;
      this.isLoggedIn = false;
      this.loggedIn();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
      userId: new FormControl(
        '', [Validators.required, Validators.maxLength(10)]
      ),
      userName: new FormControl(
        '', [Validators.required, Validators.pattern(this.validationPattern.facultyName)]
      ),
      password: new FormControl(
        '', [Validators.required]
      )
    })
  }

  async submitForm(): Promise<void> {
    this.isFormSubmitted = true;
    if(this.registrationForm.invalid) {
      return;
    }
    if(this.registrationForm.valid) {
      const id = this.registrationForm.value.facultyId;
      const ftData = JSON.parse(JSON.stringify(this.registrationForm.value));
    }
  }

  resetForm(): void {
    this.registrationForm.reset();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  loggedIn(): void {
    if(localStorage.getItem('flogin') === 'success' || localStorage.getItem('slogin') === 'success') {
      this.isLoggedIn = true;
    }
  }

}
