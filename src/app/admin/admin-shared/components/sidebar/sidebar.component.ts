import { Component, Input, OnInit } from '@angular/core';
import { RouteInfo } from 'src/app/admin/components/home/home.component';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input()
  menuItems!: RouteInfo[];
  sltTabIndex = 0
  constructor() {
  }

  ngOnInit(): void {
  }
  onClickMenuItem(index: number){
    this.sltTabIndex = index
  }
}
