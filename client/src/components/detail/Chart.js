import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

export default class Chart extends Component {
  constructor(props) {
    super(props);

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    let date = Object.keys(props.pastPrices);
    date.push(`${year}-${month}-${day}`);
    date.push('2027');
    let prices = Object.values(props.pastPrices);
    prices.push(props.currentPrice);
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
