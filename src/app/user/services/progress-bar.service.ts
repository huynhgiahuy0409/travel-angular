import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  progressBarBSub = new BehaviorSubject<boolean>(false)
  progressBar$ = this.progressBarBSub.asObservable()
  constructor() {
    this.progressBar$.subscribe(v => console.log(v))
  }
}
