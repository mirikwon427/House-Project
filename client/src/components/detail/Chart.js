import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

export default class Chart extends Component {
  constructor(props) {
    super(props);

    let date = Object.keys(props.pastPrices);
    date.push('2027');
    let prices = Object.values(props.pastPrices);
    prices.push(props.predicted);

    this.state = {
      series: [
        {
          name: '가격',
          data: prices,
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
          categories: date,
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
