import { Component, OnInit } from '@angular/core';
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  iconClass: string
}
export const ROUTES: RouteInfo[] = [
  { path: '/administrator/home/dashboard', title: 'Trang chủ',  icon: 'dashboard', iconClass: '' },
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
