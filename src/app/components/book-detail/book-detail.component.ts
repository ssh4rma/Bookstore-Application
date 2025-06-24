import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/books/book.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from 'src/app/service/feedback/feedback.service';
import { WishlistService } from 'src/app/service/wishlist/wishlist.service';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    TextFieldModule,
    FormsModule,
  ],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService,
    private readonly feedbackService: FeedbackService,
    private readonly wishlistService: WishlistService,
    private readonly cartService: CartService
  ) {}

  productId: string | null = '';
  targetProduct: any[] = [];
  bookIndex = -1;
  mainImgUrl = '../../../assets/book-cover.jpg';

  oneStar = false;
  twoStar = false;
  threeStar = false;
  fourStar = false;
  fiveStar = false;

  feedback: string = '';
  star: string = '';

  showQuantBtn = false;

  feedbackList: any[] = [];
  cartItems: any[] = [];
  productIsInWishList = false;

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.bookService.books$.subscribe({
      next: (res: any) => {
        console.log(res);
        this.targetProduct = res;
        this.targetProduct = this.targetProduct.filter((item: any) => {
          const flag = item._id === this.productId;
          if (flag) {
            this.bookIndex = res.indexOf(item) + 1;
          }
          return flag;
        });
        console.log(this.targetProduct);
      },
      error: (err) => console.log(err),
    });

    this.feedbackService.getFeedback(this.productId);
    this.feedbackService.feedbackList$.subscribe({
      next: (res: any) => {
        this.feedbackList = res.result.slice().reverse();
      },
      error: (err) => console.log(err),
    });

    this.loadCartItems();
    this.loadWishListItems();
  }

  loadWishListItems(): void {
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
        this.productIsInWishList = false;

        for (let i = 0; i < res.length; ++i) {
          if (res[i].product_id._id === this.productId) {
            this.productIsInWishList = true;
            break;
          }
        }
      },
      error: (err) => console.log(err),
    });
  }

  loadCartItems(): void {
    this.cartService.getAllCartItems();
    this.cartService.cartList$.subscribe({
      next: (res: any) => {
        this.cartItems = res.result.filter((book: any) => {
          return book.product_id._id === this.productId;
        });
        this.showQuantBtn = this.cartItems.length > 0;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  shareUrl(url: string): void {
    this.mainImgUrl = url;
  }

  onClickHome(): void {
    this.router.navigate(['']);
  }

  onClickOneStar(): void {
    this.oneStar = !this.oneStar;
    this.twoStar = false;
    this.threeStar = false;
    this.fourStar = false;
    this.fiveStar = false;

    this.star = '1';
  }

  onClickTwoStar(): void {
    this.oneStar = !this.oneStar;
    this.twoStar = !this.twoStar;
    this.threeStar = false;
    this.fourStar = false;
    this.fiveStar = false;
    this.star = '2';
  }

  onClickThreeStar(): void {
    this.oneStar = !this.oneStar;
    this.twoStar = !this.twoStar;
    this.threeStar = !this.threeStar;
    this.fourStar = false;
    this.fiveStar = false;
    this.star = '3';
  }

  onClickFourStar(): void {
    this.oneStar = !this.oneStar;
    this.twoStar = !this.twoStar;
    this.threeStar = !this.threeStar;
    this.fourStar = !this.fourStar;
    this.fiveStar = false;
    this.star = '4';
  }

  onClickFiveStar(): void {
    this.oneStar = !this.oneStar;
    this.twoStar = !this.twoStar;
    this.threeStar = !this.threeStar;
    this.fourStar = !this.fourStar;
    this.fiveStar = !this.fiveStar;
    this.star = '5';
  }

  onClickSubmit(): void {
    let data = {
      comment: this.feedback,
      rating: this.star,
    };
    this.feedbackService.postFeedback(data, this.productId).subscribe({
      next: (res: any) => {
        this.feedbackService.getFeedback(this.productId);
      },
      error: (err) => console.log(err),
    });

    this.feedback = '';
    this.oneStar = false;
    this.twoStar = false;
    this.threeStar = false;
    this.fourStar = false;
    this.fiveStar = false;
  }

  onClickAddToCart() {
    this.cartService.addToCart(this.productId).subscribe({
      next: (res: any) => console.log(res),
      error: (err) => console.log(err),
    });
    this.showQuantBtn = true;
  }

  isItemWishlisted = false;

  onClickAddToWishList(): void {
    this.isItemWishlisted = !this.isItemWishlisted;

    if (this.isItemWishlisted) {
      this.wishlistService.postWishList(this.productId).subscribe({
        next: (res: any) => {
          this.loadWishListItems();
        },
        error: (err) => console.log(err),
      });
    } else {
      this.wishlistService.deleteWishListItem(this.productId).subscribe({
        next: (res: any) => {
          this.loadWishListItems();
        },
        error: (err) => console.log(err),
      });
    }
  }

  decreaseQuant(): void {
    let cartProductId = this.cartItems[0]._id;
    let freq = this.cartItems[0].quantityToBuy;

    freq = freq - 1;

    if (freq >= 1) {
      let data = {
        quantityToBuy: freq,
      };
      this.cartService.updateCartItemQuant(cartProductId, data).subscribe({
        next: (res: any) => {
          // console.log(res);
          this.loadCartItems();
        },
        error: (err) => console.log(err),
      });
    } else alert('Quantity should be between 1 to 10');
  }

  increaseQuant(): void {
    let cartProductId = this.cartItems[0]._id;
    let freq = this.cartItems[0].quantityToBuy;
    console.log('moonlight product id in book detail', this.productId);
    freq = freq + 1;

    if (freq <= 10) {
      let data = {
        quantityToBuy: freq,
      };
      this.cartService.updateCartItemQuant(cartProductId, data).subscribe({
        next: (res: any) => {
          // console.log(res);
          this.loadCartItems();
        },
        error: (err) => console.log(err),
      });
    } else alert('Quantity should be between 1 to 10');
  }
}
