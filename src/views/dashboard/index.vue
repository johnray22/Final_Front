<script src="../../api/user.js"></script>
<template>
  <div class="dashboard-container">
    <div id="map" style="height: 1024px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import dataJson from "../../assets/mapdata.json";
export default {
  name: 'Dashboard',

  data() {
    return {
      entity:'',
      dataList:[
        {name: '北京',value: this.randomData() },
        {name: '天津',value: this.randomData() },
        {name: '上海',value: this.randomData() },
        {name: '重庆',value: this.randomData() },
        {name: '河北',value: this.randomData() },
        {name: '河南',value: this.randomData() },
        {name: '云南',value: this.randomData() },
        {name: '辽宁',value: this.randomData() },
        {name: '黑龙江',value: this.randomData() },
        {name: '湖南',value: this.randomData() },
        {name: '安徽',value: this.randomData() },
        {name: '山东',value: this.randomData() },
        {name: '新疆',value: 0 },
        {name: '江苏',value: this.randomData() },
        {name: '浙江',value: this.randomData() },
        {name: '江西',value: this.randomData() },
        {name: '湖北',value: this.randomData() },
        {name: '广西',value: this.randomData() },
        {name: '甘肃',value: this.randomData() },
        {name: '山西',value: this.randomData() },
        {name: '内蒙古',value: this.randomData() },
        {name: '陕西',value: this.randomData() },
        {name: '吉林',value: this.randomData() },
        {name: '福建',value: this.randomData() },
        {name: '贵州',value: this.randomData() },
        {name: '广东',value: this.randomData() },
        {name: '青海',value: this.randomData() },
        {name: '西藏',value: this.randomData() },
        {name: '四川',value: this.randomData() },
        {name: '宁夏',value: this.randomData() },
        {name: '海南',value: this.randomData() },
        {name: '台湾',value: this.randomData() },
        {name: '香港',value: this.randomData() },
        {name: '澳门',value: this.randomData() }
      ]

    }
  },
  computed: {

  },
  created() {
    console.log(echarts);

  },
  mounted() {
    console.log(echarts);
    this.drawMap()
  },
  methods:{
    randomData() {
      return Math.round(Math.random()*500);
    },
    drawMap(){
      let longti = 106.52669833333333;
      let lati = 29.594877333333333;

      this.entity=echarts.init(document.getElementById('map'), '');
      let uploadDataUrl = dataJson;
      // 注册地图
      echarts.registerMap("china", uploadDataUrl);
      this.entity.setOption({
        title: {
          text: '地图分布',
          x: 'center',
          textStyle: {
            color: '#fff',
            fontSize:"40"
          }
        },
        tooltip: {
          show: true, // 是否显示
          trigger: 'axis', // 触发类型  'item'图形触发：散点图，饼图等无类目轴的图表中使用； 'axis'坐标轴触发；'none'：什么都不触发。
          axisPointer: { // 坐标轴指示器配置项。
            type: 'shadow', // 'line' 直线指示器  'shadow' 阴影指示器  'none' 无指示器  'cross' 十字准星指示器。
            axis: 'auto', // 指示器的坐标轴。
            snap: true, // 坐标轴指示器是否自动吸附到点上
          },
          showContent: true, //是否显示提示框浮层，默认显示。
          triggerOn: 'mouseover', // 触发时机  'mouseover'鼠标移动时触发。     'click'鼠标点击时触发。  'mousemove|click'同时鼠标移动和点击时触发。
          enterable: false, // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
          renderMode: 'html', // 浮层的渲染模式，默认以 'html 即额外的 DOM 节点展示 tooltip；
          backgroundColor: 'rgba(50,50,50,0.7)', // 提示框浮层的背景颜色。
          borderColor: '#333', // 提示框浮层的边框颜色。
          borderWidth: 0, // 提示框浮层的边框宽。
          padding: 5, // 提示框浮层内边距，
          textStyle: { // 提示框浮层的文本样式。
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontSize: 14,
          },
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);', // 额外附加到浮层的 css 样式
          confine: false, // 是否将 tooltip 框限制在图表的区域内。
          formatter: function(arg){
            return arg[0].name + '的分数是:' + arg[0].data
          }
        },
        geo: {
          map: 'china',//必须写
          roam:true,// 拖拽功能；自选关闭开启
          zoom: 1.235,//地图缩放比例
          center: [105, 36],//地图位置
          //地图省份的样式；包括板块颜色和边框颜色
          itemStyle: {
            areaColor: '#f5f2f2',
            borderColor: "#835f5f",
          },
          //省份字体样式；包括是否展示，字体大小和颜色
          // label: {
          //   normal: {
          //     show:true,
          //     fontSize: "11.5",
          //     color: "rgb(107,102,102)"
          //   }
          // },
          //鼠标划过的高亮设置；包括省份板块颜色和字体等
          // emphasis: {
          //   itemStyle: {
          //     areaColor: '#d0a3a3',
          //   },
          //   label: {
          //     show: true,
          //     color:"rgb(255,255,255)"
          //   }
          // }
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: '10%',
          top: 'bottom',
          text: ['高','低'],
          calculable : true,
          color:['#0b50b9','#FFFFFF']
        },
        series: [
          {
            zoom: 1.1,
            map: "china",
            type: "map",
            itemStyle: {
              normal:{
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis:{
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: [{
                name: '设备坐标',
                value: [longti, lati]
              }],
          }
        ],
        //
        // series: [{
        //   type: 'map',
        //   map: 'china'
        // }, {
        //   type: 'scatter',
        //   coordinateSystem: 'geo',
        //   data: [{
        //     name: '设备坐标',
        //     value: [longti, lati]
        //   }],
        //   symbolSize: 10,
        //   itemStyle: {
        //     color: '#FF0000'
        //   }
        // }]

      })
      window.onresize=function(){
        this.entity.resize();
      }

    }
  }
}
</script>
