import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  name = '';
  price: number | null = null;
  description = '';
  brandId = '';
  productTypeId = '';
  image: File | null = null;

  brands: any[] = [];
  productTypes: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:5001/api/brands').subscribe(data => this.brands = data);
    this.http.get<any[]>('https://localhost:5001/api/producttypes').subscribe(data => this.productTypes = data);
  }

  onFileChange(event: any): void {
    this.image = event.target.files[0];
  }

  onSubmit(): void {
    if (!this.name || !this.price || !this.description || !this.brandId || !this.productTypeId || !this.image) {
      alert('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('price', this.price.toString());
    formData.append('description', this.description);
    formData.append('brandId', this.brandId);
    formData.append('productTypeId', this.productTypeId);
    formData.append('image', this.image);

    this.http.post('https://localhost:5001/api/products', formData).subscribe({
      next: () => {
        this.router.navigate(['/products'], {
          queryParams: { created: this.name }
        });
      },
      error: () => {
        alert('Error creating product.');
      }
    });
  }
}
