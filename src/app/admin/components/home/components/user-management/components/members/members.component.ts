import { debounceTime, tap, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin, of } from 'rxjs';
import { ADMIN_ROLE, CENSOR_ROLE } from 'src/app/shared/models/constant';
import { FilterUser } from 'src/app/shared/models/model';
import { UserProfileResponse } from 'src/app/shared/models/response';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  currUser!: UserProfileResponse | null
  users$!: Observable<[UserProfileResponse[], number, UserProfileResponse[], number, number]>
  searchUsers: UserProfileResponse[] = []
  searchCtrl: FormControl = new FormControl('')
  initSearchUser: FilterUser = {
    pageable: {
      pageIndex: 0,
      pageSize: 10,
    },
    active: 1,
  };
  constructor(private userService: UserService, private matDialog: MatDialog) { }
  ngOnInit(): void {
    this.searchCtrl.valueChanges.pipe(debounceTime(1000), switchMap(term => {
      this.searchUsers = []
      this.initSearchUser.pageable.pageIndex = 0
      this.initSearchUser.fullName = term
      if(term){
        console.log(this.initSearchUser);
        
        return this.userService.findAll(this.initSearchUser)
      }else{
        return of([])
      }
    })).subscribe(
      response => {
        console.log(response)
        if(response.length === 0 ){
          this.searchUsers = []
        }else{
          this.searchUsers = this.searchUsers.concat(response)
        }
      }
    )
    this.currUser = this.userService.userBSub.value
    let initFilter: FilterUser = {
      pageable: {
        pageIndex: 0,
        pageSize: 3,
        sortable: {
          dir: 'ASC',
          order: 'createDate'
        }
      },
      active: 1
    }
    let admins$: Observable<UserProfileResponse[]> = this.userService.findAll({...initFilter, role: ADMIN_ROLE})
    let totalAdminUser$: Observable<number> = this.userService.countByRoleNameAndActive(ADMIN_ROLE, 1)
    let censors$: Observable<UserProfileResponse[]> = this.userService.findAll({...initFilter, role: CENSOR_ROLE})
    let totalCensorUser$: Observable<number> = this.userService.countByRoleNameAndActive(CENSOR_ROLE, 1)
    let totalUsers$ = this.userService.getTotalUser()
    this.users$ = forkJoin([admins$, totalAdminUser$, censors$, totalCensorUser$,totalUsers$])
    this.users$.subscribe(v => console.log(v))
  }
  onScrollDown($event: any){
    this.initSearchUser.pageable.pageIndex++
    if(this.searchCtrl.value){
      this.userService.findAll(this.initSearchUser).subscribe(response => {
        this.searchUsers = this.searchUsers.concat(response)
      })
    }
  }
}
