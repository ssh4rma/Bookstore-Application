import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatExpansionModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(
    private readonly router: Router,
    private readonly cartService: CartService
  ) {}

  isCartOpen = true;
  items: any[] = [];

  ngOnInit(): void {
    this.cartService.getAllCartItems();
    this.cartService.cartList$.subscribe({
      next: (res: any) => {
        this.items = res.result;
        console.log(this.items);
      },
      error: (err) => console.log(err),
    });
  }

  onClickHomeBtn(): void {
    this.router.navigate(['']);
  }

  removeItem(productId: any): void {
    this.cartService.deleteCartItem(productId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartService.getAllCartItems();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  decreaseQuant(productId: any): void {
    const item = this.items.find((i) => i._id === productId);
    let freq = item.quantityToBuy;
    freq = freq - 1;

    if (freq >= 1) {
      let data = {
        quantityToBuy: freq,
      };
      this.cartService.updateCartItemQuant(productId, data).subscribe({
        next: () => {
          this.cartService.getAllCartItems();
        },
        error: (err) => console.log(err),
      });
    } else alert('Quantity should be between 1 to 10');
  }

  increaseQuant(productId: any): void {
    const item = this.items.find((i) => i._id === productId);
    let freq = item.quantityToBuy;
    freq = freq + 1;

    if (freq <= 10) {
      let data = {
        quantityToBuy: freq,
      };
      this.cartService.updateCartItemQuant(productId, data).subscribe({
        next: () => {
          this.cartService.getAllCartItems();
        },
        error: (err) => console.log(err),
      });
    } else alert('Quantity should be between 1 to 10');
  }
}
