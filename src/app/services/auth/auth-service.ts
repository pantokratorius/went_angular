import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _user = signal<any | null>(null);
  private _loading = signal(false);

  // Public readonly signals
  user = this._user.asReadonly();
  loading = this._loading.asReadonly();

  isAuthenticated = computed(() => !!this._user());

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    this._loading.set(true);

    return this.http.post('/api/login', credentials)
      .pipe(
        tap((user: any) => {
          this._user.set(user);
        }),
        tap({
          finalize: () => this._loading.set(false)
        })
      );
  }

  logout() {
    return this.http.post('/api/logout', {})
      .pipe(
        tap(() => this._user.set(null))
      );
  }

  loadUser() {
    return this.http.get('/api/me')
      .pipe(
        tap(user => this._user.set(user)),
        catchError(() => {
          this._user.set(null);
          return of(null);
        })
      );
  }
}
