import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: '가격',
          data: [
            420000, 440000, 470000, 450000, 460000, 480000, 520000, 540000,
            560000, 600000, 580000, 590000, 530000, 560000, 720000,
          ],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        xaxis: {
          categories: [
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
            '2020',
            '2021',
            '2022',
            '2023',
            '2026',
          ],
        },
      },
    };
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height={350}
      />
    );
  }
}
