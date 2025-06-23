import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BooksCardComponent } from './components/books-card/books-card.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: BooksCardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'bookDetail/:id', component: BookDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'my-orders', component: MyOrdersComponent },
    ],
  },
];
