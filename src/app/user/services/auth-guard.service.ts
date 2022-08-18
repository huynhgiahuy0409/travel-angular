import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserProfileResponse } from 'src/app/shared/models/response';
import { UserService } from './user.service';
import { ADMIN_ROLE, CENSOR_ROLE } from 'src/app/shared/models/constant';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let user: UserProfileResponse | null = this.userService.userBSub.value;
    console.log(route);
    console.log(state);
    
    if (user) {
      if(state.url === "/administrator/home/user-management"){
        if(user.role.name === ADMIN_ROLE){
          return of(true);
        }else if(user.role.name === CENSOR_ROLE){
          return of(true);
        }else{
          return of(false)
        }
      }
      return of(true);
    } else {
      if(route.routeConfig){
        if(route.routeConfig.path === 'administrator'){
          this.router.navigate(['/administrator-login']);
        }else if(route.routeConfig.path === 'user'){
          this.router.navigate(['/login']);
        }
      }else{
        this.router.navigate(['/login']);
      }
      return of(false);
    }
  }
}
