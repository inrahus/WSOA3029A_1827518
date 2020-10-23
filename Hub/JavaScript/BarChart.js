const data = [
    { month: 'Feb', number: 0 },
    { month: 'Mar', number: 1317 },
    { month: 'Apr', number: 2154 },
    { month: 'May', number: 11720 },
    { month: 'Jun', number: 59818 },
    { month: 'Jul', number: 83998 }
]

const width = 1500;
const height = 700;
const margin = { top: 50, bottom: 50, left: 250, right: 50 }

const svg = d3.select('#my_viz')
    .append('svg')
    .attr('height', height - margin.top - margin.bottom)
    .attr('width', width - margin.left - margin.right)
    .attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])

const y = d3.scaleLinear()
    .domain([0, 90000])
    .range([height - margin.bottom, margin.top]);

svg
    .append("g")
    .attr("fill", 'royalblue')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.ascending(a.number
        , b.number
    )))
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.number
    ))
    .attr('title', (d) => d.number
    )
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.number
    ))
    .attr("width", x.bandwidth());


function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr("font-size", '20px')
        .attr("color", "white");
}
function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i].month))
        .attr("font-size", '20px')
        .attr("color", "white");
}
svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
svg.node();
