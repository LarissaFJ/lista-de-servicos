// auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  role: string;
  email: string;
}

interface RegisterRequest {
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const email = localStorage.getItem('email');
      if (token && role && email) {
        this.currentUserSubject.next({ token, role, email });
      }
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('email', response.email);

        }
        this.currentUserSubject.next(response);
      }));
  }

  register(email: string, password: string): Observable<RegisterResponse> {
    const body: RegisterRequest = { email, password };
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, body);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');

    }
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    const token = localStorage.getItem('token');
    return !!token;
  }

  isAdmin(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    const role = localStorage.getItem('role');
    return role === 'ROLE_ADMIN' || role === 'ADMIN';
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem('token');
  }
}

