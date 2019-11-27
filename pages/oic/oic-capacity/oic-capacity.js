import * as echarts from '../../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['达成率', '计划', '实绩']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        name:'投入产出(K)',
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      },
      {
        name: '达成率(%)',
        type: 'value',
      }
      
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['Array/I', 'Array/O', 'CF/I', 'CF/O', 'CELL/I', 'CELL/O'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '达成率',
        type: 'line',
        xAxisIndex: 1,
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [118.67, 100.68, 100.84, 101.75, 96.45, 95.58],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '计划',
        type: 'bar',
        // stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [37828, 46729, 45720, 45491, 47761, 45583.25],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        name: '实绩',
        type: 'bar',
        // stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [44892, 47049, 46103, 46289, 46065, 43569.84],
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
});
