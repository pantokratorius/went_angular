import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('token')
  );

  readonly token$ = this.tokenSubject.asObservable();
  readonly isAuthenticated$ = this.token$.pipe(
    map((token: string | null) => !!token)
  );

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>('/api/login', credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.tokenSubject.next(res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  get token() {
    return this.tokenSubject.value;
  }
}