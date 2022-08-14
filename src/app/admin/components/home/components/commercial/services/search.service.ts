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
  criteria$!: Observable<CriteriaOption[]| null>
  constructor() {
    this.criteriaBSub = new BehaviorSubject<CriteriaOption[] | null>(null)
    this.criteria$ = this.criteriaBSub.asObservable()
  }
}
