import {
  ForwardGeocodingResponse,
  PlaceAutocompleteResponse,
  PlaceDetailResponse,
  ProvincePlaceResponse,
} from './../../../../../shared/models/response';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { GoongMapService } from 'src/app/user/services/goong-map.service';
import { LocationDetailDialogComponent } from './dialog/location-detail-dialog/location-detail-dialog.component';
import { RouteDetailMapDialogComponent } from './dialog/route-detail-map-dialog/route-detail-map-dialog.component';
import {
  Prediction,
  ProvinceResponse,
  Uluru,
} from 'src/app/shared/models/model';
import * as goongjs from '@goongmaps/goong-js';
import * as goongsdk from '@goongmaps/goong-sdk';
import * as polyline from '@mapbox/polyline';
import {
  GOONG_API_KEY,
  GOONG_MAPTILES_KEY,
} from 'src/app/shared/models/constant';
import { DayJourneyRequest, ProvincePlaceRequest } from 'src/app/shared/models/request';
@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
})
export class JourneyComponent implements OnInit {
  initialDay: number = 0;
  tabs!: string[];
  selected = new FormControl(0);
  places = [1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1];
  /* step */
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = false;
  /* slt ngModel */
  /* form data */
  journeyFormGroup!: FormGroup;
  /* ctrl */
  placeChoiceMethodCtrl: FormControl = new FormControl('');
  provinceCtrl: FormControl = new FormControl('');
  searchedPlaceCtrl: FormControl = new FormControl('');
  /* data */
  placeAutocompleteResponse$?: Observable<PlaceAutocompleteResponse | null>;
  provincesFakeData$!: Observable<ProvinceResponse[]>;
  provincePlaces$!: Observable<ProvincePlaceResponse[]>;
  placeAutocompleteResponse!: PlaceAutocompleteResponse | null;
  haveMap: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private goongService: GoongMapService
  ) {
    this.tabs = [`Ngày ${++this.initialDay}`];
    this.journeyFormGroup = this._formBuilder.group({
      journeyDays: new FormArray([
        new FormControl({
          day: `Ngày ${this.initialDay}`,
          provincePlaces: []
        }),
      ]),
    });
  }
  ngOnInit(): void {
    console.log(this.journeyFormGroup.value);
    
    let provinces: ProvinceResponse[] = [
      {
        id: 1,
        name: 'An Giang',
        code: 'AG',
        domain: 'Tỉnh',
      },
      {
        id: 2,
        name: 'Hồ Chí Minh',
        code: 'HCM',
        domain: 'TP',
      },
    ];
    /* Choice exist place */
    this.provincesFakeData$ = this.placeChoiceMethodCtrl.valueChanges.pipe(
      switchMap((method: number) => {
        if (method === 1) {
          return of(provinces);
        }
        return of([]);
      })
    );
    /* Search place */
    this.searchedPlaceCtrl.valueChanges
      .pipe(
        tap((_) => {
          this.placeAutocompleteResponse = null;
        }),
        debounceTime(1000),
        switchMap((term) => {
          this.haveMap = false;
          return term ? this.goongService.getPlaceAutocomplete(term) : of(null);
        })
      )
      .subscribe((response) => {
        this.placeAutocompleteResponse = response;
      });
    /* Get place by province */
    let provincePlace: ProvincePlaceResponse[] = [
      {
        id: 1,
        name: 'Núi Sam - Miếu bà Chúa Xứ',
        arrivedMemberCount: 22,
        urulu: {
          lat: 10.677188,
          lng: 105.076489,
        },
      },
      {
        id: 2,
        name: 'Chợ Châu Đốc',
        arrivedMemberCount: 101,
        urulu: {
          lat: 10.711179,
          lng: 105.1173776,
        },
      },
    ];
    let provincePlace2: ProvincePlaceResponse[] = [
      {
        id: 3,
        name: 'Phố đi bộ Nguyễn Huệ',
        arrivedMemberCount: 462,
        urulu: {
          lat: 10.7738982,
          lng: 106.7038295,
        },
      },
      {
        id: 4,
        name: 'Chợ Bến Thành',
        arrivedMemberCount: 101,
        urulu: {
          lat: 10.7725168,
          lng: 106.6980208,
        },
      },
    ];
    this.provincePlaces$ = this.provinceCtrl.valueChanges.pipe(
      switchMap((provinceId) => {
        return provinceId == 1 ? of(provincePlace) : of(provincePlace2);
      })
    );
  }
  addTab() {
    this.tabs.push(`Ngày ${++this.initialDay}`);
  }

  removeTab(index: number) {
    this.tabs.splice(index - 1, 1);
    this.initialDay--;
  }

  selectedIndexChange($event: any) {
    this.placeChoiceMethodCtrl.setValue(null);
    this.provinceCtrl.setValue(null);
  }
  openRouteDetail() {
    this.matDialog.open(RouteDetailMapDialogComponent);
  }
  openLocationDetail() {
    this.matDialog.open(LocationDetailDialogComponent);
  }
  keyUpSearchPlace(searchValue: any) {
    console.log(searchValue);
  }
  selectPlaceDetail(prediction: Prediction) {
    this.searchedPlaceCtrl.setValue(prediction.description);
    this.placeAutocompleteResponse$ = undefined;
  }
  selectPlaceFromAutoComplete(prediction: Prediction) {
    console.log(prediction.place_id);
    this.placeAutocompleteResponse = null;
    this.haveMap = true;
    this.goongService.getPlaceDetailByPlaceId(prediction.place_id).subscribe(
      (response) => {
        console.log(response);
        goongjs.accessToken = GOONG_MAPTILES_KEY;
        let { geometry } = response.result;
        var map = new goongjs.Map({
          container: 'map',
          style: 'https://tiles.goong.io/assets/goong_map_web.json',
          center: [geometry.location.lng, geometry.location.lat],
          zoom: 11.5,
        });
        new goongjs.Marker()
          .setLngLat([geometry.location.lng, geometry.location.lat])
          .addTo(map);
      },
      (error) => console.log(error)
    );
  }
  confirmPlaceMap() {}
  selectExistProvincePlace(provincePlace: ProvincePlaceResponse){
    let dayJourney: DayJourneyRequest = this.journeyFormGroup.value
    let provincePlaces: ProvincePlaceRequest[] = dayJourney.provincePlaces
    // let sltProvincePlace = provincePlaces.find(provincePlace => pro)
    this.journeyFormGroup.value
  }
}
