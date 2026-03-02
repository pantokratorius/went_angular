import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './services/auth/access-guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard]},

];


