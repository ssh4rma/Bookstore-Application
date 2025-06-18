import { Routes } from '@angular/router';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
import { ProfileComponent } from './components/profile/profile.component';
import { BooksCardComponent } from './components/books-card/books-card.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'login', component: LoginSignupComponent },
      {
        path: 'dashboard',
        component: BooksCardComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];
