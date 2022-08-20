import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MALE_DEFAULT_AVATAR_URL, FEMALE_DEFAULT_AVATAR_URL, UNDEFINED_DEFAULT_AVATAR_URL } from 'src/app/shared/models/constant';
import { UserProfileResponse } from 'src/app/shared/models/response';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  maleDefaultAvatarURL: string = MALE_DEFAULT_AVATAR_URL
  femaleDefaultAvatarURL: string = FEMALE_DEFAULT_AVATAR_URL
  undefinedDefaultAvatarURL: string = UNDEFINED_DEFAULT_AVATAR_URL
  user$!: Observable<UserProfileResponse | null>
  isAdmin = false
  constructor(private userService: UserService, private router: Router) {}
  
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
    this.router.navigate(['/administrator-login'])
  }
}
