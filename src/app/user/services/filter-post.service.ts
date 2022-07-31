import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterPost } from 'src/app/shared/models/model';
@Injectable({
  providedIn: 'root'
})
export class FilterPostService {
  filterPostBSub = new BehaviorSubject<FilterPost>({
    pageable: {
      pageIndex: 0,
      pageSize: 1
    }
  })
  filterPost$ = this.filterPostBSub.asObservable()
  constructor() { }
}
