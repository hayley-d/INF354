import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Home } from './home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HomeRoutingModule
  ],
  declarations: [Home]
})
export class HomeModule {}
