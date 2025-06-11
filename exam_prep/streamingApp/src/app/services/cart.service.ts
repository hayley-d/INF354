import { Injectable } from '@angular/core';

interface SubscriptionData {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: { subscription: SubscriptionData; price: number, quantity: number }[] = [];
  constructor() { }

  getCart() : { subscription: SubscriptionData; price: number, quantity: number }[]{
    return this.cart;
  }

  addToCart(item: SubscriptionData) {
    const existing = this.cart.find(i => i.subscription.title == item.title);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({subscription: item, price: 10, quantity: 1});
    }
  }

  removeFromCart(title: string) {
    this.cart = this.cart.filter(i => i.subscription.title == title);
  }

  clearCart() {
    this.cart = [];
  }

  updateQuantity(title: string, qty: number) {
    const item = this.cart.find(i => i.subscription.title == title);
    if (item && qty > 0) {
      item.quantity = qty;
    }
  }

  getTotalCost(): number {
    return this.cart.reduce((acc,i) => acc + i.price * i.quantity, 0);
  }
}
