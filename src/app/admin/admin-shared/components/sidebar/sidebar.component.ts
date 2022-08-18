import { Component, Input, OnInit } from '@angular/core';
import { RouteInfo } from 'src/app/admin/components/home/home.component';
import { UserProfileResponse } from 'src/app/shared/models/response';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input()
  menuItems!: RouteInfo[];
  sltTabIndex = 0
  user!: UserProfileResponse | null
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.userBSub.value
  }
  onClickMenuItem(index: number){
    this.sltTabIndex = index
  }
}
