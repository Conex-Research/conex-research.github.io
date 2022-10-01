<!DOCTYPE html>
<html lang="en">

<head>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <meta charset="utf-8">
    <title>Getting started with map visualization</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
    <style type="text/css">
        body {
            margin: 0;
            background-color: whitesmoke;
            font-family: 'Times New Roman', sans-serif;
            font-weight: 300;
        }

        #svgcontainer {
            width: 1000px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 50px;
            padding: 5px 50px 10px 50px;
            background-color: whitesmoke;
        }

        h1 {
            font-weight: 800;
            color: #5a7388;
            font-size: 48px;
            margin-bottom: 10px;
        }

        p {
            font-size: 16px;
            margin: 15px 0 10px 0;
        }

        svg {
            background-color: whitesmoke;
        }
    </style>
</head>

<body>
    <div id="svgcontainer">
        <h1>Getting started with map visualization</h1>
        <p>In this post we will create a basic map visualization in D3js for beginner.</p>
        <div id="svganchor"></div>
        <br>
    </div>
    <script type="text/javascript">

        //Width and height
        let w = 1000;
        let h = 800;

        //Define map projection
        let projection = d3.geo.mercator()
            .center([132, -28])
            .translate([w / 2, h / 2])
            .scale(1000);


        //Define path generator
        let path = d3.geo.path()
            .projection(projection);

        let color = d3.scale.ordinal()
            .range(['Azure']);

        //Create SVG
        let svg = d3.select("#svganchor")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        //Load in GeoJSON data
        d3.json("aust.json", (json) => {


            //Binding data and creating one path per GeoJSON feature
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("stroke", "dimgray")
                .attr("fill", (d, i) => { return color(i) });

            //States
            svg.selectAll("text")
                .data(json.features)
                .enter()
                .append("text")
                .attr("fill", "darkslategray")
                .attr("transform", (d) => { return "translate(" + path.centroid(d) + ")"; })
                .attr("text-anchor", "middle")
                .attr("dy", ".35em")
                .text((d) => {
                    return d.properties.STATE_NAME;
                });

            //Append the name
            svg.append("text")
                .attr("x", 0)
                .attr("y", 340)
                .attr("font-size", 90)
                .attr("font-weight", "bold")
                .attr("font-family", "Times New Roman")
                .attr("text-anchor", "middle")
                .attr("opacity", 0.5)

        });

    </script>
</body>

</html>