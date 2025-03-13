import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'edit/:id', component: EditProductComponent },
    { path: 'add', component: AddProductComponent }
  ];
  