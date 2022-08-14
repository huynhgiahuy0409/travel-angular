import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from 'src/app/shared/models/request';
import {
  UserProfileResponse,
  AuthenticationResponse,
} from 'src/app/shared/models/response';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserService } from 'src/app/user/services/user.service';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  isWrongUsername: boolean = false;
  isWrongPassword: boolean = false;
  forbidden: boolean = false
  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private fb: FormBuilder,
    public renderer: Renderer2,
    private cookieService: CookieService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      // recaptchaReactive: new FormControl('recaptcha', Validators.required),
    });
  }

  ngOnInit(): void {}
  loginSubmit() {
  this.isWrongUsername = false;
  this.isWrongPassword = false;
  this.forbidden = false
    let loginFormValue = this.loginForm.value;
    let loginRequest: LoginRequest = {
      email: loginFormValue.username,
      password: loginFormValue.password,
    };
    this.authService.login(loginRequest).subscribe(
      (response) => {
        let data: AuthenticationResponse =
          response.data;
          let user = data.user;
          let JWT = data.jwt;
          if(user.roleName === "ROLE_ADMIN"){
            this.userService.userBSub.next(user);
            this.authService.JWTBSub.next(JWT);
            this.router.navigate(['/administrator/home']);
          }else if(user.roleName !== "ROLE_ADMIN"){
            this.forbidden = true
          }
      },
      (errorResponse: HttpErrorResponse) => {
          let {error} = errorResponse
          if(error.message === "WRONG USERNAME"){
            this.isWrongUsername = true
          }else if(error.message === "WRONG PASSWORD"){
            this.isWrongPassword = true
          }
      }
    );
  }
  onClickRegister() {
    this.matDialog.open(RegisterDialogComponent, {
      width: '500px',
    });
  }
}
