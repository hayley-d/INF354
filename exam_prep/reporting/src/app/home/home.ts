import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {
  chart: any;

  items: string[] = ['Shoes', 'Jackets', 'Hats'];
  data2023: number[] = [500, 300, 200];
  data2024: number[] = [620, 400, 250];

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('salesChart', {
      type: 'bar', // Bar chart
      data: {
        labels: this.items, // X-axis labels = items
        datasets: [
          {
            label: '2023 Q1',     // Legend label
            data: this.data2023,  // Y-values
            backgroundColor: 'blue', // Blue bars
          },
          {
            label: '2024 Q1',     // Legend label
            data: this.data2024,  // Y-values
            backgroundColor: 'red', // Red bars
          }
        ]
      },
      options: {
        responsive: true, // Makes it scale to screen size
        plugins: {
          // Adds a title above the chart
          title: {
            display: true,
            text: 'Product Sales', // Chart heading
            font: {
              size: 20
            }
          },
          // Customize the legend (bottom of chart)
          legend: {
            labels: {
              font: {
                size: 14 // Bigger legend font
              }
            }
          }
        },
        scales: {
          // Configure Y-axis
          y: {
            beginAtZero: true, // Start from 0
            title: {
              display: true,
              text: 'Sales (R thousands)' // Label on Y-axis
            }
          }
        }
      }
    });
  }
}
