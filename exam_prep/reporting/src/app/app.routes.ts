import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PieChart } from './pie-chart/pie-chart';
import { BarLine } from './bar-line/bar-line';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pie', component: PieChart },
  { path: 'barline', component: BarLine },
];
