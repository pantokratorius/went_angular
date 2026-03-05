import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './services/auth/access-guard';
import { Layout } from './layout/layout';
import { Domuments } from './pages/domuments/domuments';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},

  { path: '', component: Layout,
    canActivate: [authGuard],
    // pathMatch: 'full',
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: Dashboard},
      {path: 'documents', component: Domuments},
    ]},

];


