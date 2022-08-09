import { switchMap } from 'rxjs/operators';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/shared/models/model';
import { JourneyPostResponse } from 'src/app/shared/models/response';
import { DateUtilsService } from 'src/app/user/services/date-utils.service';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { JourneyPostService } from 'src/app/user/services/journey-post.service';
import { LocalService } from 'src/app/user/services/local.service';
import * as goongjs from '@goongmaps/goong-js';
import * as goongsdk from '@goongmaps/goong-sdk';
import * as polyline from '@mapbox/polyline';
import { GOONG_MAPTILES_KEY } from 'src/app/shared/models/constant';
@Component({
  selector: 'app-journey-detail',
  templateUrl: './journey-detail.component.html',
  styleUrls: ['./journey-detail.component.scss']
})
export class JourneyDetailComponent implements OnInit, AfterViewInit{
  journeyPostId!: number 
  journeyPostResponse$!: Observable<JourneyPostResponse>
  relativeJourneyPostsResponse$!: Observable<JourneyPostResponse[]>
  sltDayIndex = 0 
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private journeyPostService: JourneyPostService,
    public directLinkService: DirectLinkService,
    public dateUtilsService: DateUtilsService,
    public localService: LocalService,
  ) {}
  ngAfterViewInit(): void {
    this.journeyPostResponse$.subscribe(response => {
      goongjs.accessToken = GOONG_MAPTILES_KEY
      var map = new goongjs.Map({
        container: "departure-map",
        style: 'https://tiles.goong.io/assets/goong_map_web.json',
        center: [response.departurePlace.lng, response.departurePlace.lat],
        zoom: 13,
      });
      new goongjs.Marker()
        .setLngLat([response.departurePlace.lng, response.departurePlace.lat])
        .addTo(map);
    })
  }

  ngOnInit(): void {
    this.journeyPostId = this.activatedRoute.snapshot.params.id;
    if(this.journeyPostId){
      this.journeyPostResponse$ = this.journeyPostService.findById(this.journeyPostId)
    }else{
      this.router.navigate(['/page-not-found'])
    }
    this.journeyPostResponse$.subscribe(response => {
      console.log(response);
      
    })
  }
  onClickClose() {
    this.router.navigate(['/home/journey-posts']);
  }

@HostListener('document:keyup.escape', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {
  this.router.navigate(['/home/journey-posts']);
}openMapRouteDetail(day: number, fromIndex: number) {
  // let srcPlace: JourneyDayPlace =
  //   this.getJourneyDayPlacesValue(day)[fromIndex];
  // let desPlace: JourneyDayPlace =
  //   this.getJourneyDayPlacesValue(day)[fromIndex + 1];
  // let srcUluru: Uluru = srcPlace.provincePlace
  //   ? { lat: srcPlace.provincePlace.lat, lng: srcPlace.provincePlace.lng }
  //   : { lat: srcPlace.goongPlaceDetailResult!.geometry.location.lat, lng: srcPlace.goongPlaceDetailResult!.geometry.location.lng };
  // let desUluru: Uluru = desPlace.provincePlace
  //   ? { lat: desPlace.provincePlace.lat, lng: desPlace.provincePlace.lng }
  //   : { lat: desPlace.goongPlaceDetailResult!.geometry.location.lat, lng: desPlace.goongPlaceDetailResult!.geometry.location.lng };
  // console.log(desUluru);
  // console.log(srcUluru);

  // this.matDialog.open(RouteDetailMapDialogComponent, {
  //   data: {
  //     srcUluru: srcUluru,
  //     desUluru: desUluru,
  //   },
  // });
}
navigateMomoPayment(journeyPostId: number){
  this.router.navigate([`/journey-post/${journeyPostId}/payment`]);
}
  journeyDayPlaces = "journeyDayPlaces"
  selectDay(index:number){
    this.sltDayIndex = index
    let selectDayPlacesElement = document.getElementById(`${this.journeyDayPlaces}${index}`)
    if(selectDayPlacesElement){
      selectDayPlacesElement.scrollIntoView({ behavior: 'smooth'})
    }
  }
}
