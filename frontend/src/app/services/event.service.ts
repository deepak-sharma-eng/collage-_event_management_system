import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get(this.apiUrl);
  }

  getEvent(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addEvent(event: any) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, event, { headers });
  }

  updateEvent(id: string, event: any) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/${id}`, event, { headers });
  }

  deleteEvent(id: string) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}