import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ProductService } from './app/services/product.service'; 
import { provideRouter, Route } from '@angular/router';
import { ProductListComponent } from './app/product-list/product-list.component';
import { EditProductComponent } from './app/edit-product/edit-product.component';
import { AddProductComponent } from './app/add-product/add-product.component';

const routes: Route[] = [
    { path: '', component: ProductListComponent },
    { path : 'add', component: AddProductComponent},
    { path: 'edit-product/:id', component: EditProductComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    ProductService, 
    provideRouter(routes) 
  ],
})
  .catch((err) => console.error(err));

  