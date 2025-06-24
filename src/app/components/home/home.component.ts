import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BookService } from 'src/app/service/books/book.service';
import { MatCardModule } from '@angular/material/card';
import { ToolbarDataService } from 'src/app/service/toolbar-data/toolbar-data.service';
import { DialogRef } from '@angular/cdk/dialog';
import { CartService } from 'src/app/service/cart/cart.service';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatDividerModule,
    RouterOutlet,
    MatDialogModule,
    MatPaginatorModule,
    MatCardModule,
    MatBadgeModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  value = '';
  menuOpen!: boolean;
  IsUserLoggedIn = false;
  name = localStorage.getItem('name');
  dialog = inject(MatDialog);
  cartItems: any[] = [];
  cartSize = 0;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService,
    private readonly toolbarData: ToolbarDataService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token && token.trim() !== '') {
      this.IsUserLoggedIn = true;
      this.toolbarData.loginState$.next(true);
    }

    this.toolbarData.loginState$.subscribe({
      next: (res: boolean) => {
        if (res === true) {
          this.IsUserLoggedIn = true;
          this.bookService.getBook();
        } else if (res === false) {
          this.IsUserLoggedIn = false;
          this.bookService.getBook();
        }
      },
      error: (err) => console.log(err),
    });

    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getAllCartItems();
    this.cartService.cartList$.subscribe({
      next: (res: any) => {
        this.cartItems = res.result;
        this.cartSize = this.cartItems.length;
        console.log(this.cartSize);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSearchChange() {
    this.toolbarData.setSearchValue(this.value);
  }

  onProfileClick(): void {
    this.router.navigate(['profile'], { relativeTo: this.route });
  }

  openDialog(): void {
    this.dialog.open(LoginSignupComponent, {
      panelClass: 'custom-dialog',
      data: { DialogRef },
    });
  }

  onClickLogout(): void {
    this.toolbarData.loginState$.next(false);
    localStorage.removeItem('token');
  }

  onClickWishlist(): void {
    this.router.navigate(['wishlist']);
  }

  onClickCart(): void {
    this.router.navigate(['cart']);
  }

  onClickHomeButton(): void {
    this.router.navigate(['']);
  }

  onClickMyOrders(): void {
    this.router.navigate(['my-orders']);
  }
}
