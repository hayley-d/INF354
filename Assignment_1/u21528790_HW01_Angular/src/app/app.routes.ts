import { provideRouter, Route } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Route[] = [
    { path: '', component: ProductListComponent },
    { path : 'add-product', component: AddProductComponent},
    { path: 'edit-product/:id', component: EditProductComponent },
  ];