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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BookService } from 'src/app/service/books/book.service';
import { MatCardModule } from '@angular/material/card';
import { ToolbarDataService } from 'src/app/service/toolbar-data/toolbar-data.service';
import { DialogRef } from '@angular/cdk/dialog';
import { BooksCardComponent } from '../books-card/books-card.component';

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

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService,
    private readonly toolbarData: ToolbarDataService
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
    localStorage.removeItem('name');
  }
}
