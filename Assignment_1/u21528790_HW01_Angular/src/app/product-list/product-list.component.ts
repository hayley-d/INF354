import { Component } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent,NgFor,NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {
  products: Product[] = [];
  defaultProducts: Product[] = [ 
    { id: 0, name: 'Laptop', description: 'High-performance laptop', price: 1200 },
    { id: 1, name: 'Phone', description: 'Latest smartphone', price: 800 },
    { id: 2, name: 'Headphones', description: 'Noise-canceling', price: 150 }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data.length ? data : this.defaultProducts;
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onProductDeleted(productId: number): void {
    this.products = this.products.filter((product) => product.id !== productId);
  }
}
