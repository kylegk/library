import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGIN_URL = 'http://localhost:3000/auth/login';
  private readonly TOKEN_NAME = 'token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.LOGIN_URL, { username, password }).pipe(
      tap((response: any) => {
        this.setSession(response?.token || '');
      })
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_NAME);
    if (!token) {
      return false;
    }

    // NOTE: The value in the token is multipled by 1000 to have the same number of significant digits for comparison with Date.now()
    const expiresOn = JSON.parse(atob(token.split('.')[1])).exp * 1000;

    return expiresOn > Date.now();
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  private setSession(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }
}
