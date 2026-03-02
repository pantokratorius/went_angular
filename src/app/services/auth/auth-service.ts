import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of, tap } from 'rxjs';

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

    return this.http.post<any>('/api/login', credentials).pipe(
      tap(user => this._user.set(user)),
      finalize(() => this._loading.set(false))
    );
  }

  logout() {
    return this.http.post('/api/logout', {}).pipe(
      tap(() => this._user.set(null))
    );
  }

  loadUser() {
    return this.http.get<any>('/api/me').pipe(
      catchError(() => of(null)),
      tap(user => this._user.set(user))
    );
  }
}
