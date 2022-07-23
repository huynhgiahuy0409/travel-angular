import { Component, OnInit } from '@angular/core';
import * as goongjs from '@goongmaps/goong-js';
import * as goongsdk from '@goongmaps/goong-sdk';
import * as polyline from '@mapbox/polyline';
import { GOONG_API_KEY, GOONG_MAPTILES_KEY } from 'src/app/shared/models/constant';
@Component({
  selector: 'app-location-detail-dialog',
  templateUrl: './location-detail-dialog.component.html',
  styleUrls: ['./location-detail-dialog.component.scss']
})
export class LocationDetailDialogComponent implements OnInit {
  long!: number;
  lat!: number;
  ngOnInit(): void {
    this.long = 106.70322045500006;
    this.lat = 10.776714870000035;
    goongjs.accessToken = GOONG_MAPTILES_KEY;
    var map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [this.long, this.lat],
      zoom: 11.5,
    });
    new goongjs.Marker()
      .setLngLat([this.long, this.lat])
      .addTo(map);
  }

}
