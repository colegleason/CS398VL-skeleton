var bars = [
    // Bar name         | Percent of my love
    {name:"Murphy's Pub",   love:25},
    {name:"Blind Pig",      love:25},
    {name:"Firehaus",       love:15},
    {name:"Joe's Brewery'", love:5},
    {name:"Legend's",       love:20},
    {name:"Clybourne",      love:5},
    {name:"White Horse",    love:5}
];

var pies = [
    // Pie name         | Percent of my love
    {name:"Pumpkin",   love:20},
    {name:"Blackberry",   love:50},
    {name:"Strawberry",   love:15},
    {name:"Apple",      love:10},
    {name:"Cherry",    love:5}
];


function main() {
    console.log("JS file loaded!");
    favoriteBars("#main", bars);
    favoritePies("#main", pies);
}

function favoriteBars(id, data)
{
        <!-- Magic numvers -->
        var width = 450,
            height = 500,
            radius = Math.min(width, height) / 2;
    <!-- This creates a set of 10 colors to use -->
        var color = d3.scale.category10();
    <!-- Pie Chart setup -->
    var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);
    var pie = d3.layout.pie()
            .value(function(d) { return d.love; });
    <!-- Add a chart SVG element to the DOM -->
    var svg = d3.select(id).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    <!-- This creates arcs for each of the pie slices. -->
    var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

    <!-- Now we fill the arc with a color -->
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return color(i); })
        .attr('title', function(d) { return d.name;});
    <!-- And add labels! -->
    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .style("fill", "white")
        .style("z-index", 100)
        .text(function(d) { return d.data.name; });
}

function favoritePies(id, data) {
        <!-- Magic numbers -->
        var width = 600,
            height = 200;

    var color = d3.scale.category10();
    var svg = d3.select(id)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

    var x = d3.scale.linear() // this maps the
            .domain([0, data.length]) // number of pies to the
            .range([0, width]); // width of chart area

    var maxValue =  d3.max(data, function(d) { return d.love; });
    var y = d3.scale.linear()
            .domain([0, maxValue])
            .range([0, height]);

    var g = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("g");
    g.append("rect")
        .attr("x", function(d, i) { return x(i);})
        .attr("y", function(d) {return height - y(d.love) - 25;})
        .style("fill", function(d, i) { return color(i); })
        .attr("width", width/data.length)
        .attr("height", function(d) { return y(d.love); });

    g.append("text")
        .attr("x", function(d, i) { return x(i) + width / data.length / 4;})
        .attr("y", function(d) {return height - 5;})
        .style("fill", "black")
        .text(function(d) {return d.name; });
}
