import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BookService } from 'src/app/service/books/book.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-books-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatPaginatorModule],
  templateUrl: './books-card.component.html',
  styleUrls: ['./books-card.component.css'],
})
export class BooksCardComponent {
  books: any[] = [];
  paginatedBooks: any[] = [];

  totalSize = 0;
  currentPage = 0;
  pageSize = 10;

  constructor(private readonly bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.books$.subscribe({
      next: (res) => {
        this.books = res;
        this.totalSize = res.length;
        this.updatePaginatedData();
      },
      error: (err) => console.log(err),
    });

    this.bookService.getBook();
  }

  updatePaginatedData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBooks = this.books.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedData();
  }
}
