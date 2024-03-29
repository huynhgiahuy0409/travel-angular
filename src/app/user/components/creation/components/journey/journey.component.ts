import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as goongjs from '@goongmaps/goong-js';
import { Observable, of } from 'rxjs';
import {
  debounceTime, switchMap,
  tap
} from 'rxjs/operators';
import {
  DEFAULT_PROVINCE_PLACE_URL, GOONG_MAPTILES_KEY
} from 'src/app/shared/models/constant';
import { JourneyDay, JourneyDayPlace, Prediction, Uluru } from 'src/app/shared/models/model';
import {
  GoongPlaceDetailResultRequest,
  JourneyCostDetailRequest,
  JourneyDayRequest,
  JourneyDetailRequest,
  JourneyPostRequest
} from 'src/app/shared/models/request';
import { GoongMapService } from 'src/app/user/services/goong-map.service';
import { JourneyPostService } from 'src/app/user/services/journey-post.service';
import { LocalService } from 'src/app/user/services/local.service';
import { ProvincePlaceService } from 'src/app/user/services/province-place.service';
import { UploadFileService } from 'src/app/user/services/upload-file.service';
import { JourneyDayPlaceRequest } from './../../../../../shared/models/request';
import {
  GoongPlaceAutocompleteResponse, GoongPlaceDetailResultResponse,
  JourneyPostResponse,
  ProvincePlaceResponse,
  ProvinceResponse
} from './../../../../../shared/models/response';
import { LocationDetailDialogComponent } from './dialog/location-detail-dialog/location-detail-dialog.component';
import { RouteDetailMapDialogComponent } from './dialog/route-detail-map-dialog/route-detail-map-dialog.component';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
})
export class JourneyComponent implements OnInit {
  defaultProvincePlaceURL: string = DEFAULT_PROVINCE_PLACE_URL;
  tabs: string[] = [];
  selected:UntypedFormControl = new UntypedFormControl(0);
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
  journeyFormGroup!: UntypedFormGroup;
  /* ctrl */
  placeChoiceMethodCtrl: UntypedFormControl = new UntypedFormControl('');
  provinceCtrl: UntypedFormControl = new UntypedFormControl('');
  searchedPlaceCtrl: UntypedFormControl = new UntypedFormControl('');
  searchedDeparturePlaceCtrl: UntypedFormControl = new UntypedFormControl('');
  /* data */
  visitPlaceAutocompleteResponse$!: Observable<GoongPlaceAutocompleteResponse | null>;
  departurePlaceAutocompleteResponse$!: Observable<GoongPlaceAutocompleteResponse | null>;
  provinces$!: Observable<ProvinceResponse[]>;
  provincePlaces$!: Observable<ProvincePlaceResponse[]>;
  haveVisitMap: boolean = false;
  haveDepartureMap: boolean = false;
  sltVisitPlace?: GoongPlaceDetailResultResponse
  sltDeparturePlace?: GoongPlaceDetailResultResponse
  /* cover image */
  coverImageFile?: File;
  coverImageSrc!: string | ArrayBuffer | null;
  @ViewChild('editCoverImageBtn', { read: ElementRef })
  editCoverImageBtn!: ElementRef;
  @ViewChild('coverImageActionSelect') coverImageActionSelect!: ElementRef;
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private matDialog: MatDialog,
    private goongService: GoongMapService,
    public localService: LocalService,
    private provincePlaceService: ProvincePlaceService,
    private journeyPostService: JourneyPostService,
    private uploadFileService: UploadFileService,
    public dialogRef: MatDialogRef<JourneyComponent>
  ) {
    this.tabs = [`Ngày ${this.tabs.length + 1}`];
    this.journeyFormGroup = this._formBuilder.group({
      title: new UntypedFormControl(''),
      journeyDayArray: new UntypedFormArray([
        new UntypedFormControl({
          day: 1,
          journeyDayPlaces: [],
        }),
      ]),
      journeyInfoGroup: this._formBuilder.group({
        description: new UntypedFormControl(''),
        journeyDetailArray: new UntypedFormArray([
          new UntypedFormArray([
            new UntypedFormControl('Ngày 1'),
            new UntypedFormControl(''),
          ])
        ]),
        journeyCostArray: new UntypedFormArray([
          new UntypedFormArray([
            new UntypedFormControl(''),
            new UntypedFormControl(''),
            new UntypedFormControl('')
          ]),
        ]),
        totalPayment: new UntypedFormControl('0'),
      }),
      moreInfoGroup: this._formBuilder.group({
        departureDay: new UntypedFormControl(''),
        totalParticipant: new UntypedFormControl(''),
        totalCost: new UntypedFormControl(''),
        totalDay: new UntypedFormControl(''),
        vehicle: new UntypedFormControl(''),
      }),
      departurePlace: new UntypedFormControl(''),
      note: new UntypedFormControl(''),
      momoPhone: new UntypedFormControl(''),
      momoContent: new UntypedFormControl(''),
    });
  }
  get journeyDayArray(): UntypedFormArray {
    return this.journeyFormGroup.get('journeyDayArray') as UntypedFormArray;
  }
  get journeyInfoGroup(): UntypedFormGroup {
    return this.journeyFormGroup.get('journeyInfoGroup') as UntypedFormGroup;
  }
  get journeyMoreInfoGroup(): UntypedFormGroup {
    return this.journeyFormGroup.get('moreInfoGroup') as UntypedFormGroup;
  }
  get journeyDetailArray(): UntypedFormArray {
    return this.journeyInfoGroup.get('journeyDetailArray') as UntypedFormArray;
  }
  get journeyCostArray(): UntypedFormArray {
    return this.journeyInfoGroup.get('journeyCostArray') as UntypedFormArray;
  }
  getJourneyDetailItem(index: number): UntypedFormArray {
    return this.journeyDetailArray.controls[index] as UntypedFormArray;
  }
  getJourneyCostItem(index: number): UntypedFormArray {
    return this.journeyCostArray.controls[index] as UntypedFormArray;
  }
  getJourneyCostItemCtrl(itemIndex: number, ctrlIndex: number): UntypedFormControl {
    return this.getJourneyCostItem(itemIndex).controls[ctrlIndex] as UntypedFormControl
  }
  getJourneyDetailItemCtrl(itemIndex: number, ctrlIndex: number): UntypedFormControl {
    return this.getJourneyDetailItem(itemIndex).controls[ctrlIndex] as UntypedFormControl
  }
  addJourneyCostItem() {
    this.journeyCostArray.push(new UntypedFormArray([
      new UntypedFormControl(''),
      new UntypedFormControl(''),
      new UntypedFormControl('')
    ]))
  }
  removeJourneyCostItem(index: number) {
    if (this.journeyCostArray.length > 1) {
      this.journeyCostArray.removeAt(index)
    }
  }
  getJourneyDayCtrl(index: number): UntypedFormControl {
    return this.journeyDayArray.controls[index] as UntypedFormControl;
  }
  getJourneyDayPlacesValue(index: number): JourneyDayPlace[] {
    let journeyDayValue: JourneyDay = this.getJourneyDayCtrl(index).value;
    return journeyDayValue.journeyDayPlaces;
  }
  ngOnInit(): void {
    /* JourneyPostFG changes*/
    this.journeyFormGroup.valueChanges.subscribe(v => { console.log(v) })
    /* Choice exist place */
    this.placeChoiceMethodCtrl.valueChanges.subscribe((method: number) => {
      this.provinces$ = this.localService.findAllProvince();
    });
    /* Get place by province */
    this.provinceCtrl.valueChanges.subscribe((provinceId) => {
      if (provinceId) {
        this.provincePlaces$ =
          this.provincePlaceService.findPlaceByProvinceId(provinceId);
      }
    });
    this.journeyDayArray.valueChanges.subscribe((v) => console.log(v));
    /* Search place */
    this.searchedPlaceCtrl.valueChanges
      .pipe(
        tap((_) => {
          this.visitPlaceAutocompleteResponse$ = of(null);
          this.haveVisitMap = false
        }),
        debounceTime(1000)
      )
      .subscribe((term) => {
        this.visitPlaceAutocompleteResponse$ = term
          ? this.goongService.getPlaceAutocomplete(term)
          : of(null);
      });
    /* Search departure place */
    this.searchedDeparturePlaceCtrl.valueChanges
      .pipe(
        tap((_) => {
          this.departurePlaceAutocompleteResponse$ = of(null);
          this.sltDeparturePlace = undefined
          this.haveDepartureMap = false
        }),
        debounceTime(1000)
      )
      .subscribe((term) => {
        this.departurePlaceAutocompleteResponse$ = term
          ? this.goongService.getPlaceAutocomplete(term)
          : of(null);
      });
    this.journeyFormGroup.valueChanges.subscribe(v => console.log(v))
    /* compute total payment */
    this.journeyCostArray.valueChanges.pipe(debounceTime(500)).subscribe((journeyCostArray: any[]) => {
      let totalPayment = 0
      journeyCostArray.forEach(journeyCostItem => {
        totalPayment += journeyCostItem[1]
      });
      console.log(totalPayment);
      
      this.journeyInfoGroup.get('totalPayment')?.setValue(totalPayment)
    })
  }
  /* process tab */
  addTab() {
    this.tabs.push(`Ngày ${this.tabs.length + 1}`);
    this.selected.setValue(this.tabs.length - 1);
    this.searchedPlaceCtrl.setValue("")
    this.journeyDayArray.push(
      this._formBuilder.control({
        day: this.selected.value + 1,
        journeyDayPlaces: [],
      })
    );
    this.journeyDetailArray.push(new UntypedFormArray([
      new UntypedFormControl(`Ngày ${this.tabs.length}`),
      new UntypedFormControl(''),
    ]))
  }

  removeTab(index: number) {
    // this.tabs.splice(index, 1);
    this.tabs.splice(this.tabs.length-1, 1);
    this.selected.setValue(this.tabs.length-1)
  }

  selectedIndexChange($event: any) {
    this.selected.setValue($event);
    this.placeChoiceMethodCtrl.setValue(null);
    this.provinceCtrl.setValue(null);
    console.log(this.selected.value);
  }

  openMapRouteDetail(day: number, fromIndex: number) {
    let srcPlace: JourneyDayPlace =
      this.getJourneyDayPlacesValue(day)[fromIndex];
    let desPlace: JourneyDayPlace =
      this.getJourneyDayPlacesValue(day)[fromIndex + 1];
    let srcUluru: Uluru = srcPlace.provincePlace
      ? { lat: srcPlace.provincePlace.lat, lng: srcPlace.provincePlace.lng }
      : { lat: srcPlace.goongPlaceDetailResult!.geometry.location.lat, lng: srcPlace.goongPlaceDetailResult!.geometry.location.lng };
    let desUluru: Uluru = desPlace.provincePlace
      ? { lat: desPlace.provincePlace.lat, lng: desPlace.provincePlace.lng }
      : { lat: desPlace.goongPlaceDetailResult!.geometry.location.lat, lng: desPlace.goongPlaceDetailResult!.geometry.location.lng };
    console.log(desUluru);
    console.log(srcUluru);

    this.matDialog.open(RouteDetailMapDialogComponent, {
      data: {
        srcUluru: srcUluru,
        desUluru: desUluru,
      },
    });
  }
  openMapLocationDetail(lat: number, lng: number) {
    this.matDialog.open(LocationDetailDialogComponent, {
      data: {
        lat: lat,
        lng: lng,
      },
    });
  }
  keyUpSearchPlace(searchValue: any) { }
  selectPlaceFromMapAutoComplete(prediction: Prediction, type: "visit" | "departure") {
    this.visitPlaceAutocompleteResponse$ = of(null);
    let mapContainer = type == 'visit' ? "visit-map" : "departure-map"
    type == 'visit' ? this.haveVisitMap = true : this.haveDepartureMap = true
    this.goongService.getPlaceDetailByPlaceId(prediction.place_id).subscribe(
      (response) => {
        if (type == 'visit') {
          this.sltVisitPlace = response.result
        } else if (type == 'departure') {
          this.sltDeparturePlace = response.result
        }
        goongjs.accessToken = GOONG_MAPTILES_KEY;
        let { geometry } = response.result;
        var map = new goongjs.Map({
          container: mapContainer,
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
  confirmMapPlace(day: number) {
    const truthDay = day + 1;
    let journeyDays: JourneyDay[] = this.journeyDayArray.value;
    let foundJourneyDay: JourneyDay | undefined = journeyDays.find(
      (journeyDay) => journeyDay.day == truthDay
    );
    if (this.sltVisitPlace) {
      const { name, geometry, formatted_address }: GoongPlaceDetailResultResponse = this.sltVisitPlace
      let journeyDayPlace: JourneyDayPlace = {
        goongPlaceDetailResult: this.sltVisitPlace,
      };
      if (foundJourneyDay) {
        foundJourneyDay.journeyDayPlaces.push(journeyDayPlace);
      } else {
        foundJourneyDay = {
          day: truthDay,
          journeyDayPlaces: [journeyDayPlace],
        };
        journeyDays.push(foundJourneyDay);
      }
      this.journeyDayArray.setValue(journeyDays);
    }
  }
  confirmDeparturePlace(placeDetailResultResponse: GoongPlaceDetailResultResponse) {
    const { formatted_address, name, geometry } = placeDetailResultResponse
    const location = geometry.location
    let goongPlaceDetailRequest: GoongPlaceDetailResultRequest = {
      formatAddress: formatted_address,
      name: name,
      lat: location.lat,
      lng: location.lng
    }
    this.journeyFormGroup.get('departurePlace')?.setValue(goongPlaceDetailRequest)
  }
  /* province place */
  selectExistProvincePlace(day: number, provincePlace: ProvincePlaceResponse) {
    const truthDay = day + 1;
    let journeyDays: JourneyDay[] = this.journeyDayArray.value;
    let foundJourneyDay: JourneyDay | undefined = journeyDays.find(
      (journeyDay) => journeyDay.day == truthDay
    );
    let journeyDayPlace: JourneyDayPlace = {
      provincePlace: provincePlace,
    };
    if (foundJourneyDay) {
      foundJourneyDay.journeyDayPlaces.push(journeyDayPlace);
    } else {
      foundJourneyDay = {
        day: truthDay,
        journeyDayPlaces: [journeyDayPlace],
      };
      journeyDays.push(foundJourneyDay);
    }
    this.journeyDayArray.setValue(journeyDays);
  }
  createJourneyPost() {
    let journeyPostRequest: JourneyPostRequest = { ...this.journeyFormGroup.value, ...this.journeyMoreInfoGroup.value}
    let journeyDayArray: JourneyDay[] = this.journeyDayArray.value
    let journeyDetailArray: any[] = this.journeyDetailArray.value
    let journeyCostDetailArray: any[] = this.journeyCostArray.value
    /* prepare data request */
    let journeyDetails: JourneyDetailRequest[] = journeyDetailArray.map((item) => {
      const journeyDetail: JourneyDetailRequest = {
        title: item[0],
        description: item[1],
      }
      return journeyDetail
    })
    let journeyCostDetails: JourneyCostDetailRequest[] = journeyCostDetailArray.map((item) => {
      const journeyCostDetail: JourneyCostDetailRequest = {
        name: item[0],
        cost: item[1],
        description: item[2],
      }
      return journeyCostDetail
    })
    let journeyDayRequests: JourneyDayRequest[] = journeyDayArray.map((journeyDayItem: JourneyDay) => {
      let journeyDayPlaceRequests: JourneyDayPlaceRequest[] = journeyDayItem.journeyDayPlaces.map(journeyDayPlace => {
        let journeyDayPlaceRequest: JourneyDayPlaceRequest = {
          provincePlaceId: undefined,
          goongPlaceDetailResult: undefined
        }
        if (journeyDayPlace.provincePlace) {
          journeyDayPlaceRequest.provincePlaceId = journeyDayPlace.provincePlace.id
        } else if (journeyDayPlace.goongPlaceDetailResult) {
          let goongPlaceDetailResult: GoongPlaceDetailResultRequest = {
            name: journeyDayPlace.goongPlaceDetailResult!.name,
            formatAddress: journeyDayPlace.goongPlaceDetailResult!.formatted_address,
            lat: journeyDayPlace.goongPlaceDetailResult!.geometry.location.lat,
            lng: journeyDayPlace.goongPlaceDetailResult!.geometry.location.lng
          }
          journeyDayPlaceRequest.goongPlaceDetailResult = goongPlaceDetailResult
        }
        return journeyDayPlaceRequest
      })
      let journeyDayRequest: JourneyDayRequest = {
        day: journeyDayItem.day,
        journeyDayPlaces: journeyDayPlaceRequests
      }
      return journeyDayRequest
    })
    journeyPostRequest.journeyDays = journeyDayRequests
    journeyPostRequest.journeyInfo = { ...this.journeyInfoGroup.value, journeyCostDetails: journeyCostDetails, journeyDetails: journeyDetails }
    console.log(journeyPostRequest);
    
    let journeyPost$: Observable<JourneyPostResponse> = this.coverImageFile ? this.uploadFileService.multipleUpload([this.coverImageFile]).pipe(
      switchMap(response => {
        let coverImageId = response.data[0].id
        return this.journeyPostService.createJourneyPost(journeyPostRequest, coverImageId)
      })
    ) : this.journeyPostService.createJourneyPost(journeyPostRequest)
    journeyPost$.subscribe(response => {console.log(response)
      this.dialogRef.close({
        createdJourneyPost: response
      })
    })
  }
  /* cover image method */
  onClickEditCoverImage(coverImageActionSelect: HTMLElement) {
    coverImageActionSelect.classList.toggle('show');
  }
  @HostListener('click', ['$event'])
  clickOutEditCoverImageBtn(event: any) {
    if (this.editCoverImageBtn) {
      if (
        event.target != this.editCoverImageBtn.nativeElement &&
        event.target.parentElement != this.coverImageActionSelect.nativeElement
      ) {
        if (
          this.coverImageActionSelect.nativeElement.classList.contains('show')
        ) {
          this.coverImageActionSelect.nativeElement.classList.remove('show');
        }
      }
    }
  }
  removeCoverImage() {
    this.coverImageFile = undefined;
    this.coverImageSrc = null;
  }
  coverImageChange(coverImageInput: HTMLInputElement) {
    const fileList: FileList | null = coverImageInput.files;
    if (fileList && fileList.length > 0) {
      const sltFile = fileList[0];
      this.coverImageFile = sltFile;
      const render = new FileReader();
      render.readAsDataURL(sltFile);
      render.onload = (event: ProgressEvent<FileReader>) => {
        this.coverImageSrc = render.result;
      };
    }
  }
}
