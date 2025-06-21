import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private readonly http: HttpService) {}

  cartList$ = new BehaviorSubject([]);

  addToCart(productId: any) {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-access-token': token,
    });

    return this.http.postAPI(url, {}, { headers });
  }

  getAllCartItems(): void {
    this.http.getHeader();
    let token = this.http.token;
    let url =
      'https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-access-token': token,
    });

    this.http.getAPI(url, { headers }).subscribe({
      next: (res: any) => {
        this.cartList$.next(res);
      },
      error: (err) => console.log(err),
    });
  }

  deleteCartItem(productId: any) {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-access-token': token,
    });

    return this.http.deleteAPI(url, { headers });
  }

  updateCartItemQuant(productId: any, data: any) {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-access-token': token,
    });

    return this.http.putAPI(url, data, { headers });
  }
}
