function resolve(str) {
  switch(str){
    case 'OIC': return 'OIC是工厂MES系统的客户端，您可以在OIC进行生产管理操作'
    break;
    case 'OIC下载': return 'OIC下载地址是 http://10.120.230.21:8090 '
      break;
    case 'MES': return '制造执行系统 (manufacturing execution system， 简称MES)是美国AMR公司(Advanced Manufacturing Research，Inc．)制造执行系统MES能够帮助企业实现生产计划管理、生产过程控制、产品质量管理、车间库存管理、项目看板管理等，提高企业制造执行能力。'
      break;
    case 'Web平台': return 'Web平台是BOE数据透明平台，Web平台将大量数据进行处理和分析，可视化的展示在Web页面，您可以通过10.120.8.71来访问它。'
      break;
    default: return '这个答案我还不知道，CIM工程师会不断拓展我的知识库，让我们一起学习进步吧'
    break;
  }
  return '功能开发中！'
}

module.exports ={
  resolve: resolve,
}