import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-bar-line',
  imports: [],
  templateUrl: './bar-line.html',
  styleUrl: './bar-line.scss'
})

export class BarLine {
  chart: any;

  items: string[] = ['Shoes', 'Jackets', 'Hats'];
  data2023: number[] = [500, 300, 200];
  data2024: number[] = [620, 400, 250];

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('barLineChart', {
    type: 'bar',
    data: {
      labels: this.items, // X-axis: product names
      datasets: [
        {
          type: 'line',  // 2023 as line
          label: '2023 Q1',
          data: this.data2023,
          borderColor: 'red',
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.3              // Optional: curve smoothing
        },
        {
          type: 'bar',  // 2024 as bar
          label: '2024 Q1',
          data: this.data2024,
          backgroundColor: 'blue'
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
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Sales (R thousands)'
          }
        }
      }
    }
  });
  }

}
