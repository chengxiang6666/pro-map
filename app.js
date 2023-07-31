// 加载地图数据
d3.json("China.json").then(function (data) {
    var provinces = data.provinces;

    // 创建SVG元素
    var svg = d3.select("#map")
                .append("svg")
                .attr("width", 800)
                .attr("height", 600);

    // 绘制省份边界
    svg.selectAll("path")
        .data(provinces)
        .enter()
        .append("path")
        .attr("d", function (d) { return d.path; })
        .attr("fill", "lightgray")
        .attr("stroke", "black")
        .on("click", function (d) {
            // 显示信息框
            showInfoBox(d.name, d.info);
        });
});

// 显示信息框
function showInfoBox(name, info) {
    var infoBox = d3.select("#infoBox");

    // 更新信息框内容
    infoBox.html("<h3>" + name + "</h3><p>" + info + "</p>");

    // 显示信息框
    infoBox.style("display", "block");
}
