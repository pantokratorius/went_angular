import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, of, tap, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _user = signal<any | null>(null);
  private _loading = signal(false);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    this._loading.set(true);
    return this.http.post('/api/login', credentials, { withCredentials: true }).pipe(
      switchMap(() => this.loadUser()), // load user after login
      finalize(() => this._loading.set(false))
    );
  }

  logout() {
    return this.http.post('/api/logout', {}, { withCredentials: true }).pipe(
      tap(() => this._user.set(null))
    );
  }

  loadUser() {
  return this.http.get('/api/me', { withCredentials: true }).pipe(
    catchError(() => of(null)),
    tap(user => this._user.set(user))
  );
}

  refreshToken() {
    return this.http.post('/api/refresh', {}, { withCredentials: true });
  }
}
