import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color } from '@swimlane/ngx-charts';
import { ScaleType } from '@swimlane/ngx-charts';
import {NavbarComponent } from '../../components/navbar/navbar.component'
import { BrandService } from '../../services/brand.service';
import { ProductService } from '../../services/product.service';
import { ProductTypeService } from '../../services/product-type.service';
import { Brand } from '../../models/brand.model';
import { ProductType } from '../../models/producttype.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule, NavbarComponent,],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.scss'
})

export class ProductDashboardComponent implements OnInit {
  // Pie chart data for products grouped by type.
  byType: any[] = [];
  // Pie chart data grouped by brand
  byBrand: any[] = [];
  // Top 10 most expensive items
  top10: Product[] = [];

  // Brands, Product Types and Products retrieved from the backend
  brands: Brand[] = [];
  productTypes: ProductType[] = [];
  products: Product[] = [];

  // Chart dimensions (width, height).
  view: [number, number] = [400, 300];

  // Custom color scheme used in all charts.
  colorScheme: Color = {
    name: 'candy-pink',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#ffc0cb', '#ff69b4', '#ff1493', '#ffe4e1', '#ffa6c9']
  };

  constructor(private brandService: BrandService, 
    private productTypeService: ProductTypeService,
    private productService: ProductService,
    private http: HttpClient
  ) {}

  /**
   * Angular lifecycle hook: fetches all brands, product types, and products.
   * After data is loaded:
   * - Top 10 products by price are computed
   * - Products are grouped for pie charts by brand and type
   */
  ngOnInit(): void {
    // Fetch brands
    this.brandService.getBrands().subscribe(data => this.brands = data);
    // Fetch Product Types
    this.productTypeService.getProductTypes().subscribe(data => this.productTypes = data);
    // fetch Products and compute dashboard values
    this.productService.getProducts().subscribe(products => {
      this.products = products;

      // Compute top 10 most expensive products
      this.top10 = [...this.products]
        .sort((a, b) => b.price - a.price)
        .slice(0, 10);

      // Count products grouped by brand name
      const brandMap: Record<string, number> = {};
        for (const product of products) {
          const brand = this.brands.find(b => b.brandId === product.brandId);
          const brandName = brand ? brand.name : 'Unknown';
          brandMap[brandName] = (brandMap[brandName] || 0) + 1;
        }
        this.byBrand = Object.entries(brandMap).map(([name, value]) => ({ name, value }));

      // Group by Product Type Name 
      const typeMap: Record<string, number> = {};
      for (const product of this.products) {
        const typeName = product.productTypeName || 'Unknown';
        typeMap[typeName] = (typeMap[typeName] || 0) + 1;
      }
      this.byType = Object.entries(typeMap).map(([name, value]) => ({ name, value }));

    });

    
  }

  /**
   * Helper function: returns the name of a brand given its ID.
   * Used in the top 10 product table.
   * @param brandId - The brand's unique ID
   */
  getBrandName(brandId: number): string {
    const brand = this.brands.find(b => b.brandId === brandId);
    return brand ? brand.name : 'Unknown';
  }
}
