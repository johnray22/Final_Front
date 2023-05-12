// export default {
//   init(){
//     const AK = "DZYBZ-RWRHI-MPHG2-UBLYL-2STB2-AOBSN";
//     const TMap_URL = "https://map.qq.com/api/js?v=2.exp&key="+ AK +"&libraries=convertor,visualization";
//     return new Promise((resolve, reject) => {
//       // 如果已加载直接返回
//       if(typeof TMap !== null) {
//         console.log("Tmap inited")
//         resolve(TMap);
//         return true;
//       }
//       // 地图异步加载回调处理
//       window.onMapCallback = function () {
//         resolve(TMap);
//       };
//
//       console.log('insert')
//       // 插入script脚本
//       let scriptNode = document.createElement("script");
//       scriptNode.setAttribute("type", "text/javascript");
//       scriptNode.setAttribute("src", TMap_URL);
//       document.body.appendChild(scriptNode);
//     });
//   }
// }

export function TMap (key) {
  return new Promise(function (resolve, reject) {
    window.init = function () {
      resolve(window.qq)// 注意这里
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://map.qq.com/api/js?v=2.exp&callback=init&key='+key+'&libraries=convertor,visualization';
    script.onerror = reject
    document.head.appendChild(script)
  })
}
