import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolbarDataService {
  constructor() {}
  loginState$ = new BehaviorSubject<boolean>(false);
}
