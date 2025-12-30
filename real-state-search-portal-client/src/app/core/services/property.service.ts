import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  search(data: any) {
    return this.http.get<any[]>(`${this.apiUrl}/properties`, {
      params: this.getFilterQueryParams(data),
    });
  }

  getFilterQueryParams(data: any) {
    const queryParams: any = {};

    if (data.city) queryParams.city = data.city;
    if (data.bedrooms != null) queryParams.bedrooms = data.bedrooms;
    if (data.minPrice != null) queryParams.minPrice = data.minPrice;
    if (data.maxPrice != null) queryParams.maxPrice = data.maxPrice;

    return queryParams;
  }

  getPropertyById(id: any) {
    return this.http.get<any[]>(`${this.apiUrl}/properties/` + id);
  }
}
    