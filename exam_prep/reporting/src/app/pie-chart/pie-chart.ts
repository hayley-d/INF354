import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.scss'
})

export class PieChart {
  chart: any;

  items: string[] = ['Shoes', 'Jackets', 'Hats'];
  data2023: number[] = [500, 300, 200];
  data2024: number[] = [620, 400, 250];

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('pieChart', {
    type: 'pie', // pie chart
    data: {
      labels: this.items,
      datasets: [
        {
          label: '2023 Q1',
          data: this.data2023,
        },
        {
          label: '2024 Q1',
          data: this.data2024,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Product Sales',
          font: { size: 20 }
        },
        legend: {
          labels: { font: { size: 14 } }
        }
      }
    }
  });
  }

}
