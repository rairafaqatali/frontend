import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiBaseUrl;
  private baseUrl = environment.apiBaseUrl;
  private userEmail$ = new BehaviorSubject<string | null>(this.getEmail());

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        localStorage.setItem('email', payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
        this.userEmail$.next(payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.userEmail$.next(null);
  }

  getUserEmail() {
    return this.userEmail$.asObservable();
  }

  private getEmail() {
    return localStorage.getItem('email');
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
