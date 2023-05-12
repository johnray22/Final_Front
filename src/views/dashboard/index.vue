<template>
    <div class="map-container">
      <div id="map-app">

      </div>
    </div>
</template>
<script>
import {TMap} from "@/utils/initMap";
import {getLatestInfos} from "@/api/dashboard";
export default {
  name: 'App',
  components: {

  },
  data() {
    return{
      markerArr:[],
      qq:'',
      tMap:'',
      mapMode: 'roadmap',
      records:[],
      markers:[]
    }
  },
  mounted() {
    this.createMap()
    // 定时器每 10 秒运行一次
    setInterval(() => {
      this.refreshMarkers();
    }, 10000);
  },
  methods:{
    // 用于获取新的数据并更新标记
    async refreshMarkers() {
      // 获取新的数据
      await this.getData();

      // 删除现有的标记
      this.markers.forEach(marker => {
        marker.setMap(null);
      });

      // 清空 markers 数组
      this.markers = [];

      // 添加新的标记
      this.drawPoints();
    },
    async createMap(){
      await this.getData()
      await this.TencentMap()
    },
    async getData(){
      const res = await getLatestInfos()
      console.log('res',res)
      this.records=res.body
    },
    async drawPoints(){
      // 遍历 body 数组
      this.records.forEach((point) => {
        const { longti, lati } = point;
        this.addMarker({ longitude: longti, latitude: lati }, point);
      });
    },

    getCenter(points) {
      let latitudeSum = 0;
      let longitudeSum = 0;

      points.forEach(point => {
        latitudeSum += parseFloat(point.lati);
        longitudeSum += parseFloat(point.longti);
      });

      return {
        latitude: latitudeSum / points.length,
        longitude: longitudeSum / points.length,
      };
    },
    addMarker(point, data) {
      console.log('marker1', point)
      const { longitude, latitude } = point;
      const markerPosition = new this.qq.maps.LatLng( longitude,latitude);
      // 根据 temperature 设置颜色
      let color;
      const temperature = parseInt(data.temperature);
      if (temperature < 10) {
        color = 'blue';
      } else if (temperature < 20) {
        color = 'green';
      } else {
        color = 'red';
      }

      // 创建标记
      const marker = new this.qq.maps.Marker({
        position: markerPosition,
        map: this.tMap,
        icon: {
          path: this.qq.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: color,
          fillOpacity: 0.8,
          strokeWeight: 0.4
        }
      });

      // 添加到 markers 数组
      this.markers.push(marker);

      // 创建一个信息窗口
      const info = new this.qq.maps.InfoWindow({
        map: this.tMap
      });

      // 设置窗口的内容，这里可以自定义
      info.setContent(`
    <div style="width:200px;padding:10px;">
      <h4>Device Details</h4>
      <p>Temperature: ${data.temperature}</p>
      <p>Humidity: ${data.humidy}</p>
      <p>Longitude: ${data.longti}</p>
      <p>Latitude: ${data.lati}</p>
    </div>
  `);

      // 添加鼠标悬停事件
      this.qq.maps.event.addListener(marker, 'mouseover', function() {
        info.open();
        info.setPosition(markerPosition);
      });

      // 添加鼠标移出事件
      this.qq.maps.event.addListener(marker, 'mouseout', function() {
        info.close();
      });
    },

    async TencentMap() {
      let _this = this;
      const { latitude, longitude } = this.getCenter(this.records)
      TMap("DZYBZ-RWRHI-MPHG2-UBLYL-2STB2-AOBSN").then((qq) => {
        _this.qq=qq
        //debugger
        const myLatlng = new qq.maps.LatLng(longitude, latitude);
        console.log('lat1',latitude)
        _this.tMap = new qq.maps.Map(document.getElementById("map-app"), {
          center: myLatlng,
          zoom: 13,
          mapTypeId: qq.maps.MapTypeId.ROADMAP,
          draggableCursor : 'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/c1.cur',     //设置鼠标拖拽元素样式
          draggingCursor : 'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/c2.cur'       //设置鼠标移动样式
        });

        _this.drawPoints()
      });
    },
  }
};
</script>

<style>
.map-container{
  width: 100%;
  height: 100%;
  position: relative;
}
#map-app {
  position: relative;
  height: 100vh;
  width: 100%;
}
.map-toggle-container {
  z-index: 99;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.map-toggle {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}
.map-toggle-button {
  background-color: #f5f5f5;
  color: #333;
  border: none;
  font-size: 14px;
  padding: 8px 16px;
}
.map-toggle-button:hover {
  background-color: #e0e0e0;
}
.map-toggle-button-active {
  background-color: #fff;
}
</style>
