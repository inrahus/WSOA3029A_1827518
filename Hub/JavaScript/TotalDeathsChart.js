
var width = 1000,
    height = 600;

var colors = d3.scaleOrdinal(d3.schemeTableau10);

var svg = d3.select("#my_viz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "black");

var details = [
    { status: "Deaths: 5", number: 5 },
    { status: "Recovered Cases: 31", number: 31 },
    { status: "Active Cases: 1317", number: 1317 }
]

var data = d3.pie().sort(null).value(function (d) { return d.number; })(details);
console.log(data);

var slices = d3.arc()
    .innerRadius(0)
    .outerRadius(225)
    .padAngle(0.0)
    .padRadius(50);

var toppings = svg.append("g").attr("transform", "translate(300, 300)")
    .selectAll("path").data(data);

toppings.enter().append("path").attr("d", slices)
    .attr("fill", function (d) {
        return colors(d.data.number);
    });

var legends = svg
    .append("g")
    .attr("transform", "translate(650, 175)")
    .selectAll(".legends").data(data);

var legend = legends.enter()
    .append("g")
    .classed("legends", true)
    .attr("transform", function (d, i) {
        return "translate(0," + (i + 1) * 50 + ")";
    });

legend
    .append("rect")
    .attr("width", 30)
    .attr("height", 30)
    .attr("fill", function (d) {
        return colors(d.data.number);
    });

legend.append("text")
    .text(function (d) { return d.data.status; })
    .attr("fill", function (d) { return colors(d.data.number); })
    .attr("x", 40)
    .attr("y", 25)
    .attr("font-size", 30);
