import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: {lat: number, lng: number}){}
  ngOnInit(): void {
    this.long = this.data.lng;
    this.lat = this.data.lat;
    goongjs.accessToken = GOONG_MAPTILES_KEY;
    var map = new goongjs.Map({
      container: 'detail-place-map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [this.long, this.lat],
      zoom: 11.5,
    });
    new goongjs.Marker()
      .setLngLat([this.long, this.lat])
      .addTo(map);
  }

}
