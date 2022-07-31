import { ProgressBarService } from './../../../../services/progress-bar.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/services/auth.service';
import { debounceTime, tap } from 'rxjs/operators';
import * as internal from 'stream';
import { setInterval } from 'timers';

@Component({
  selector: 'app-identify',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.scss'],
})
export class IdentifyComponent implements OnInit {
  usernameCtrl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  isExistEmail: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    public progressBarService: ProgressBarService
  ) {}

  ngOnInit(): void {
    this.usernameCtrl.valueChanges.subscribe((v) => {
      this.isExistEmail = true;
    });
  }
  searchUsername() {
    this.progressBarService.progressBarBSub.next(true);
    let usernameValue = this.usernameCtrl.value;
    setTimeout(() => {
      this.authService
        .checkExistUser(usernameValue)
        .subscribe((userInfoResponse) => {
          this.progressBarService.progressBarBSub.next(false);
          if (userInfoResponse) {
            this.authService.generateOTP(usernameValue);
            this.router.navigate(['/recover/code'], {
              queryParams: {
                uid: userInfoResponse.id,
              },
            });
          } else {
            this.isExistEmail = false;
          }
        });
    }, 1000);
  }
}
