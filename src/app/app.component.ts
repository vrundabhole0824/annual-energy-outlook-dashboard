import { Component, OnInit } from '@angular/core';

import { GetdataService } from './getdata.service';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
Chart.register(...registerables);
import { ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dropDownForm!: FormGroup;
  title = 'Apply filter to see the Visualization';
  insight = '';
  showTopic = false;
  myChart!: Chart;
  intensity: any[] = [];
  response: any[] = [];

  constructor(private getdata: GetdataService, private elementRef: ElementRef) {
    this.getdata.getdata().subscribe((res: any) => {
      console.log(res);
      this.response = res;
    });
  }

  ngOnInit(): void {
    this.dropDownForm = new FormGroup({
      country: new FormControl(''),
      topic: new FormControl(''),
      sector: new FormControl(''),
      pestle: new FormControl(''),
      region: new FormControl(''),
      source: new FormControl(''),
    });
  }

  applyFilter(
    country: any,
    sector: any,
    topic: any,
    region: any,
    source: any,
    pestle: any
  ) {
    this.showTopic = true;
    if (this.myChart) {
      this.myChart.destroy();
    }
    const filteredData = this.response.filter(
      (item) =>
        item.country === country &&
        item.sector === sector &&
        item.topic === topic &&
        item.region === region &&
        item.source === source &&
        item.pestle === pestle
    );

    this.createChart(filteredData);
  }

  private createChart(filteredData: any): void {
    let intensity = filteredData.map(
      (item: { intensity: any }) => item.intensity
    );
    let likelihood = filteredData.map(
      (item: { likelihood: any }) => item.likelihood
    );
    let relevance = filteredData.map(
      (item: { relevance: any }) => item.relevance
    );
    let addedDate = filteredData.map((item: { added: any }) => item.added);
    this.title = filteredData.map((item: { title: any }) => item.title);
    this.insight = filteredData.map((item: { insight: any }) => item.insight);

    const extractedDates = addedDate.map((dateStr: string) => {
      const parts = dateStr.split(' ');
      return parts[0] + ' ' + parts[1] + ' ' + parts[2];
    });
    const canvas = this.elementRef.nativeElement.querySelector('#piechart');
    const context = canvas.getContext('2d');

    this.myChart = new Chart(context, {
      type: 'bar',
      data: {
        labels: extractedDates,
        datasets: [
          {
            barThickness: 20,
            label: 'intensity',
            data: intensity,
            backgroundColor: 'rgba(39, 140, 245, 0.7)',
            borderColor: 'rgba(39, 140, 245, 0.7)',
            borderWidth: 1,
          },
          {
            barThickness: 20,

            label: 'likelihood',
            data: likelihood,
            backgroundColor: 'rgba(241, 95, 95, 0.63)',
            borderColor: 'rgba(241, 95, 95, 0.63)',
            borderWidth: 1,
          },
          {
            barThickness: 20,

            label: 'relevance',
            data: relevance,
            backgroundColor: 'rgba(244, 202, 6, 0.65)',
            borderColor: 'rgba(244, 202, 6, 0.65)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
            },
          },
          y: {
            grid: {
              drawOnChartArea: false,
            },
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });

    const datacheck = this.myChart.config.data.labels;
    this.myChart.update();
  }
}
