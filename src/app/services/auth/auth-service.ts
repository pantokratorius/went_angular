import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _user = signal<any | null>(null);
  private _loading = signal(false);

  user = this._user.asReadonly();
  loading = this._loading.asReadonly();
  isAuthenticated = computed(() => !!this._user());

  constructor(private http: HttpClient) {}

  private setUser(user: any | null) {
    this._user.set(user);
  }

  private setLoading(value: boolean) {
    this._loading.set(value);
  }

  login(credentials: { email: string; password: string }) {
    this.setLoading(true);

    return this.http.post('/api/login', credentials).pipe(
      tap(user => this.setUser(user)),
      finalize(() => this.setLoading(false))
    );
  }

  logout() {
    return this.http.post('/api/logout', {}).pipe(
      tap(() => this.setUser(null))
    );
  }

  loadUser() {
    return this.http.get('/api/me').pipe(
      catchError(() => of(null)),
      tap(user => this.setUser(user))
    );
  }
}
