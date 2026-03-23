import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Dashboard } from "../pages/dashboard/dashboard";
import { AuthService } from '../services/auth/auth-service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  constructor(private auth: AuthService) {}


   logout() {
    this.auth.logout();
  }

}

