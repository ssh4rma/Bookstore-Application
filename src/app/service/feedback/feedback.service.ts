import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private readonly http: HttpService) {}

  feedbackList$ = new BehaviorSubject([]);

  postFeedback(data: any, productId: any) {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://bookstore.incubation.bridgelabz.com/bookstore_user/add/feedback/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-access-token': token,
    });

    return this.http.postAPI(url, data, { headers });
  }

  getFeedback(productId: any) {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://bookstore.incubation.bridgelabz.com/bookstore_user/get/feedback/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-access-token': token,
    });

    this.http.getAPI(url, { headers }).subscribe({
      next: (res: any) => {
        this.feedbackList$.next(res);
      },
      error: (err) => console.log(err),
    });
  }
}
