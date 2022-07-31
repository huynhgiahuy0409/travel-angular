import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'os';
import { Observable } from 'rxjs';
import { FEMALE_DEFAULT_AVATAR_URL, MALE_DEFAULT_AVATAR_URL, UNDEFINED_DEFAULT_AVATAR_URL } from 'src/app/shared/models/constant';
import { UserInfoResponse } from 'src/app/shared/models/response';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  maleDefaultAvatarURL: string = MALE_DEFAULT_AVATAR_URL
  femaleDefaultAvatarURL: string = FEMALE_DEFAULT_AVATAR_URL
  undefinedDefaultAvatarURL: string = UNDEFINED_DEFAULT_AVATAR_URL
  user$!: Observable<UserInfoResponse | null>
  constructor(private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {
    this.user$ = this.userService.user$
    this.user$.subscribe(v => {
      console.log(v);
    })
  }
  logout(){
    this.userService.userBSub.next(null)
    this.router.navigate(['/login'])
  }
}
