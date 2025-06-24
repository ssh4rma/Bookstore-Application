import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from 'src/app/service/books/book.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  constructor(
    private readonly router: Router,
    private readonly bookService: BookService
  ) {}

  myOrdersId: any;
  myOrdersBooks: any[] = [];

  onClickHome(): void {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.myOrdersId = JSON.parse(localStorage.getItem('my-orders') ?? '[]');
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBook();
    this.bookService.books$.subscribe({
      next: (res: any) => {
        this.myOrdersBooks = [];

        for (let prodId of this.myOrdersId) {
          for (let book of res) {
            if (String(prodId) === String(book._id)) {
              this.myOrdersBooks.push(book);
            }
          }
        }

        console.log(this.myOrdersBooks);
      },
      error: (err) => console.log(err),
    });
  }
}
