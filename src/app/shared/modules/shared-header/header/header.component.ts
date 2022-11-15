import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfo } from 'os';
import { Observable } from 'rxjs';
import { FEMALE_DEFAULT_AVATAR_URL, MALE_DEFAULT_AVATAR_URL, UNDEFINED_DEFAULT_AVATAR_URL } from 'src/app/shared/models/constant';
import { UserProfileResponse } from 'src/app/shared/models/response';
import { UserService } from 'src/app/user/services/user.service';
import { TranslateDialogComponent } from '../../translate/translate-dialog/translate-dialog.component';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  maleDefaultAvatarURL: string = MALE_DEFAULT_AVATAR_URL
  femaleDefaultAvatarURL: string = FEMALE_DEFAULT_AVATAR_URL
  undefinedDefaultAvatarURL: string = UNDEFINED_DEFAULT_AVATAR_URL
  user$!: Observable<UserProfileResponse | null>
  isAdmin = false
  constructor(private userService: UserService, private router: Router, private matDialog: MatDialog) {}
  
  ngOnInit(): void {
    this.user$ = this.userService.user$
    this.user$.subscribe(user => {
      if(user){
        if(user.role.name === 'ROLE_ADMIN' || user?.role.name === 'ROLE_CENSOR'){
          this.isAdmin = true
        }
      }
    })
  }
  logout(){
    this.userService.userBSub.next(null)
    this.router.navigate(['/login'])
  }
  openDialogChoseLanguage(){
    this.matDialog.open(TranslateDialogComponent)
  }
}
