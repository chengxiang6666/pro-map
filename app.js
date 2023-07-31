// 创建地图容器
var map = L.map('map').setView([34.5, 105], 4);

// 添加地图瓦片图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// 使用ArcGIS的地图服务URL
var serviceUrl = 'https://services.arcgisonline.com/arcgis/rest/services/ChinaBoundary/MapServer';

// 加载地图数据
L.esri.dynamicMapLayer({
    url: serviceUrl,
    opacity: 0.7
}).addTo(map);

// 创建Popup对象
var popup = L.popup();

// 点击事件处理函数
function onMapClick(e) {
    // 获取点击位置的地理坐标
    var latlng = e.latlng;

    // 查询点击位置的要素信息
    L.esri.query({
        url: serviceUrl + '/0' // 要素服务URL，根据实际情况修改
    }).nearby(latlng, 10).run(function(error, featureCollection) {
        if (error) return;

        // 如果找到了要素
        if (featureCollection.features.length > 0) {
            var feature = featureCollection.features[0];

            // 获取要素属性信息
            var attributes = feature.properties;

            // 组装要素信息文本
            var info = "这是" + attributes.NAME + "省";

            // 设置弹出窗口内容
            popup.setLatLng(latlng)
                .setContent(info)
                .openOn(map);
        }
    });
}

// 监听地图点击事件
map.on('click', onMapClick);
