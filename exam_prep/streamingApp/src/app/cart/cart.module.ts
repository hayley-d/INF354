import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cart } from './cart.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CartRoutingModule
  ],
  declarations: [Cart]
})
export class CartModule {}
