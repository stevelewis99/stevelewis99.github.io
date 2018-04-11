var chartData = [];
var chartOptions = {
  chart: {
    type: 'spline',
    height: '300px'
  },
  title: {
    text: null
  },
  subtitle: {
    text: '..'
  },
  legend: {
    enabled: false
  },
  tooltip: {
    enabled: true,
    formatter: function() {
      return '<b>' + this.series.name + '</b><br/>' +
        Highcharts.dateFormat('%d %B %Y', this.x * 1000) + ': ' + this.y;

    }
  },
  xAxis: {
    title: {
      text: 'Date',
      scalable: false
    },
    type: 'datetime',
    labels: {
      formatter: function() {
        return Highcharts.dateFormat('%e %b', this.value * 1000); // milliseconds not seconds
      },
    }
  }
};