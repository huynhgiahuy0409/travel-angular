import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewPostDestroyService {
  isDestroyBeSub = new BehaviorSubject<boolean>(false);
  isDestroy$ = this.isDestroyBeSub.asObservable()
  constructor() { }
}
