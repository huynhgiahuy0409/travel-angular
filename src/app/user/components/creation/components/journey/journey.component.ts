import { ForwardGeocodingResponse, PlaceAutocompleteResponse } from './../../../../../shared/models/response';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { GoongMapService } from 'src/app/user/services/goong-map.service';
import { LocationDetailDialogComponent } from './dialog/location-detail-dialog/location-detail-dialog.component';
import { RouteDetailMapDialogComponent } from './dialog/route-detail-map-dialog/route-detail-map-dialog.component';
import { Prediction } from 'src/app/shared/models/model';

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
  placeOptionSlt: number = -1;
  /* ctrl */
  placeOptionCtrl:  FormControl = new FormControl('');
  searchPlaceCtrl: FormControl = new FormControl('');
  /* data */
  placeAutocompleteResponse$?: Observable<PlaceAutocompleteResponse>;
  constructor(
    private _formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private goongService: GoongMapService
  ) {
    this.tabs = [`Ngày ${++this.initialDay}`];
  }
  ngOnInit(): void {
    this.placeOptionCtrl.valueChanges.subscribe(v => console.log(v))
    this.placeAutocompleteResponse$ = this.searchPlaceCtrl.valueChanges.pipe(
      debounceTime(3000),
      switchMap((term) => {
        return term
          ? this.goongService.getPlaceAutocomplete(term).pipe()
          : of<PlaceAutocompleteResponse>();
      },
      )
    );
    this.searchPlaceCtrl.valueChanges.subscribe(v => console.log(v));
    this.placeAutocompleteResponse$.subscribe(v => console.log(v));
  }
  addTab() {
    this.tabs.push(`Ngày ${++this.initialDay}`);
  }

  removeTab(index: number) {
    this.tabs.splice(index - 1, 1);
    this.initialDay--;
  }

  selectedIndexChange($event: any) {
    this.placeOptionCtrl.setValue(null)
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
  selectPlaceDetail(prediction: Prediction){
    this.searchPlaceCtrl.setValue(prediction.description)
    this.placeAutocompleteResponse$ = undefined
  }
}
