
var salesData;
var truncLengh = 30;
$(document).ready(function () {
    Plot();
});
function Plot() {
    TransformChartData(chartData, chartOptions);
    BuildBar("chart", chartData, chartOptions);
}

function BuildBar(id, chartData, options, level) {
    //d3.selectAll("#" + id + " .innerCont").remove();
    //$("#" + id).append(chartInnerDiv);
    chart = d3.select("#" + id + " .innerCont");

    var margin = { top: 50, right: 10, bottom: 100, left: 100 },
        width = $(chart[0]).outerWidth() - margin.left - margin.right,
        height = $(chart[0]).outerHeight() - margin.top - margin.bottom
    var xVarName;
    var yVarName = options[0].yaxis;

    if (level == 1) {
        xVarName = options[0].xaxisl1;
    }
    else {
        xVarName = options[0].xaxis;
    }

    var xAry = runningData.map(function (el) {
        return el[xVarName];
    });

    var yAry = runningData.map(function (el) {
        return el[yVarName];
    });

    var capAry = runningData.map(function (el) { return el.caption; });


    var x = d3.scale.ordinal().domain(xAry).rangeRoundBands([0, width], .5);
    var y = d3.scale.linear().domain([0, d3.max(runningData, function (d) { return d[yVarName]; })]).range([height, 0]);
    var rcolor = d3.scale.ordinal().range(runningColors);

    chart = chart
        //SVG in chart
        .append("svg")
        //Width set
        .attr("width", width + margin.left + margin.right)
        //Height set
        .attr("height", height + margin.top + margin.bottom);

    var bar = chart.selectAll("g")
        .data(runningData)
        .enter()
        .append("g")
        .attr("transform", function (d) {
            return "translate(" + x(d[xVarName]) + ", 0)";
        });

    var ctrtxt = 0;
    var xAxis = d3.svg.axis()
        .scale(x)
        //.orient("bottom").ticks(xAry.length).tickValues(capAry);  //orient bottom because x-axis tick labels will appear on the
        .orient("bottom").ticks(xAry.length)
        .tickFormat(function (d) {
            if (level == 0) {
                var mapper = options[0].captions[0]
                return mapper[d]
            }
            else {
                var r = runningData[ctrtxt].caption;
                ctrtxt += 1;
                return r;
            }
        });

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left").ticks(10); //orient left because y-axis tick labels will appear on the left side of the axis.

    bar.append("rect")
        .attr("y", function (d) {
            return y(d.Total) + margin.top - 15;
        })
        .attr("x", function (d) {
            return (margin.left);
        })
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

            d3.select(this).style("cursor", "pointer");


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


            d3.select(this).style("cursor", "default");

        })
        .on("click", function (d) {
            if (this._listenToEvents) {
                // Immediate
                d3.select(this).attr("transform", "translate(0,0)")
                // Change on click if no event              
                path.each(function () {
                    this._listenToEvents = false;
                });
            }
            d3.selectAll("#" + id + " svg").remove();
            if (level == 1) {
                TransformChartData(chartData, options, 0, d[xVarName]);
                BuildBar(id, chartData, options, 0);
            }
            else {
                var nonSortedChart = chartData.sort(function (a, b) {
                    return parseFloat(b[options[0].yaxis]) - parseFloat(a[options[0].yaxis]);
                });
                TransformChartData(nonSortedChart, options, 1, d[xVarName]);
                BuildBar(id, nonSortedChart, options, 1);
            }

        });


    bar.selectAll("rect").attr("height", function (d) {
        return height - y(d[yVarName]);
    })
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000)
        //Width based on data- but how to manual??
        .attr("width", x.rangeBand())
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000);

    bar.selectAll("rect").style("fill", function (d) {
        return rcolor(d[xVarName]);
    })
        .style("opacity", function (d) {
            return d["op"];
        });

    bar.append("text")
        .attr("x", x.rangeBand() / 2 + margin.left - 10)
        .attr("y", function (d) { return y(d[yVarName]) + margin.top - 25; })
        .attr("dy", ".35em")
        .text(function (d) {
            return d[yVarName];
        });

    bar.append("svg:title")
        .text(function (d) {
            //return xVarName + ":  " + d["title"] + " \x0A" + yVarName + ":  " + d[yVarName];
            return d["title"] + " (" + d[yVarName] + ")";
        });

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top - 15) + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")

    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + (margin.top - 15) + ")")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    if (level == 1) {
        chart.select(".x.axis")
            .selectAll("text")
            .attr("transform", " translate(-20,10) rotate(-35)");
    }

}

function TransformChartData(chartData, opts, level, filter) {
    var result = [];
    var resultColors = [];
    var counter = 0;
    var hasMatch;
    var xVarName;
    var yVarName = opts[0].yaxis;

    if (level == 1) {
        xVarName = opts[0].xaxisl1;

        for (var i in chartData) {
            hasMatch = false;
            for (var index = 0; index < result.length; ++index) {
                var data = result[index];

                if ((data[xVarName] == chartData[i][xVarName]) && (chartData[i][opts[0].xaxis]) == filter) {
                    result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
                    hasMatch = true;
                    break;
                }

            }
            if ((hasMatch == false) && ((chartData[i][opts[0].xaxis]) == filter)) {
                if (result.length < 9) {
                    ditem = {}
                    ditem[xVarName] = chartData[i][xVarName];
                    ditem[yVarName] = chartData[i][yVarName];
                    ditem["caption"] = chartData[i][xVarName].substring(0, 10) + '...';
                    ditem["title"] = chartData[i][xVarName];
                    ditem["op"] = 1.0 - parseFloat("0." + (result.length));
                    result.push(ditem);

                    resultColors[counter] = opts[0].color[0][chartData[i][opts[0].xaxis]];

                    counter += 1;
                }
            }
        }
    }
    else {
        xVarName = opts[0].xaxis;

        for (var i in chartData) {
            hasMatch = false;
            for (var index = 0; index < result.length; ++index) {
                var data = result[index];

                if (data[xVarName] == chartData[i][xVarName]) {
                    result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
                    hasMatch = true;
                    break;
                }
            }
            if (hasMatch == false) {
                ditem = {};
                ditem[xVarName] = chartData[i][xVarName];
                ditem[yVarName] = chartData[i][yVarName];
                ditem["caption"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
                ditem["title"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
                ditem["op"] = 1;
                result.push(ditem);

                resultColors[counter] = opts[0].color != undefined ? opts[0].color[0][chartData[i][xVarName]] : "";

                counter += 1;
            }
        }
    }


    runningData = result;
    runningColors = resultColors;
    return;
}


var chartData = [
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
                    "July": "#E47224",
                    "August": "#C44922",
                    "September": "#AE0500",
                    "October": "#DB0A04",
                    "November": "#FF0700"
                }
            ],

        "xaxis": "Month",
        "xaxisl1": "Cases",
        "yaxis": "Total"
    }]
