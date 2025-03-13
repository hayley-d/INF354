import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
//import { environment } from '../../enviroments/environment';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = `https://localhost:7271/api/Product`;

  constructor(private http: HttpClient) {

  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://localhost:7271/api/Product');
  }

  getProduct(id: number): Observable<Product | null> {
    return this.http.get<Product | null>(`${this.apiUrl}/${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  putProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`,product);
  }
}
