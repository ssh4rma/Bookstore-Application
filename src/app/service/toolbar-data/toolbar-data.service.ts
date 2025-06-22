import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolbarDataService {
  constructor() {}
  loginState$ = new BehaviorSubject<boolean>(false);
  searchValue$ = new BehaviorSubject<string>('');

  setSearchValue(value: string): void {
    this.searchValue$.next(value);
  }
}
