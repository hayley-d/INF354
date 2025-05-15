import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  // API endpoint to get all products
  private api = 'http://localhost:5184/api/Product';

  constructor(private http: HttpClient) {}

  // Retrieves all products from the backend
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }
}
