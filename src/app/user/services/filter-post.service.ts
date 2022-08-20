import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterCommercialPost, FilterJourneyPost, FilterReviewPost, Pageable, Sortable } from 'src/app/shared/models/model';
@Injectable({
  providedIn: 'root'
})
export class FilterPostService {
  initPageable: Pageable = {
    pageIndex: 0,
    pageSize: 20,
  }
  defaultSorter: Sortable = {
    dir: "DESC",
    order: "createdDate"
  }
  initFilter!: FilterReviewPost | FilterJourneyPost | FilterCommercialPost
  initJourneyPostFilter!: FilterJourneyPost
  initCommercialFilter!: FilterCommercialPost
  reviewPostFilterBSub!: BehaviorSubject<FilterReviewPost>
  reviewPostFilter$: Observable<FilterReviewPost>
  journeyPostFilterBSub!: BehaviorSubject<FilterJourneyPost>
  journeyPostFilter$!: Observable<FilterJourneyPost>
  commercialFilterBSub!: BehaviorSubject<FilterCommercialPost>
  commercialFilter$!: Observable<FilterCommercialPost>
  constructor() {
    this.initFilter = {
      pageable: {
        ...this.initPageable,
        sortable: this.defaultSorter
      }
    }
    this.reviewPostFilterBSub = new BehaviorSubject<FilterReviewPost>(this.initFilter)
    this.reviewPostFilter$ = this.reviewPostFilterBSub.asObservable()
    this.journeyPostFilterBSub = new BehaviorSubject<FilterJourneyPost>(this.initFilter)
    this.journeyPostFilter$ = this.journeyPostFilterBSub.asObservable()
    this.commercialFilterBSub = new BehaviorSubject<FilterCommercialPost>(this.initFilter)
    this.commercialFilter$ = this.commercialFilterBSub.asObservable()
  }
}