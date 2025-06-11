import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

interface StreamingData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})


export class Home {
  data: StreamingData[] = [
    {
      title: "Netflux",
      description: "Stream movies, series, and originals anytime — all in one place."
    },
    {
      title: "ShowQ",
      description: "Local and international hits, reality shows, and live sport."
    },
    {
      title: "PrimeVid",
      description: "Blockbusters, binge-worthy series, and exclusive Prime Originals."
    },
    {
      title: "Dragontv+",
      description: "Epic fantasy, documentaries, and new releases from your couch."
    },
    {
      title: "StreamZone",
      description: "Your go-to for indie films, anime, and trending web series."
    }
  ];

  constructor(private cartService: CartService, private router: Router) {}

  addToCart(item: StreamingData) {
    this.cartService.addToCart(item);
    this.router.navigate(['/tabs/cart']);
  }
}
