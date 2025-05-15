import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {NavbarComponent } from '../../components/navbar/navbar.component'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

export class ProductListComponent implements OnInit {
  // Array of products retrieved from the API.
  products: Product[] = [];
  // Filtered list of products after applying search and sorting.
  filtered: Product[] = [];
  // The column currently being used to sort the products.
  sortColumn: string = '';
  // Determines if sorting is ascending or descending.
  sortAsc: boolean = true;
  // The current search string entered by the user.
  searchTerm: string = '';
  // Number of products displayed per page.
  pageSize: number = 5;
  // The currently active page in the pagination control.
  currentPage: number = 1;
  //  Success message displayed after creating a product.
  successMessage: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  /**
   * Angular lifecycle method called when the component is initialized.
   * - Reads query parameters to detect if a product was just created.
   * - Loads all products from the backend 
   * - Initializes the filtered list.
   */
  ngOnInit(): void {
    // Read query params to see if product was just created
      this.route.queryParams.subscribe(params => {
        if (params['created']) {
          this.successMessage = `${params['created']} created successfully.`;
        }
      });
    // Load all products from the backend  
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      // Initialize filtered list
      this.filtered = [...this.products];
    });
  }

  /**
   * Sorts the filtered product list by the specified column.
   * If the same column is clicked again, toggles ascending/descending.
   * @param column - The column to sort by (can be a key of Product or a virtual 'brand' or 'productType' column).
   */
  sortBy(column: keyof Product | 'brand' | 'productType') {
    // Checks if it is the same column
    if (this.sortColumn === column) {
      // Toggle on asc or desc
      this.sortAsc = !this.sortAsc;
    } else {
      // Sorts by the column selected
      this.sortColumn = column;
      this.sortAsc = true;
    }

    // Order the filtered array based off of expected sorting and filtering
    this.filtered.sort((a, b) => {
      const valA = this.getSortValue(a, column);
      const valB = this.getSortValue(b, column);

      if (typeof valA === 'number' && typeof valB === 'number') {
        return this.sortAsc ? valA - valB : valB - valA;
      }

      return this.sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }

  /**
   * Extracts the value to use for sorting from a given product and column name.
   * @param product - The product to extract the value from.
   * @param column - The column to extract.
   * @returns The value (string or number) to sort by.
   */
  getSortValue(product: Product, column: string): string | number {
    switch (column) {
      case 'brand':
        return product.brandName.toLowerCase();
      case 'productType':
        return product.productTypeName.toLowerCase();
      case 'price':
        return product.price; 
      default:
        const value = (product as any)[column];
        return typeof value === 'string' ? value.toLowerCase() : value;
    }
  }

  /**
   * Applies search term filtering and pagination to the product list.
   * @returns A list of products to display on the current page.
   */
  get filteredAndPaged(): Product[] {
    // Claculate the start and end index of the array
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    const filtered = this.filtered.filter(p => {
      const needle = this.searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.brandName.toLowerCase().includes(needle) ||
        p.productTypeName.toLowerCase().includes(needle) ||
        p.price.toFixed(2).includes(needle)
      );
    });

    // Return a slice of the array for correct size
    return filtered.slice(start, end);
  }
  
  /**
   * Calculates the total number of pages based on current filters and page size.
   * @returns An array of page numbers (e.g. [1, 2, 3]).
   */
  get totalPages(): number[] {
    const total = Math.ceil(this.filtered.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }
}

