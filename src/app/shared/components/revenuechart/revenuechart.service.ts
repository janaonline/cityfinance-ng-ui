import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenuechartService {

  constructor() { }
  
  private setUlbList : BehaviorSubject<any> = new BehaviorSubject([]);
   getSelectedULBList = this.setUlbList.asObservable();

   private setYear : BehaviorSubject<any> = new BehaviorSubject(String);
   getYear = this.setYear.asObservable();

  updateUlbList(selectedUlbList){
     this.setUlbList.next(selectedUlbList)
  }

  setSelectedYear(selectedYear){
    this.setYear.next(selectedYear)
 }
}
