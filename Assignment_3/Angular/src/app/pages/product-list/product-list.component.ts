import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  sortColumn: string = '';
  sortAsc: boolean = true;
  searchTerm: string = '';
  pageSize: number = 5;
  currentPage: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filtered = [...this.products];
    });
  }

  sortBy(column: keyof Product | 'brand' | 'productType') {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }

    this.filtered.sort((a, b) => {
      const valA = this.getSortValue(a, column);
      const valB = this.getSortValue(b, column);
      return this.sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }

  getSortValue(product: Product, column: string): string {
    switch (column) {
      case 'brand':
        return product.brand.name.toLowerCase();
      case 'productType':
        return product.productType.name.toLowerCase();
      default:
        return String((product as any)[column]).toLowerCase();
    }
  }

  get filteredAndPaged(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    const filtered = this.filtered.filter(p => {
      const needle = this.searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.brand.name.toLowerCase().includes(needle) ||
        p.productType.name.toLowerCase().includes(needle) ||
        p.price.toFixed(2).includes(needle)
      );
    });

    return filtered.slice(start, end);
  }

  get totalPages(): number[] {
    const total = Math.ceil(this.filtered.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }
}

