import { CookieService } from 'ngx-cookie-service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { matchedPassword } from '../../user/components/login/login.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/user/services/auth.service';
import { NotifyDialogService } from 'src/app/user/services/notify-dialog.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  resetFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private notifyDialogService: NotifyDialogService,
    private CookieService: CookieService
  ) {
    this.resetFormGroup = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      [matchedPassword]
    );
    this.resetFormGroup.valueChanges.subscribe((v) => console.log(v));
  }

  ngOnInit(): void {}
  confirmChangePassword() {
    const {uid, code, sPath } = this.activatedRoute.snapshot.queryParams
    this.authService
      .recoveryPassword(
        this.resetFormGroup.get('password')?.value,
        code,
        uid
      )
      .subscribe(
        (response) => {
          if (response.message == 'SUCCESS') {
            let dialogRef = this.notifyDialogService.open(
              'Thành công',
              'Mật khẩu của bạn đã được cập nhật',
            );
            dialogRef.afterClosed().subscribe(_ => {
              if(sPath === 'admin-login'){
                this.router.navigate(['/administrator/home'])
              }else if(sPath === 'user-login'){
                this.router.navigate(['/home'])
              }
            })
          }
        },
        (error) => {
          if (error.error.message == 'FAILED') {
            this.notifyDialogService.open(
              'Liên kết không hợp lệ',
              'Liên kết mà bạn sử dụng không hợp lệ. Vui lòng thử lại.'            );
          }
        }
      );
  }
  onClickCancel(){
    const {uid, code, sPath } = this.activatedRoute.snapshot.queryParams
    if(sPath === "user-login"){
      this.router.navigate(['/login'])
    }else if(sPath === "admin-login"){
      this.router.navigate(['/administrator-login'])
    }
  }
}