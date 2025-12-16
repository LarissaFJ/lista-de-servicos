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
  message: string;
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
      const loginTime = localStorage.getItem('loginTime');
      
      if (token && role && email && loginTime) {
        if (this.isTokenExpired(loginTime)) {
          this.logout();
        } else {
          this.currentUserSubject.next({ token, role, email });
        }
      }
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          const loginTime = Date.now().toString();
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('email', response.email);
          localStorage.setItem('loginTime', loginTime);
        }
        this.currentUserSubject.next(response);
        alert(response.message);
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
      localStorage.removeItem('loginTime');
    }
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    
    const token = localStorage.getItem('token');
    const loginTime = localStorage.getItem('loginTime');
    
    if (!token || !loginTime) return false;
    
    if (this.isTokenExpired(loginTime)) {
      this.logout();
      alert('Sessão expirada, faça login novamente');
      return false;
    }
    
    return true;
  }

  private isTokenExpired(loginTime: string): boolean {
    const loginTimestamp = parseInt(loginTime);
    const currentTime = Date.now();
    const oneHourInMs = 60 * 60 * 1000; // 1 hora em milissegundos
    
    return (currentTime - loginTimestamp) > oneHourInMs;
  }

  isAdmin(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    const role = localStorage.getItem('role');
    return role === 'ROLE_ADMIN' || role === 'ADMIN';
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  resetPassword(email: string, newPassword: string) {
  return this.http.post(`${this.apiUrl}/reset-password`, {
    email,
    newPassword
  });
}


}