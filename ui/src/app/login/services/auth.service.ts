import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, { username, password }).pipe(
      tap((response: any) => {
        this.setSession(response?.token || '');
      })
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    // NOTE: The value in the token is multipled by 1000 to have the same number of significant digits for comparison with Date.now()
    const expiresOn = JSON.parse(atob(token.split('.')[1])).exp * 1000;

    return expiresOn > Date.now();
  }

  private setSession(token: string) {
    localStorage.setItem('token', token);
  }
}
