import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  AuthenticationResponse,
  UserProfileResponse
} from 'src/app/shared/models/response';
import { AuthService } from 'src/app/user/services/auth.service';
import { NotifyDialogService } from 'src/app/user/services/notify-dialog.service';
import { ProgressBarService } from 'src/app/user/services/progress-bar.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-valid-otp',
  templateUrl: './valid-otp.component.html',
  styleUrls: ['./valid-otp.component.scss'],
})
export class ValidOTPComponent implements OnInit, OnDestroy {
  userProfile!: UserProfileResponse;
  OTPCtrl: FormControl = new FormControl('', [Validators.required]);
  routerPath: string | undefined;
  sourcePath!: string
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
    this.routerPath = this.activatedRoute.routeConfig?.path;
    this.sourcePath = this.activatedRoute.snapshot.queryParams.sPath
    if (this.routerPath === 'confirmemail') {
      let userId = cookieService.get('c-user');
      if (userId) {
        userService
          .findByUserId(Number.parseInt(userId))
          .subscribe((response) => {
            this.userProfile = response;
          });
      } else {
        router.navigate(['/login']);
      }
    } else if (this.routerPath === 'recover/code') {
      let userId = this.activatedRoute.snapshot.queryParams['uid'];
      if (userId) {
        userService.findByUserId(userId).subscribe((response) => {
          this.userProfile = response;
        });
      }else {
        if(this.sourcePath === "user-login"){
          this.router.navigate(['/login'])
        }else if(this.sourcePath === "admin-login"){
          this.router.navigate(['/administrator-login'])
        }else{
          this.router.navigate(['/login'])
        }
      }
    }
  }
  onClickCancel(){
    if(this.routerPath === "confirmemail"){
      this.cookieService.delete('c-user', '/');
      this.router.navigate(['/']);
    }else if(this.routerPath === 'recover/code'){
      if(this.sourcePath === 'admin-login'){
        this.router.navigate(['/administrator-login'])
      }else if(this.sourcePath === 'user-login'){
        this.router.navigate(['/login'])
      }
    }
  }
  
  ngOnInit(): void {
    this.OTPCtrl.valueChanges.subscribe((v) => {
      this.isWrongCode = false;
    });
  }
  ngOnDestroy(): void {
    if (this.routerPath === 'recover/code') {
      let userId = this.cookieService.get('c-user');
      if (userId) {
        this.cookieService.delete('c-user', '/');
      }
    }
  }

  validOTP() {
    let OTPValue = this.OTPCtrl.value;
    let userId = -1
    if(this.routerPath === 'confirmemail'){
      userId = Number.parseInt(this.cookieService.get("c-user"))
    }else if(this.routerPath === 'recover/code'){
      userId = this.userProfile.id
    }
    this.authService.validOTP(OTPValue + '', userId).subscribe(
      (response) => {
        let data: AuthenticationResponse = response.data;
        if (response.message == 'SUCCESS') {
          this.authService.JWTBSub.next(data.jwt);
          this.userService.userBSub.next(data.user);
          this.cookieService.delete('c-user', '/');
          if (this.routerPath === 'confirmemail') {
            this.notifyDialogService.open(
              'Xác thực thành công',
              'Tiến hành đổi mật khẩu mới của bạn',
              [['/home', 'Trở về trang chủ']]
            );
          } else if (this.routerPath === 'recover/code') {
            this.router.navigate(['recover/password'], {
              queryParams: {
                uid: this.userProfile.id,
                code: OTPValue,
                sPath: this.sourcePath
              },
            });
          }
        }
      },
      (errorResponse) => {
        let message = errorResponse.error.message;
        if (message === 'FAILED') {
          this.isWrongCode = true;
        }
      }
    );
  }
  onClickLogout() {
    this.cookieService.delete('c-user', '/');
    if(this.sourcePath === 'admin-login'){
      this.router.navigate(['/administrator-login']);
    }else if(this.sourcePath === 'user-login'){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/login']);
    }
  }
}
