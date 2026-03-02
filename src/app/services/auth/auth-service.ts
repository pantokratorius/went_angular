import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>('/api/login', credentials).pipe(
      tap((res) => this.tokenSubject.next(res.token))
    );
  }

  get token() {
    return this.tokenSubject.value;
  }

  logout() {
    this.tokenSubject.next(null);
  }
}
