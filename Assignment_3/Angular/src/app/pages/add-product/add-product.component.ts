import { Component, OnInit } from '@angular/core';
import {NavbarComponent } from '../../components/navbar/navbar.component'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BrandService } from '../../services/brand.service';
import { ProductTypeService } from '../../services/product-type.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  name = '';
  price: number | null = null;
  description = '';
  brandId = '';
  productTypeId = '';
  imageBase64: string = '';
  brands: any[] = [];
  productTypes: any[] = [];

  constructor( private brandService: BrandService, 
    private productTypeService: ProductTypeService, 
    private http: HttpClient, 
    private router: Router) 
    {}

  ngOnInit(): void {
    // Populate the brands and productTypes arrays with the data from the backend
    this.brandService.getBrands().subscribe(data => this.brands = data);
    this.productTypeService.getProductTypes().subscribe(data => this.productTypes = data);
  }

  // When there is a image upload convert to base64 string
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  onSubmit(): void {
    // Ensure all required fields are filled before submitting
    if (!this.name || !this.price || !this.description || !this.brandId || !this.productTypeId) {
      alert('All fields are required.');
      return;
    }

    // Construct the product object
    const payload = {
      name: this.name,
      description: this.description,
      price: this.price,
      brandId: Number(this.brandId),
      productTypeId: Number(this.productTypeId),
      image: this.imageBase64
    };

    // Submit the product to the backend API
    this.http.post('http://localhost:5184/api/Product', payload).subscribe({
      next: () => {
        // Navigate back to the product list with a success message
        this.router.navigate(['/products'], {
          queryParams: { created: this.name }
        });
      },
      error: (err) => {
        console.error(err);
        alert('Error creating product.');
      }
    });
  }

}
