import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterJourneyPost, FilterReviewPost, Pageable, Sortable } from 'src/app/shared/models/model';
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
  initFilter!: FilterJourneyPost | FilterReviewPost
  filterPostBSub!: BehaviorSubject<FilterJourneyPost | FilterReviewPost>
  filterPost$: Observable<FilterJourneyPost | FilterReviewPost>
  constructor() {
    this.initFilter = {
      pageable: {
        ...this.initPageable,
        sortable: this.defaultSorter
      }
    }
    this.filterPostBSub = new BehaviorSubject<FilterJourneyPost | FilterReviewPost>(this.initFilter)
    this.filterPost$ = this.filterPostBSub.asObservable()
  }
}