import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface CriteriaOption{
  label: string,
  value: string
}
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  criteriaBSub!: BehaviorSubject<CriteriaOption[] | null> 
  criteria$!: Observable<CriteriaOption[] | null>
  searchValueBSub!: BehaviorSubject<string | ''> 
  searchValue$!: Observable<string | ''> 
  constructor() {
    this.criteriaBSub = new BehaviorSubject<CriteriaOption[] | null>([])
    this.criteria$ = this.criteriaBSub.asObservable()
    this.searchValueBSub = new BehaviorSubject('')
    this.searchValue$ = this.searchValueBSub.asObservable()
  }
}
