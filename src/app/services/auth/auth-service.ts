import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _user = signal<any | null>(null);
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = () => !!this._user();

  constructor(private http: HttpClient) {}

  // LOGIN
  login(credentials: { email: string; password: string }) {
    return this.http.post('/api/login', credentials, { withCredentials: true }).pipe(
      switchMap(() => this.loadUser())
    );
  }

  // LOGOUT
  logout() {
    return this.http.post('/api/logout', {}, { withCredentials: true }).pipe(
      tap(() => this._user.set(null))
    );
  }

  // LOAD USER
  loadUser() {
    return this.http.get('/api/me', { withCredentials: true }).pipe(
      catchError(() => of(null)),
      tap(user => this._user.set(user))
    );
  }
}