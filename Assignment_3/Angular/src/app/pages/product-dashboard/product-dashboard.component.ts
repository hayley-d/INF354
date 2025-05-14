import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color } from '@swimlane/ngx-charts';
import { ScaleType } from '@swimlane/ngx-charts';
import {NavbarComponent } from '../../components/navbar/navbar.component'
@Component({
  selector: 'app-product-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule, NavbarComponent],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.scss'
})
export class ProductDashboardComponent implements OnInit {
  top10: any[] = [];
  byBrand: any[] = [];
  byType: any[] = [];

  view: [number, number] = [400, 300];
  colorScheme: Color = {
    name: 'candy-pink',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#ffc0cb', '#ff69b4', '#ff1493', '#ffe4e1', '#ffa6c9']
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:5001/api/Products').subscribe(data => {
      // Top 10 expensive
      this.top10 = [...data]
        .sort((a, b) => b.price - a.price)
        .slice(0, 10);

      // Group by brand
      const brandMap: Record<string, number> = {};
      const typeMap: Record<string, number> = {};

      for (const p of data) {
        brandMap[p.brand.name] = (brandMap[p.brand.name] || 0) + 1;
        typeMap[p.productType.name] = (typeMap[p.productType.name] || 0) + 1;
      }

      this.byBrand = Object.entries(brandMap).map(([name, value]) => ({ name, value }));
      this.byType = Object.entries(typeMap).map(([name, value]) => ({ name, value }));
    });
  }
}
