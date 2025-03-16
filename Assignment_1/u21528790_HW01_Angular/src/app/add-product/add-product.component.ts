import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product = {
    name: '',
    description: '',
    price: 0
  };

  constructor(private http: HttpClient, private router: Router) {}

  addProduct() {
    const apiUrl = 'https://localhost:7271/api/Product'; 

    this.http.post(apiUrl, this.product).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }
}
