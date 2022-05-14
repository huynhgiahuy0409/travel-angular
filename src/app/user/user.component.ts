import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  title = 'travel';
  lat = 21.3069;
  lng = -157.8583;
  mapType = 'SATELLITE';
  constructor() {}

  ngOnInit(): void {}
}
