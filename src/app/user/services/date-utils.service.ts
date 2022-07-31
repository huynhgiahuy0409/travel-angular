import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {
  constructor() { }
  dateTimeFormula(timestamp: Date){
    return new Date(timestamp).toLocaleString()
  }
}
