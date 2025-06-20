import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { BookData } from 'src/app/model/bookData';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly bookSubject = new BehaviorSubject<BookData[]>([]);
  books$ = this.bookSubject.asObservable();

  constructor(private readonly http: HttpService) {}

  getBook() {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http.getAPI(url, { headers }).subscribe({
      next: (res: any) => {
        this.bookSubject.next(res.result as BookData[]);
      },
      error: (err) => console.error(err),
    });
  }
}
