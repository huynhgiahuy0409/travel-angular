import { GOONG_MAPTILES_KEY, GOONG_API_KEY } from './shared/models/constant';
import { Component, OnInit } from '@angular/core';
import * as goongjs from '@goongmaps/goong-js';
import * as goongsdk from '@goongmaps/goong-sdk';
import * as polyline from '@mapbox/polyline';
import { ProgressBarService } from './user/services/progress-bar.service';
// import * as goongDirections from '@goongmaps/goong-sdk/services/directions';
// import * as goongSdk from '@goongmaps/goong-sdk'
// import * as polyline from '@mapbox/polyline'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  long!: number;
  lat!: number;
  constructor(public progressBarService: ProgressBarService){

  }
  ngOnInit(): void {
  }
  onScroll() {
    console.log('scrolled!!');
  }
}
