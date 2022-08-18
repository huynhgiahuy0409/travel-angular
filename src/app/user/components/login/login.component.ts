import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { RegisterDialogComponent } from 'src/app/components/register-dialog/register-dialog.component';
import { LoginRequest } from 'src/app/shared/models/request';
import { AuthenticationResponse } from 'src/app/shared/models/response';
import { AuthService } from '../../services/auth.service';
import { NotifyDialogService } from '../../services/notify-dialog.service';
import { UserService } from '../../services/user.service';
import { UserProfileResponse } from './../../../shared/models/response';
export function matchedPassword(c: AbstractControl) {
  const passwordValue = c.get('password')?.value;
  const confirmPasswordValue = c.get('confirmPassword')?.value;
  if (passwordValue === confirmPasswordValue) {
    return null;
  } else {
    return { notMatch: true };
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  countSlide: number = 0;
  token: string | undefined;
  loginForm!: UntypedFormGroup;
  registerForm!: UntypedFormGroup;
  isWrongUsername: boolean = false;
  isWrongPassword: boolean = false;
  public log: string[] = [];
  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private fb: UntypedFormBuilder,
    public renderer: Renderer2,
    private cookieService: CookieService,
    private authService: AuthService,
    private userService: UserService,
    private matDialogService: NotifyDialogService
  ) {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      // recaptchaReactive: new FormControl('recaptcha', Validators.required),
    });
    this.registerForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      fullName: new UntypedFormControl('', [Validators.required]),
      passwordGr: new UntypedFormGroup(
        {
          password: new UntypedFormControl(null, Validators.required),
          confirmPassword: new UntypedFormControl(null, Validators.required),
        },
        matchedPassword
      ),
    });
  }

  ngOnInit(): void {
    if (this.cookieService.check('c-user')) {
      this.router.navigate(['/confirmemail']);
    }
    this.runSlideShow(3000);
    this.registerForm.valueChanges.subscribe((e) => {
      this.setLevelPassword('level-password__progress-bar', e);
    });
    this.registerForm.valueChanges.pipe(tap());
  }
  runSlideShow(ms: number) {
    setInterval(() => {
      this.countSlide++;
      let nameOld = `hinh${this.countSlide}`;
      let nameNew = `hinh${this.countSlide + 1}`;
      if (this.countSlide == 5) {
        nameNew = `hinh${1}`;
        this.countSlide = 0;
      }
      let nameOldObject = document.getElementById(nameOld);
      if (nameOldObject != null) {
        nameOldObject.style.opacity = '0';
      }
      let nameNewObject = document.getElementById(nameNew);
      if (nameNewObject != null) {
        nameNewObject.style.opacity = '1';
      }
      let child = document.getElementById('child');
      if (child != null) {
        child.style.left = `${this.countSlide * 20}%`;
      }
      let content_child = document.getElementById('left-content__progress-bar');
      if (content_child != null) {
        content_child.innerText = `0${this.countSlide + 1}`;
      }
    }, ms);
  }
  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }
  showPassword(iconElement: HTMLElement, passwordInputElement: HTMLElement) {
    console.log(passwordInputElement.getAttribute('type'));
    if (passwordInputElement.getAttribute('type') === 'password') {
      passwordInputElement.setAttribute('type', 'text');
      iconElement.classList.remove('fa', 'fa-eye');
      iconElement.classList.add('far', 'eye', 'fa-eye-slash');
    } else {
      passwordInputElement.setAttribute('type', 'password');
      iconElement.classList.remove('far', 'eye', 'fa-eye-slash');
      iconElement.classList.add('fa', 'fa-eye');
    }
  }
  public addTokenLog(message: string, token: string | null) {
    console.log(message);
    console.log(token);
  }
  /*  */
  checkStrength(p: string) {
    let force = 0;
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);
    const flags = [lowerLetters, upperLetters, numbers, symbols];
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }
    force += 2 * p.length + (p.length >= 10 ? 1 : 0);
    force += passedMatches * 10;
    // short password
    force = p.length <= 8 ? Math.min(force, 10) : force;
    // poor variety of characters
    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;
    force = passedMatches === 4 ? Math.min(force, 40) : force;
    return force;
  }
  setLevelPassword(id: string, e: any) {
    const colors = [
      '#ccc',
      'rgb(255, 123, 92)',
      '#f1f17b',
      'rgb(192, 254, 116)',
      'rgb(140, 255, 0)',
    ];
    const progressBarEle = document.getElementById(id);
    const barsEle = progressBarEle?.childNodes;
    const nextSiblingProgressBarEle = this.renderer.nextSibling(progressBarEle);
    const force = this.checkStrength(e.passwordGr.password);
    barsEle?.forEach((bar, i) => {
      if (force == 0) {
        this.renderer.setStyle(bar, 'background-color', colors[0]);
        nextSiblingProgressBarEle.innerHTML = 'Hãy nhập mật khẩu';
        this.renderer.setStyle(nextSiblingProgressBarEle, 'color', colors[0]);
      } else if (force == 10) {
        if (i == 0) {
          this.renderer.setStyle(bar, 'background-color', colors[1]);
        } else {
          this.renderer.setStyle(bar, 'background-color', colors[0]);
        }
        nextSiblingProgressBarEle.innerHTML = 'Yếu';
        this.renderer.setStyle(nextSiblingProgressBarEle, 'color', colors[1]);
      } else if (force == 20) {
        if (i == 2 || i == 3) {
          this.renderer.setStyle(bar, 'background-color', colors[0]);
        } else {
          this.renderer.setStyle(bar, 'background-color', colors[2]);
        }
        nextSiblingProgressBarEle.innerHTML = 'Vừa';
        this.renderer.setStyle(nextSiblingProgressBarEle, 'color', colors[2]);
      } else if (force == 30) {
        if (i == 3) {
          this.renderer.setStyle(bar, 'background-color', colors[0]);
        } else {
          this.renderer.setStyle(bar, 'background-color', colors[3]);
        }
        nextSiblingProgressBarEle.innerHTML = 'Mạnh';
        this.renderer.setStyle(nextSiblingProgressBarEle, 'color', colors[3]);
      } else if (force == 40) {
        this.renderer.setStyle(bar, 'background-color', colors[4]);
        nextSiblingProgressBarEle.innerHTML = 'Mạnh';
        this.renderer.setStyle(nextSiblingProgressBarEle, 'color', colors[4]);
      }
    });
  }
  onClickRegister() {
    this.matDialog.open(RegisterDialogComponent, {
      maxWidth: '435px',
      maxHeight: '100vh',
    });
  }
  loginSubmit() {
    this.isWrongPassword = false
    this.isWrongUsername = false
    let loginFormValue = this.loginForm.value;
    let loginRequest: LoginRequest = {
      ...loginFormValue,
      email: loginFormValue.username,
    };
    this.authService.login(loginRequest).subscribe(
      (response) => {
        console.log(response);
        
        let data: AuthenticationResponse =
          response.data;
        if (data) {
          let user = data.user
          let JWT = data.jwt
          let message = response.message;
          if (message === 'ACTIVE') {
            this.userService.userBSub.next(user);
            this.authService.JWTBSub.next(JWT);
            this.router.navigate(['/home']);
          } else if (message === 'INACTIVE') {
            this.cookieService.set('c-user', user.id + '');
            this.router.navigate(['/confirmemail']);
          }
        }
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
        
        let {error} = errorResponse
        if(error.message === "WRONG USERNAME"){
          this.isWrongUsername = true
        }else if(error.message === "WRONG PASSWORD"){
          this.isWrongPassword = true
        }else {
          this.matDialogService.open("Tài khoản bị khóa","Tài khoản của bạn đã bị khóa do vi phạm tiêu chuẩn cộng đồng")
        }
      }
    );
  }
 
}
