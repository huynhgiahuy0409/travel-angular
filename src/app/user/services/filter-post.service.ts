import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterJourneyPost, FilterReviewPost } from 'src/app/shared/models/model';
@Injectable({
  providedIn: 'root'
})
export class FilterPostService {
  initFilter: FilterJourneyPost | FilterReviewPost= {
    pageable: {
      pageIndex: 0,
      pageSize: 1,
      sortable: {
        dir: "DESC",
        order: "createdDate"
      }
    }
  }
  filterPostBSub = new BehaviorSubject<FilterJourneyPost | FilterReviewPost>(this.initFilter)
  filterPost$ = this.filterPostBSub.asObservable()
  constructor() { }
}
