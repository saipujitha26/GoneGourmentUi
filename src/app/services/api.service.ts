import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<any> {
    return this.http.get(`${this.baseUrl}/brands`);
  }

  getLocations(brandId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/locations/${brandId}`);
  }

  getUnavailableItems(locationId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/unavailable-items/${locationId}`);
  }
}