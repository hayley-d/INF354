import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() productDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private productService: ProductService) {}
  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          console.log('Product deleted successfully!');
          this.productDeleted.emit(productId); 
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
