import { Component, OnInit } from '@angular/core';
import * as goongjs from '@goongmaps/goong-js';
import * as goongsdk from '@goongmaps/goong-sdk';
import * as polyline from '@mapbox/polyline';
import { GOONG_API_KEY } from 'src/app/shared/models/constant';
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

  ngOnInit(): void {
    this.originLong = 106.70322045500006
    this.originLat = 10.776714870000035
    this.desLong = 107.08426
    this.desLat = 10.34599
    goongjs.accessToken = 'IDnak9Ntt41NhsSK12He1C2vzvxvkRQ8uWXeLHe2';
    var map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [(this.originLong + this.desLong) / 2, (this.originLat + this.desLat) / 2],
      zoom: 8,
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
      .setLngLat([106.70322045500006, 10.776714870000035])
      .addTo(map);
    new goongjs.Marker()
      .setLngLat([107.08426, 10.34599])
      .addTo(map);
  }
}
