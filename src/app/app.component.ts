import { GOONG_MAPTILES_KEY, GOONG_API_KEY } from './shared/models/constant';
import { Component, OnInit } from '@angular/core';
import * as goongjs from '@goongmaps/goong-js';
import * as goongsdk from '@goongmaps/goong-sdk';
import * as polyline from '@mapbox/polyline';
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
  ngOnInit(): void {
  //     this.long = 106.70322045500006;
  //     this.lat = 10.776714870000035;
  //     let long1 = 107.08426;
  //     let lat1 = 10.34599;
  //     // goongjs.accessToken = GOONG_MAPTILES_KEY;
  //     // var map = new goongjs.Map({
  //     //   container: 'map',
  //     //   style: 'https://tiles.goong.io/assets/goong_map_web.json', // stylesheet location
  //     //   center: [this.long, this.lat], // starting position [lng, lat]
  //     //   zoom: 15 // starting zoom
  //     // });
  //     goongjs.accessToken = 'IDnak9Ntt41NhsSK12He1C2vzvxvkRQ8uWXeLHe2';
  //     var map = new goongjs.Map({
  //       container: 'map',
  //       style: 'https://tiles.goong.io/assets/goong_map_web.json',
  //       center: [107.08426, 10.776714870000035],
  //       zoom: 11.5,
  //     });
  //     map.on('load', function () {
  //       var layers = map.getStyle().layers;
  //       // Find the index of the first symbol layer in the map style
  //       var firstSymbolId: any;
  //       for (var i = 0; i < layers.length; i++) {
  //         if (layers[i].type === 'symbol') {
  //           firstSymbolId = layers[i].id;
  //           break;
  //         }
  //       }
  //       // Initialize goongClient with an API KEY
  //       // var goongClient = goongSdk({
  //       //   accessToken: '8rOlaVRpbahMK06NV2Fo9q7NINsUH0PoTC2uQ37Q'
  //       // });
  //       const goongClient = require('@goongmaps/goong-sdk');
  //       const goongDirections = require('@goongmaps/goong-sdk/services/directions');
  //       const baseClient = goongClient({ accessToken: GOONG_API_KEY });
  //       const directionService = goongDirections(baseClient);
  //       // const directionService = goongDirections.goongDirections(baseClient)
  //       // Get Directions
  //       directionService
  //         .getDirections({
  //           origin: '10.776714870000035, 106.70322045500006',
  //           destination: '10.34599,107.08426',
  //           // destination: '10.810583,106.709145',
  //           vehicle: 'car',
  //         })
  //         .send()
  //         .then(function (response: any) {
  //           var directions = response.body;
  //           var route = directions.routes[0];
  //           var geometry_string = route.overview_polyline.points;
  //           var geoJSON = polyline.toGeoJSON(geometry_string);
  //           map.addSource('route', {
  //             type: 'geojson',
  //             data: geoJSON,
  //           });
  //           // Add route layer below symbol layers
  //           map.addLayer(
  //             {
  //               id: 'route',
  //               type: 'line',
  //               source: 'route',
  //               layout: {
  //                 'line-join': 'round',
  //                 'line-cap': 'round',
  //               },
  //               paint: {
  //                 'line-color': '#1e88e5',
  //                 'line-width': 8,
  //               },
  //             },
  //             firstSymbolId
  //           );
  //         });
  //       directionService
  //         .getDirections({
  //           // origin: '10.776714870000035, 106.70322045500006',
  //           origin: '10.34599,107.08426',
  //           destination: '10.810583,106.709145',
  //           vehicle: 'car',
  //         })
  //         .send()
  //         .then(function (response: any) {
  //           var directions = response.body;
  //           var route = directions.routes[0];
  //           var geometry_string = route.overview_polyline.points;
  //           var geoJSON = polyline.toGeoJSON(geometry_string);
  //           map.addSource('route', {
  //             type: 'geojson',
  //             data: geoJSON,
  //           });
  //           // Add route layer below symbol layers
  //           map.addLayer(
  //             {
  //               id: 'route',
  //               type: 'line',
  //               source: 'route',
  //               layout: {
  //                 'line-join': 'round',
  //                 'line-cap': 'round',
  //               },
  //               paint: {
  //                 'line-color': '#1e88e5',
  //                 'line-width': 8,
  //               },
  //             },
  //             firstSymbolId
  //           );
  //         });
  //     });
  //     new goongjs.Marker()
  //       .setLngLat([106.70322045500006, 10.776714870000035])
  //       .addTo(map);
  //     new goongjs.Marker()
  //       .setLngLat([107.08426, 10.34599])
  //       .addTo(map);
  //     new goongjs.Marker()
  //       .setLngLat([106.668060, 10.723695])
  //       .addTo(map);
  }
}
