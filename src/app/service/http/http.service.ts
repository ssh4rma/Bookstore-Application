import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  token = '';

  getHeader(): void {
    this.token = localStorage.getItem('token') ?? '';
  }

  getAPI(url: string, options: any = {}) {
    return this.http.get(url, options);
  }

  postAPI(url: string, body: any, options: any = {}) {
    return this.http.post(url, body, options);
  }
}
