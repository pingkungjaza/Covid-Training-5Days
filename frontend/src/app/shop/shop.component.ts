import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    this.initCharts();
  }

  ngOnInit(): void {
  }

  initCharts() {
    this.drawLineChart()
    this.drawBarChart()
    this.drawRadarChart()
    this.drawDougnutChart()
  }

  drawDougnutChart() {
    var ctx = document.getElementById("canvasDoughnut");
    var canvasDoughnut = new Chart(ctx, {
      type: 'doughnut',
      tooltipFillColor: "rgba(51, 51, 51, 0.55)",
      data: {
        labels: [
          "Dark Grey",
          "Purple Color",
          "Gray Color",
          "Green Color",
          "Blue Color"
        ],
        datasets: [{
          data: [120, 50, 140, 180, 100],
          backgroundColor: [
            "#455C73",
            "#9B59B6",
            "#BDC3C7",
            "#26B99A",
            "#3498DB"
          ],
          hoverBackgroundColor: [
            "#34495E",
            "#B370CF",
            "#CFD4D8",
            "#36CAAB",
            "#49A9EA"
          ]
        }]
      },
      options: {
        legend: {
          display: false
        },
      }
    });
  }

  drawRadarChart() {
    var ctx = document.getElementById("canvasRadar");
    var canvasRadar = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(3, 88, 106, 0.2)",
            borderColor: "rgba(3, 88, 106, 0.80)",
            pointBorderColor: "rgba(3, 88, 106, 0.80)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.80)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(38, 185, 154, 0.2)",
            borderColor: "rgba(38, 185, 154, 0.85)",
            pointColor: "rgba(38, 185, 154, 0.85)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
      }
    });
  }

  drawBarChart() {
    var ctx = document.getElementById("barChart");
    var barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: '# of Votes',
            backgroundColor: "#26B99A",
            data: [51, 30, 40, 28, 92, 50, 45]
          },
          {
            label: '# of Votes',
            backgroundColor: "#03586A",
            data: [41, 56, 25, 48, 72, 34, 12]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 20
            }
          }]
        },
        legend: {
          display: false
        },
      }
    });
  }

  drawLineChart() {
    var ctx = document.getElementById("lineChart");
    var lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(38, 185, 154, 0.31)",
            borderColor: "rgba(38, 185, 154, 0.7)",
            pointBorderColor: "rgba(38, 185, 154, 0.7)",
            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [31, 74, 6, 39, 20, 85, 7]
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(3, 88, 106, 0.3)",
            borderColor: "rgba(3, 88, 106, 0.70)",
            pointBorderColor: "rgba(3, 88, 106, 0.70)",
            pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(151,187,205,1)",
            pointBorderWidth: 1,
            data: [82, 23, 66, 9, 99, 4, 2]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 20
            },
          }]
        },
      }
    });
  }

}
