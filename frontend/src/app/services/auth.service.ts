import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  studentId?: string;
  department?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(data: { name: string; studentId: string; department: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string; role: 'student' | 'admin' }) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  saveLogin(data: { token: string; user: AuthUser }) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser(): AuthUser | null {
    const user = localStorage.getItem('user');

    if (user) {
      try {
        return JSON.parse(user) as AuthUser;
      } catch {
        this.logout();
      }
    }

    return null;
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    const user = this.getUser();

    return user?.role === 'admin';
  }

  isStudent() {
    const user = this.getUser();

    return user?.role === 'student';
  }
}
