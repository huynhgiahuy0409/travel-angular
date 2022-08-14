import { Component, OnInit } from '@angular/core';
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  iconClass: string
}
export const ROUTES: RouteInfo[] = [
  { path: '/administrator/home/dashboard', title: 'Trang chủ',  icon: 'dashboard', iconClass: 'fa-solid fa-object-group' },
  { path: '/administrator/home/commercial', title: 'Quản lý quảng cáo',  icon: 'dashboard', iconClass: 'fa-solid fa-rectangle-ad' },
  { path: '/administrator/home/post-management', title: 'Quản lý bài viết',  icon: 'dashboard', iconClass: 'fa-solid fa-users-between-lines' },
  { path: '/administrator/home/user-management', title: 'Quản lý người dùng',  icon: 'dashboard', iconClass: 'fa-solid fa-users' },
  { path: '/administrator/home/statistic', title: 'Thống kê',  icon: 'dashboard', iconClass: 'fa-solid fa-chart-simple' },
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuItems!: RouteInfo[]
  constructor() {
    this.menuItems = ROUTES
  }

  ngOnInit(): void {
  }

}
