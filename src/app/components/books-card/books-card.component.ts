import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BookService } from 'src/app/service/books/book.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToolbarDataService } from 'src/app/service/toolbar-data/toolbar-data.service';

@Component({
  selector: 'app-books-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatPaginatorModule],
  templateUrl: './books-card.component.html',
  styleUrls: ['./books-card.component.css'],
})
export class BooksCardComponent {
  allBooks: any[] = [];
  books: any[] = [];
  paginatedBooks: any[] = [];
  hoveredIndex = -1;

  totalSize = 0;
  currentPage = 0;
  pageSize = 10;

  constructor(
    private readonly bookService: BookService,
    private readonly router: Router,
    private readonly toolbarService: ToolbarDataService
  ) {}

  ngOnInit(): void {
    this.fetchBooks();

    this.toolbarService.searchValue$.subscribe({
      next: (value: string) => {
        this.applySearchFilter(value);
      },
      error: (err) => console.log(err),
    });
  }

  fetchBooks(): void {
    this.bookService.books$.subscribe({
      next: (res) => {
        this.allBooks = res;
        this.books = res;
        this.totalSize = res.length;
        this.updatePaginatedData();
      },
      error: (err) => console.log(err),
    });

    this.bookService.getBook();
  }

  applySearchFilter(value: string): void {
    const search = value.trim().toLowerCase();
    this.books = this.allBooks.filter((book) => {
      return book.bookName?.toLowerCase().includes(search);
    });

    this.totalSize = this.books.length;
    this.currentPage = 0;
    this.updatePaginatedData();
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

  quickViewHandlerIn(idx: number): void {
    this.hoveredIndex = idx;
  }
  quickViewHandlerOut(): void {
    this.hoveredIndex = -1;
  }
  onClickQuickView(idx: number): void {
    this.router.navigate(['/bookDetail', this.books[idx]._id]);
  }
}
