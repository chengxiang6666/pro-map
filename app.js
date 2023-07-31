// 创建地图容器
var map = L.map('map').setView([34.5, 105], 4);

// 添加地图瓦片图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// 绘制中国省级地图
var geojsonLayer = L.geoJSON(chinaData, {
    style: function (feature) {
        return {
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7,
            fillColor: getRandomColor()
        };
    },
    onEachFeature: function (feature, layer) {
        layer.on('click', function (e) {
            showInfoBox(e.target);
        });
    }
}).addTo(map);

// 生成随机颜色
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 显示信息框
function showInfoBox(layer) {
    var province = layer.feature.properties.name;
    var info = "这是" + province + "省";
    alert(info);
}
// JavaScript Document