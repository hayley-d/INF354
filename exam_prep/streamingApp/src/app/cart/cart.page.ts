import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

interface SubscriptionData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
  standalone: false,
})

export class Cart {
  showModal: boolean = false;
  cartItems = this.cartService.getCart();

  constructor(private cartService: CartService) {}

  increaseQuantity(item: { subscription: SubscriptionData; price: number, quantity: number }) {
    this.cartService.updateQuantity(item.subscription.title, item.quantity + 1);
  }

  decreaseQuantity(item: { subscription: SubscriptionData; price: number, quantity: number }) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.subscription.title, item.quantity - 1);
    }
  }

  getTotal(item: { subscription: SubscriptionData; price: number, quantity: number }): number {
    return item.price * item.quantity;
  }

  getGrandTotal() : number {
    return this.cartService.getTotalCost();
  }

  checkout() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.cartService.clearCart();
  }
}

