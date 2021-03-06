import * as echarts from '../../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '全员参与率',
    },
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    series: [{
      name: 'stocker',
      type: 'gauge',
      detail: {
        formatter: '{value}%'
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 30,
          shadowBlur: 0,
          color: [
            [0.3, '#67e0e3'],
            [0.8, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      data: [{
        value: 78.3,
        name: '',
      }]

    }]
  };

  chart.setOption(option, true);

  return chart;
}

function initChart2(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '通过率'
    },
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    series: [{
      name: 'stocker',
      type: 'gauge',
      detail: {
        formatter: '{value}%'
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 30,
          shadowBlur: 0,
          color: [
            [0.3, '#67e0e3'],
            [0.8, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      data: [{
        value: 92.5,
        name: '',
      }]

    }]
  };

  chart.setOption(option, true);

  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    },
    ec2:{
      onInit:initChart2
    }
  },

  onReady() {
  }
});
