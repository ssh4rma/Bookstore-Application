import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/service/wishlist/wishlist.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  constructor(
    private readonly router: Router,
    private readonly wishlistService: WishlistService
  ) {}
  dialog = inject(MatDialog);
  isUserLogin = false;
  wishlist: any[] = [];

  ngOnInit(): void {
    if (
      localStorage.getItem('token') === null ||
      localStorage.getItem('token') === ''
    ) {
      this.isUserLogin = true;
    }

    this.wishlistService.getWishlist().subscribe({
      next: (res: any) => {
        this.wishlistService.list$.next(res.result);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.wishlistService.list$.subscribe({
      next: (res: any) => {
        this.wishlist = res;
        console.log(this.wishlist);
      },
      error: (err) => console.log(err),
    });
  }

  openDialog(): void {
    this.dialog.open(LoginSignupComponent, {
      panelClass: 'custom-dialog',
      data: { DialogRef },
    });
  }

  onClickHome(): void {
    this.router.navigate(['']);
  }
}
