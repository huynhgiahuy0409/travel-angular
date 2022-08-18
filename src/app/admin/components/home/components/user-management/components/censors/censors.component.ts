import { debounceTime, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin, of } from 'rxjs';
import { ADMIN_ROLE, CENSOR_ROLE } from 'src/app/shared/models/constant';
import { FilterUser } from 'src/app/shared/models/model';
import { UserProfileResponse } from 'src/app/shared/models/response';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-censors',
  templateUrl: './censors.component.html',
  styleUrls: ['./censors.component.scss']
})
export class CensorsComponent implements OnInit {
  censors: UserProfileResponse[] = [];
  totalCensorUsers: number = 0;
  totalUsers: number = 0
  initFilter: FilterUser = {
    pageable: {
      pageIndex: 0,
      pageSize: 10,
      sortable: {
        dir: 'ASC',
        order: 'createDate',
      },
    },
    active: 1,
  };
  searchUsers: UserProfileResponse[] = []
  searchCtrl: UntypedFormControl = new UntypedFormControl('')
  initSearchUser: FilterUser = {
    pageable: {
      pageIndex: 0,
      pageSize: 10,
    },
    active: 1,
  };
  constructor(private userService: UserService, private matDialog: MatDialog) {}
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


    let admins$: Observable<UserProfileResponse[]> = this.userService.findAll({
      ...this.initFilter,
      role: CENSOR_ROLE,
    });
    let totalCensorUser$: Observable<number> =
      this.userService.countByRoleNameAndActive(CENSOR_ROLE, 1);
    let totalUsers$ = this.userService.getTotalUser()
    forkJoin([admins$, totalCensorUser$,totalUsers$]).subscribe((response) => {
      this.censors = this.censors.concat(response[0]);
      this.totalCensorUsers = response[1];
      this.totalUsers = response[2]
    });
  }
  onScrollDown($event: any) {
    if(this.searchUsers.length !== 0){
      this.initSearchUser.pageable.pageIndex++
      if(this.searchCtrl.value){
        this.userService.findAll(this.initSearchUser).subscribe(response => {
          this.searchUsers = this.searchUsers.concat(response)
          console.log(this.searchUsers);
        })
      }
    }else{
      this.initFilter.pageable.pageIndex++
      this.userService.findAll({
        ...this.initFilter,
        role: CENSOR_ROLE,
      }).subscribe(response => {
        console.log(response.length);
        
        this.censors = this.censors.concat(response)
        console.log(this.censors.length);
      });
    }
  }

  
}
