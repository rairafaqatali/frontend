import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  toggleFavorite(id: number) {
   return this.http.post(`${this.apiUrl}/favorites/${id}`, {})
  }

  getFavorites() {
   return this.http.get(`${this.apiUrl}/favorites`)
  }
}
