import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpService) {}

  userLogin(data: any) {
    let url =
      'https://bookstore.incubation.bridgelabz.com/bookstore_user/login';

    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.postAPI(url, data, { header });
  }

  userSignup(data: any) {
    let url =
      'https://bookstore.incubation.bridgelabz.com/bookstore_user/registration';
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.postAPI(url, data, { header });
  }
}
