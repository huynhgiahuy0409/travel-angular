import { CookieService } from 'ngx-cookie-service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserService } from 'src/app/user/services/user.service';
import {
  AuthenticationResponse,
  UserInfoResponse,
} from 'src/app/shared/models/response';
import { Observable } from 'rxjs/internal/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { ProgressBarService } from 'src/app/user/services/progress-bar.service';
import { NotifyDialogService } from 'src/app/user/services/notify-dialog.service';

@Component({
  selector: 'app-valid-otp',
  templateUrl: './valid-otp.component.html',
  styleUrls: ['./valid-otp.component.scss'],
})
export class ValidOTPComponent implements OnInit, OnDestroy {
  userInfo!: UserInfoResponse;
  OTPCtrl: FormControl = new FormControl('', [Validators.required]);
  routerUrl!: string;
  isWrongCode: boolean = false;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router,
    public progressBarService: ProgressBarService,
    private activatedRoute: ActivatedRoute,
    private notifyDialogService: NotifyDialogService
  ) {
    this.routerUrl = router.url.split('?')[0];

    if (this.routerUrl === '/confirmemail') {
      let userId = cookieService.get('c-user');
      if (userId) {
        userService
          .getUserInfo(Number.parseInt(userId))
          .subscribe((response) => {
            this.userInfo = response.data;
          });
      } else {
        router.navigate(['/login']);
      }
    } else if (this.routerUrl === '/recover/code') {
      let userId = this.activatedRoute.snapshot.queryParams['uid'];
      if (userId) {
        userService.getUserInfo(userId).subscribe((response) => {
          this.userInfo = response.data;
        });
      } else {
        router.navigate(['/login']);
      }
    }
  }
  ngOnDestroy(): void {
    if (this.routerUrl === '/recover/code') {
      let userId = this.cookieService.get('c-user');
      if (userId) {
        this.cookieService.delete('c-user', '/');
      }
    }
  }

  ngOnInit(): void {
    this.OTPCtrl.valueChanges.subscribe((v) => {
      this.isWrongCode = false;
    });
  }
  validOTP() {
    let OTPValue = this.OTPCtrl.value;
    let userId = -1
    if(this.routerUrl === '/confirmemail'){
      userId = Number.parseInt(this.cookieService.get("c-user"))
    }else if(this.routerUrl === '/recover/code'){
      userId = this.userInfo.id
    }
    this.authService.validOTP(OTPValue + '', userId).subscribe(
      (response) => {
        let data: AuthenticationResponse = response.data;
        if (response.message == 'SUCCESS') {
          this.authService.JWTBSub.next(data.jwt);
          this.userService.userBSub.next(data.user);
          this.cookieService.delete('c-user', '/');
          if (this.routerUrl === '/confirmemail') {
            let dialogRef = this.notifyDialogService.open(
              'Xác thực thành công',
              'Tiến hành đổi mật khẩu mới của bạn',
              [['/home', 'Trở về trang chủ']]
            );
          } else if (this.routerUrl === '/recover/code') {
            this.router.navigate(['/recover/password'], {
              queryParams: {
                uid: this.userInfo.id,
                code: OTPValue,
              },
            });
          }
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
        let message = errorResponse.error.message;
        if (message === 'FAILED') {
          this.isWrongCode = true;
        }
      }
    );
  }
  onClickLogout() {
    this.cookieService.delete('c-user', '/');
    this.router.navigate(['/']);
  }
}
