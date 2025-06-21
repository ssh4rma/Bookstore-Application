import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private readonly http: HttpService) {}

  list$ = new BehaviorSubject([]);

  getWishlist() {
    this.http.getHeader();
    let token = this.http.token;
    let url =
      'https://bookstore.incubation.bridgelabz.com/bookstore_user/get_wishlist_items';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-access-token': token,
    });
    return this.http.getAPI(url, { headers });
  }

  postWishList(productId: any) {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-access-token': token,
    });
    return this.http.postAPI(url, {}, { headers });
  }

  deleteWishListItem(productId: any) {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_wishlist_item/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-access-token': token,
    });
    return this.http.deleteAPI(url, { headers });
  }
}
