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
    private readonly wishlistService: WishlistService
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

  feedbackList: any[] = [];

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log(this.productId);

    this.bookService.books$.subscribe({
      next: (res: any) => {
        this.targetProduct = res;
        this.targetProduct = this.targetProduct.filter((item: any) => {
          const flag = item._id === this.productId;
          if (flag) {
            this.bookIndex = res.indexOf(item) + 1;
          }
          return flag;
        });
        console.log(this.targetProduct);
        console.log(this.productId);
      },
      error: (err) => console.log(err),
    });

    this.feedbackService.getFeedback(this.productId);
    this.feedbackService.feedbackList$.subscribe({
      next: (res: any) => {
        this.feedbackList = res.result;
        console.log(this.feedbackList);
      },
      error: (err) => console.log(err),
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
    this.feedbackService.postFeedback(data, this.productId).subscribe();

    this.feedback = '';
    this.oneStar = false;
    this.twoStar = false;
    this.threeStar = false;
    this.fourStar = false;
    this.fiveStar = false;
  }

  onClickAddToCart(): void {}
  onClickAddToWishList(): void {
    this.wishlistService.postWishList(this.productId).subscribe({
      next: (res: any) => {},
      error: (err) => console.log(err),
    });
  }
}
