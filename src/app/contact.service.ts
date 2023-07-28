// contact.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'assets/person-list.json'; // JSON verilerinin bulunduğu dosya yolu

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}