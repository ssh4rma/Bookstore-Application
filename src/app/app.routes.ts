import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BooksCardComponent } from './components/books-card/books-card.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: BooksCardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'bookDetail/:id', component: BookDetailComponent },
    ],
  },
];
