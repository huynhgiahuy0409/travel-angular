import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/shared/models/request';
import { AuthService } from 'src/app/user/services/auth.service';
import { ProgressBarService } from 'src/app/user/services/progress-bar.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent {
  registerFormGroup!: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    public progressBarService: ProgressBarService,
    private cookieService: CookieService
  ) {
    this.registerFormGroup = fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.minLength(6), Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.registerFormGroup.valueChanges.subscribe((v) => console.log(v));
  }
  onClickRegister() {
    this.progressBarService.progressBarBSub.next(true);
    let registerRequest: RegisterRequest = this.registerFormGroup.value;
    registerRequest.username = this.registerFormGroup.value.email;
    this.authService.register(registerRequest).subscribe(
      (response) => {
        console.log(response);
        
        this.progressBarService.progressBarBSub.next(false);
        if (response.status === 200) {
          this.dialogRef.close();
          this.router.navigate(['/confirmemail'], {
            queryParams: {
              sPath: 'user-login',
            }
          });
          this.cookieService.set("c-user", response.data)
        } else if (response.status === 409) {
          console.log(response);
        }
      },
      (error) => {
        this.progressBarService.progressBarBSub.next(false);
      }
    );
  }
}
