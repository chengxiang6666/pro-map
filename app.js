// 创建地图容器
var map = L.map('map').setView([34.5, 105], 4);

// 添加地图瓦片图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// 使用GeoJSON数据加载中国34个省边界
fetch('China.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // 过滤出中国34个省边界数据
        var chinaProvinces = data.features.filter(function(feature) {
            return feature.properties.level === 'province' && feature.properties.name !== '台湾省'; // 排除台湾省
        });

        // 创建GeoJSON图层并添加到地图上
        var provincesLayer = L.geoJSON(chinaProvinces).addTo(map);

        // 调整地图视图以适应中国34个省的边界
        map.fitBounds(provincesLayer.getBounds());
    });
