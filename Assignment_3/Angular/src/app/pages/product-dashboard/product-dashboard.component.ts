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
  byType: any[] = [];
  byBrand: any[] = [];
  top10: Product[] = [];

  brands: Brand[] = [];
  productTypes: ProductType[] = [];
  products: Product[] = [];

  view: [number, number] = [400, 300];
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

  ngOnInit(): void {
    // Get the brands and product types from the backend.
    this.brandService.getBrands().subscribe(data => this.brands = data);
    this.productTypeService.getProductTypes().subscribe(data => this.productTypes = data);

    // Get products and then compute top10 + other chart data
    this.productService.getProducts().subscribe(products => {
      this.products = products;

      // Top 10 expensive products
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

        // Group by Product Type
        const typeMap: Record<string, number> = {};
        for (const product of this.products) {
          const type = this.productTypes.find(t => t.productTypeId === product.productType);
          const typeName = type ? type.name : 'Unknown';
          typeMap[typeName] = (typeMap[typeName] || 0) + 1;
        }
        this.byType = Object.entries(typeMap).map(([name, value]) => ({ name, value }));
    });

    
  }

  getBrandName(brandId: number): string {
    const brand = this.brands.find(b => b.brandId === brandId);
    return brand ? brand.name : 'Unknown';
  }

  getTypeName(typeId: number): string {
    const type = this.productTypes.find(t => t.productTypeId === typeId);
    return type ? type.name : 'Unknown';
  }

}
