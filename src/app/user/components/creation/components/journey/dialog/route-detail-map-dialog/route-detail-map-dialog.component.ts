import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as goongjs from '@goongmaps/goong-js';
import * as goongsdk from '@goongmaps/goong-sdk';
import * as polyline from '@mapbox/polyline';
import { GOONG_API_KEY } from 'src/app/shared/models/constant';
import { Uluru } from 'src/app/shared/models/model';
@Component({
  selector: 'app-route-detail-map-dialog',
  templateUrl: './route-detail-map-dialog.component.html',
  styleUrls: ['./route-detail-map-dialog.component.scss']
})
export class RouteDetailMapDialogComponent implements OnInit {
  originLong!: number
  originLat!: number
  desLong!: number
  desLat!: number
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: {srcUluru: Uluru, desUluru: Uluru}){

  }
  ngOnInit(): void {
    this.originLong = this.data.srcUluru.lng
    this.originLat = this.data.srcUluru.lat
    this.desLong = this.data.desUluru.lng
    this.desLat = this.data.desUluru.lat
    goongjs.accessToken = 'IDnak9Ntt41NhsSK12He1C2vzvxvkRQ8uWXeLHe2';
    var map = new goongjs.Map({
      container: 'route-map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [(this.originLong + this.desLong) / 2, (this.originLat + this.desLat) / 2],
      zoom: 11,
    });
    map.on('load', () => {
      var layers = map.getStyle().layers;
      // Find the index of the first symbol layer in the map style
      var firstSymbolId: any;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
          firstSymbolId = layers[i].id;
          break;
        }
      }
      // Initialize goongClient with an API KEY
      const goongClient = require('@goongmaps/goong-sdk');
      const goongDirections = require('@goongmaps/goong-sdk/services/directions');
      const baseClient = goongClient({ accessToken: GOONG_API_KEY });
      const directionService = goongDirections(baseClient);
      const originUluruString = `${this.originLat}, ${this.originLong}`
      const desUluruString = `${this.desLat}, ${this.desLong}`
      // Get Directions
      directionService
        .getDirections({
          origin: originUluruString,
          destination: desUluruString,
          vehicle: 'car',
        })
        .send()
        .then(function (response: any) {
          var directions = response.body;
          var route = directions.routes[0];
          var geometry_string = route.overview_polyline.points;
          var geoJSON = polyline.toGeoJSON(geometry_string);
          map.addSource('route', {
            type: 'geojson',
            data: geoJSON,
          });
          // Add route layer below symbol layers
          map.addLayer(
            {
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#1e88e5',
                'line-width': 8,
              },
            },
            firstSymbolId
          );
        });
    });
    new goongjs.Marker()
      .setLngLat([this.originLong,this.originLat])
      .addTo(map);
    new goongjs.Marker()
      .setLngLat([this.desLong,this.desLat])
      .addTo(map);
  }
}
