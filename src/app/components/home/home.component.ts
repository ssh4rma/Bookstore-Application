import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { BooksCardComponent } from '../books-card/books-card.component';
import { Router, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginSignupComponent } from '../login-signup/login-signup.component';

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
    BooksCardComponent,
    RouterOutlet,
    MatDialogModule,
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

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token && token.trim() !== '') {
      this.IsUserLoggedIn = true;
    }
  }

  onProfileClick(): void {
    console.log('click for profile component is triggered');
    this.router.navigate(['/home/profile']);
  }

  openDialog(): void {
    this.dialog.open(LoginSignupComponent, {
      panelClass: 'custom-dialog',
    });
  }
}
