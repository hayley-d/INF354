import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BrandService {
  private api = 'http://localhost:5184/api/Brands';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}

