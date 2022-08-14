import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/user/services/auth.service';
import { debounceTime, tap } from 'rxjs/operators';
import * as internal from 'stream';
import { setInterval } from 'timers';
import { ProgressBarService } from 'src/app/user/services/progress-bar.service';

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
  params!: Params 
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public progressBarService: ProgressBarService
  ) {
    
  }
  
  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.queryParams
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
        .subscribe((response) => {
          this.progressBarService.progressBarBSub.next(false);
          if (response) {
            this.authService.generateOTP(usernameValue);
            this.router.navigate(['/recover/code'], {
              queryParams: {
                sPath: this.params.sPath,
                uid: response.id
              }
            });
          } else {
            this.isExistEmail = false;
          }
        });
    }, 1000);
  }
  backToPreviousPage(){
    let sourcePath = this.params.sPath
    if(sourcePath === 'user-login'){
      this.router.navigate(['/login'])
    }else if(sourcePath === 'admin-login'){
      this.router.navigate(['/administrator-login'])
    }else{
      this.router.navigate(['/login'])
    }
  }
  onClickLogin(){
    let sourcePath = this.params.sPath
    if(sourcePath === 'admin-login'){
      this.router.navigate(['/administrator-login'])
    }else if(sourcePath === 'user-login'){
      this.router.navigate(['/login'])
    }else{
      this.router.navigate(['/login'])
    }
  }
}
