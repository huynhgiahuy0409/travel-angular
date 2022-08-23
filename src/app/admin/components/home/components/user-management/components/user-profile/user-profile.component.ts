import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ADMIN_ROLE, CENSOR_ROLE } from 'src/app/shared/models/constant';
import { UserProfileResponse } from 'src/app/shared/models/response';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { UserService } from 'src/app/user/services/user.service';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';
import { RoleChangeDialogComponent } from '../../dialogs/role-change-dialog/role-change-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  @Input()
  user!: UserProfileResponse | null;
  currUser!: UserProfileResponse | null;
  avatarSrc!: string;
  /* view child */
  @ViewChild('moreBtn')
  moreBtn!: ElementRef<HTMLElement>
  @ViewChild('notificationList')
  notificationList!: ElementRef<HTMLElement>
  constructor(private directLinkService: DirectLinkService, private userService: UserService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.currUser = this.userService.userBSub.value
    /* Setup user avatar */
    if (this.user) {
      let { avatar } = this.user;
      if (avatar) {
        this.avatarSrc = this.directLinkService.getDirectLinkImage(
          this.user.id,
          avatar.name,
          avatar.ext
        );
      } else {
        this.avatarSrc = this.directLinkService.getDefaultAvatarURL(
          this.user.gender
        );
      }
    }
  }
  onClickMoreBtn(notificationList: HTMLElement){
    notificationList.classList.toggle('show')
  }
  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if(!this.moreBtn.nativeElement.contains(event.target)){
      if(this.notificationList.nativeElement.classList.contains('show')){
        this.notificationList.nativeElement.classList.remove('show')
      }
    }
  }
  confirmChangeRole(currRole: string, changedRole: string, userId: number, fullName?: string){
    let data
    if(currRole === ADMIN_ROLE){
      data = {
        title: "Gỡ vai trò quản trị viên?",
        content: `"${fullName}" sẽ không quản lý được người có thể tham gia và kiểm duyệt bài viết nữa.`,
        role: currRole,
        changedRole: changedRole,
        userId: userId,
        type: "CHANGE_ROLE"
      }
    }else if(currRole === CENSOR_ROLE){
      data = {
        title: "Gỡ vai trò kiểm duyệt viên?",
        content: `"${fullName}" sẽ không thể kiểm duyệt bài viết được nữa.`,
        role: currRole,
        changedRole: changedRole,
        userId: userId,
        type: "CHANGE_ROLE"
      }
    }
    let matDialog = this.matDialog.open(ConfirmationComponent,
      {
        data: data
      }
    )
    matDialog.afterClosed().subscribe(response => {
      if(response.userResponse){
        let userResponse: UserProfileResponse = response.userResponse
        this.user!.role = response.userResponse.role
      }
    })
  }
  confirmChangeActiveUser(active: number,userId: number){
    // this.userService.updateActive(active, userId).subscribe()
    let data
    if(active === -1){
      data = {
        title: "Xóa khỏi ứng dụng?",
        content: `Bạn có chắc chắn muốn xóa người này? Họ sẽ không thể đăng nhập hay thao tác nữa.`,
        userId: userId,
        active: active,
        type: "CHANGE_ACTIVE"
      }
    }else{
      
    }
    let matDialog = this.matDialog.open(ConfirmationComponent,
      {
        data: data
      }
    )
    matDialog.afterClosed().subscribe(response => {
      if(response.userResponse){
        let userResponse: UserProfileResponse = response.userResponse
        this.user!.active = userResponse.active
      }
    })
  }
  openDialogChangeRole(user: UserProfileResponse){
    let data = {
      title: "Thay đổi vai trò",
      user: user,
    }
    let matDialog = this.matDialog.open(RoleChangeDialogComponent,
      {
        data: data,
        width:"1000px"
      }
    )
    matDialog.afterClosed().subscribe(response => {
      let userResponse = response.userResponse
      this.user!.role = userResponse.role
    })
  }
}
