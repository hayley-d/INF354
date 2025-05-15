import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BrandService {
  // API endpoint to get all brands
  private api = 'http://localhost:5184/api/Brands';

  constructor(private http: HttpClient) {}

  // Retireves all brands from the backend
  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}

