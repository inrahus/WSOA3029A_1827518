$(document).ready(function () {
    Plot();
});

function Plot() {
    TransformChartData(chartData, chartOptions);
    bakePie("chart", chartData, chartOptions);
}

function bakePie(id, chartData, options) {
    var xVarName;
    var cutSliceRatio = 2.5;
    var legendoffset = 0;

    chart = d3.select("#" + id + " .innerCont");

    var yVarName = options[0].yaxis;
    width = $(chart[0]).outerWidth(),
        height = $(chart[0]).outerHeight(),
        radius = Math.min(width, height) / cutSliceRatio;

    xVarName = options[0].xaxis;


    var rcolor = d3.scale.ordinal().range(runningColors);

    arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(radius - 200);

    chart = chart
        .append("svg")  //append svg element inside #chart
        .attr("width", width)    //set width
        .attr("height", height)  //set height
        .append("g")
        .attr("transform", "translate(" + (width / cutSliceRatio) + "," + ((height / cutSliceRatio) + 30) + ")");

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.Total;
        });

    var g = chart.selectAll(".arc")
        .data(pie(runningData))
        .enter().append("g")
        .attr("class", "arc")
        .on("mouseenter", function (d) {
            d3.select(this)
                .attr("stroke", "white")
                .attr("stroke-width", 1)
                .attr("height", function (d) {
                    return height - y(d[yVarName]) + 5;
                })
                .attr("y", function (d) {
                    return y(d.Total) + margin.top - 20;
                })
                .attr("width", x.rangeBand() + 10)
                .attr("x", function (d) {
                    return (margin.left - 5);
                })
                .transition()
                .duration(200);


        })
        .on("mouseleave", function (d) {
            d3.select(this)
                .attr("stroke", "none")
                .attr("height", function (d) {
                    return height - y(d[yVarName]);;
                })
                .attr("y", function (d) {
                    return y(d[yVarName]) + margin.top - 15;
                })
                .attr("width", x.rangeBand())
                .attr("x", function (d) {
                    return (margin.left);
                })
                .transition()
                .duration(200);

        })
        ;

    var count = 0;

    var path = g.append("path")
        .attr("d", arc)
        .attr("id", function (d) { return "arc-" + (count++); })
        .style("opacity", function (d) {
            return d.data["op"];
        });

    path.append("svg:title")
        .text(function (d) {
            return d.data["title"] + " (" + d.data[yVarName] + ")";
        });

    path.style("fill", function (d) {
        return rcolor(d.data[xVarName]);
    })

    g.append("text")
        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("opacity", 1)
        .text(function (d) {
            return d.data[yVarName];
        });


    count = 0;
    var legend = chart.selectAll(".legend")
        .data(runningData).enter()
        .append("g").attr("class", "legend")
        .attr("legend-id", function (d) {
            return count++;
        })
        .attr("transform", function (d, i) {
            return "translate(15," + (parseInt("-" + (runningData.length * 10)) + i * 28 + legendoffset) + ")";
        })
        .style("cursor", "pointer")

    var leg = legend.append("rect");

    leg.attr("x", width / 2)
        .attr("width", 35).attr("height", 18)
        .style("fill", function (d) {
            return rcolor(d[yVarName]);
        })
    legend.append("text").attr("x", (width / 2) - 10)
        .attr("y", 9).attr("dy", ".35em")
        .style("text-anchor", "end").text(function (d) {
            return d.caption;
        })
        .style('fill', 'white');

    leg.append("svg:title")
        .text(function (d) {
            return d["title"] + " (" + d[yVarName] + ")";
        });

}

function TransformChartData(chartData, opts) {
    var result = [];
    var myColors = [];
    var counter = 0;
    var doesMatch;
    var xVarName;
    var yVarName = opts[0].yaxis;

    xVarName = opts[0].xaxis;

    for (var i in chartData) {
        doesMatch = false;
        for (var index = 0; index < result.length; ++index) {
            var data = result[index];

            if (data[xVarName] == chartData[i][xVarName]) {
                result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
                doesMatch = true;
                break;
            }
        }
        if (doesMatch == false) {
            ditem = {};
            ditem[xVarName] = chartData[i][xVarName];
            ditem[yVarName] = chartData[i][yVarName];
            ditem["caption"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
            ditem["title"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
            result.push(ditem);

            myColors[counter] = opts[0].color != undefined ? opts[0].color[0][chartData[i][xVarName]] : "";

            counter += 1;
        }
    }

    runningData = result;
    runningColors = myColors;
    return;
}

var chartData = [
    {
        "Month": "March",
        "Cases": "Deaths",
        "Total": 5
    },

    {
        "Month": "March",
        "Cases": "Recovered",
        "Total": 31
    },

    {
        "Month": "March",
        "Cases": "Active",
        "Total": 1317
    },

    {
        "Month": "April",
        "Cases": "Deaths",
        "Total": 183
    },

    {
        "Month": "April",
        "Cases": "Recovered",
        "Total": 2073
    },

    {
        "Month": "April",
        "Cases": "Active",
        "Total": 3471
    },

    {
        "Month": "May",
        "Cases": "Deaths",
        "Total": 683
    },

    {
        "Month": "May",
        "Cases": "Recovered",
        "Total": 16809
    },

    {
        "Month": "May",
        "Cases": "Active",
        "Total": 15191
    },

    {
        "Month": "June",
        "Cases": "Deaths",
        "Total": 2657
    },

    {
        "Month": "June",
        "Cases": "Recovered",
        "Total": 73543
    },

    {
        "Month": "June",
        "Cases": "Active",
        "Total": 75009
    },

    {
        "Month": "July",
        "Cases": "Deaths",
        "Total": 8005
    },

    {
        "Month": "July",
        "Cases": "Recovered",
        "Total": 326171
    },

    {
        "Month": "July",
        "Casess": "Active",
        "Total": 159007
    },

    {
        "Month": "August",
        "Cases": "Deaths",
        "Total": 14149
    },

    {
        "Month": "August",
        "Cases": "Recovered",
        "Total": 540923
    },

    {
        "Month": "August",
        "Cases": "Active",
        "Total": 71696
    },

    {
        "Month": "September",
        "Cases": "Deaths",
        "Total": 16734
    },

    {
        "Month": "September",
        "Cases": "Recovered",
        "Total": 608112
    },

    {
        "Month": "September",
        "Cases": "Active",
        "Total": 49493
    },

    {
        "Month": "October",
        "Cases": "Deaths",
        "Total": 19276
    },

    {
        "Month": "October",
        "Cases": "Recovered",
        "Total": 654182
    },

    {
        "Month": "October",
        "Cases": "Active",
        "Total": 51994
    },

    {
        "Month": "November",
        "Cases": "Deaths",
        "Total": 20968
    },

    {
        "Month": "November",
        "Cases": "Recovered",
        "Total": 711195
    },

    {
        "Month": "November",
        "Cases": "Active",
        "Total": 37596
    }

];


chartOptions = [
    {
        "captions":
            [{
                "March": "Mar",
                "April": "Apr",
                "May": "May",
                "June": "Jun",
                "July": "Jul",
                "August": "Aug",
                "September": "Sep",
                "October": "Oct",
                "November": "Nov"
            }],

        color:
            [
                {
                    "March": "#22B9C4",
                    "April": "#22C45C",
                    "May": "#B7C422",
                    "June": "#C48C22",
                    "July": "#C44922",
                    "August": "#203A43",
                    "September": "#AE0500",
                    "October": "#E1177C",
                    "November": "#A70BA4"
                }
            ],

        "xaxis": "Month",

        "yaxis": "Total"
    }]
