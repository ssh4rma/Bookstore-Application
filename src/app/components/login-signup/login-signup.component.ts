import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import { ToolbarDataService } from 'src/app/service/toolbar-data/toolbar-data.service';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent {
  hide = true;
  selectedTabIndex: number = 0;
  loginPage = false;
  isLoginActive = true;
  isSignupActive = false;

  data = inject(MAT_DIALOG_DATA);

  //reactive form for login and signup page
  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly toolbarData: ToolbarDataService,
    public readonly dialogRef: MatDialogRef<LoginSignupComponent>
  ) {}

  singupForm = this.fb.group({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$'),
    ]),
    mobileNumber: new FormControl('', [
      Validators.minLength(10),
      Validators.required,
    ]),
  });

  loginForm = this.fb.group({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$'),
    ]),
  });

  getErrorMessage() {
    const emailControlLogin = this.loginForm.get('emailId');
    const emailControlSignup = this.loginForm.get('emailId');

    if (
      emailControlLogin?.hasError('required') ||
      emailControlSignup?.hasError('required')
    ) {
      return 'You must enter a email';
    }

    return emailControlLogin?.hasError('email') ||
      emailControlSignup?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  onClickLoginBtn(): void {
    this.isLoginActive = true;
    this.isSignupActive = false;
    this.toolbarData.loginState$.next(true);
  }

  onClickSignupBtn(): void {
    this.isSignupActive = true;
    this.isLoginActive = false;
  }

  onClickSignup(): void {
    this.isLoginActive = true;
    this.isSignupActive = false;
  }

  onLogin(): void {
    let data = {
      email: this.loginForm.get('emailId')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.loginService.userLogin(data).subscribe({
      next: (res: any) => {
        console.log(res.result.accessToken);
        localStorage.setItem('token', res.result.accessToken);
        this.toolbarData.loginState$.next(true);
        this.dialogRef.close();
      },
      error: (err) => console.log(err),
    });
  }

  onSignup(): void {
    let data = {
      fullName: this.singupForm.get('fullName')?.value,
      email: this.singupForm.get('emailId')?.value,
      password: this.singupForm.get('password')?.value,
      phone: this.singupForm.get('mobileNumber')?.value,
    };

    this.loginService.userSignup(data).subscribe({
      next: (res: any) => {
        console.log('User created successfully');
      },
      error: (err) => console.log(err),
    });

    let firstName = this.singupForm.get('fullName')?.value;
    let name =
      typeof firstName === 'string' && firstName.length > 0
        ? firstName.split(' ')[0]
        : '';

    localStorage.setItem('name', name);

    this.isLoginActive = true;
    this.isSignupActive = false;
    this.singupForm.get('fullName')?.setValue('');
    this.singupForm.get('emailId')?.setValue('');
    this.singupForm.get('password')?.setValue('');
    this.singupForm.get('mobileNumber')?.setValue('');
  }
}
