

function createPieChart(bar) {
    var svg = d3.select("#svg" + bar._id)
        .append("svg")
        .append("g")

    svg.append("g")
        .attr("class", "slices");
    svg.append("g")
        .attr("class", "labels");
    svg.append("g")
        .attr("class", "lines");

    var width = 960,
        height = 450,
        radius = Math.min(width, height) / 2;

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.value;
        });

    var arc = d3.svg.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.4);

    var outerArc = d3.svg.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var key = function (d) { return d.data.label; };

    var color = d3.scale.ordinal()
        .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    function randomData() {
        var labels = color.domain();
        return labels.map(function (label) {
            return { label: label, value: Math.random() }
        });
    }

    change(randomData());

    d3.select(".randomize")
        .on("click", function () {
            change(randomData());
        });


    function change(data) {

        /* ------- PIE SLICES -------*/
        var slice = svg.select(".slices").selectAll("path.slice")
            .data(pie(data), key);

        slice.enter()
            .insert("path")
            .style("fill", function (d) { return color(d.data.label); })
            .attr("class", "slice");

        slice
            .transition().duration(1000)
            .attrTween("d", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    return arc(interpolate(t));
                };
            })

        slice.exit()
            .remove();

        /* ------- TEXT LABELS -------*/

        var text = svg.select(".labels").selectAll("text")
            .data(pie(data), key);

        text.enter()
            .append("text")
            .attr("dy", ".35em")
            .text(function (d) {
                return d.data.label;
            });

        function midAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        text.transition().duration(1000)
            .attrTween("transform", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                    return "translate(" + pos + ")";
                };
            })
            .styleTween("text-anchor", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    var d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start" : "end";
                };
            });

        text.exit()
            .remove();

        /* ------- SLICE TO TEXT POLYLINES -------*/

        var polyline = svg.select(".lines").selectAll("polyline")
            .data(pie(data), key);

        polyline.enter()
            .append("polyline");

        polyline.transition().duration(1000)
            .attrTween("points", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * 0.2 * (midAngle(d2) < Math.PI ? 1 : -1);
                    return [arc.centroid(d2), outerArc.centroid(d2), pos];
                };
            });

        polyline.exit()
            .remove();
    };
}


function d3PieChart(bar) {
    let id = "svg" + bar._id;
    var pie = new d3pie(id, {
        "header": {
            "title": {
                "text": "Lots of Programming Languages",
                "fontSize": 24,
                "font": "open sans"
            },
            "subtitle": {
                "text": "A full pie chart to show off label collision detection and resolution.",
                "color": "#999999",
                "fontSize": 12,
                "font": "open sans"
            },
            "titleSubtitlePadding": 9
        },
        "footer": {
            "color": "#999999",
            "fontSize": 10,
            "font": "open sans",
            "location": "bottom-left"
        },
        "size": {
            "canvasWidth": 590,
            "pieOuterRadius": "90%"
        },
        "data": {
            "sortOrder": "value-desc",
            "content": [
                {
                    "label": "JavaScript",
                    "value": 264131,
                    "color": "#2484c1"
                },
                {
                    "label": "Ruby",
                    "value": 218812,
                    "color": "#0c6197"
                },
                {
                    "label": "Java",
                    "value": 157618,
                    "color": "#4daa4b"
                },
                {
                    "label": "PHP",
                    "value": 114384,
                    "color": "#90c469"
                },
                {
                    "label": "Python",
                    "value": 95002,
                    "color": "#daca61"
                },
                {
                    "label": "C+",
                    "value": 78327,
                    "color": "#e4a14b"
                },
                {
                    "label": "C",
                    "value": 67706,
                    "color": "#e98125"
                },
                {
                    "label": "Objective-C",
                    "value": 36344,
                    "color": "#cb2121"
                },
                {
                    "label": "Shell",
                    "value": 28561,
                    "color": "#830909"
                },
                {
                    "label": "Cobol",
                    "value": 24131,
                    "color": "#923e99"
                },
                {
                    "label": "C#",
                    "value": 100,
                    "color": "#ae83d5"
                },
                {
                    "label": "Coldfusion",
                    "value": 68,
                    "color": "#bf273e"
                },
                {
                    "label": "Fortran",
                    "value": 218812,
                    "color": "#ce2aeb"
                },
                {
                    "label": "Coffeescript",
                    "value": 157618,
                    "color": "#bca44a"
                },
                {
                    "label": "Node",
                    "value": 114384,
                    "color": "#618d1b"
                },
                {
                    "label": "Basic",
                    "value": 95002,
                    "color": "#1ee67b"
                },
                {
                    "label": "Cola",
                    "value": 36344,
                    "color": "#b0ec44"
                },
                {
                    "label": "Perl",
                    "value": 32170,
                    "color": "#a4a0c9"
                },
                {
                    "label": "Dart",
                    "value": 28561,
                    "color": "#322849"
                },
                {
                    "label": "Go",
                    "value": 264131,
                    "color": "#86f71a"
                },
                {
                    "label": "Groovy",
                    "value": 218812,
                    "color": "#d1c87f"
                },
                {
                    "label": "Processing",
                    "value": 157618,
                    "color": "#7d9058"
                },
                {
                    "label": "Smalltalk",
                    "value": 114384,
                    "color": "#44b9b0"
                },
                {
                    "label": "Scala",
                    "value": 95002,
                    "color": "#7c37c0"
                },
                {
                    "label": "Visual Basic",
                    "value": 78327,
                    "color": "#cc9fb1"
                },
                {
                    "label": "Scheme",
                    "value": 67706,
                    "color": "#e65414"
                },
                {
                    "label": "Rust",
                    "value": 36344,
                    "color": "#8b6834"
                },
                {
                    "label": "FoxPro",
                    "value": 32170,
                    "color": "#248838"
                }
            ]
        },
        "labels": {
            "outer": {
                "pieDistance": 32
            },
            "inner": {
                "hideWhenLessThanPercentage": 3
            },
            "mainLabel": {
                "fontSize": 11
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#adadad",
                "fontSize": 11
            },
            "lines": {
                "enabled": true
            },
            "truncation": {
                "enabled": true
            }
        },
        "effects": {
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 400,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": true,
                "percentage": 100
            }
        }
    });
}


function testPie(bar, chartId = '', secondaryData = [],fullscreen = false) {
    //     const heightValue = 600;
    // const widthValue = 500;
    if (document.getElementById('drawSvg' + bar._id))
        document.getElementById('drawSvg' + bar._id).remove()
    let chartsId = chartId ? chartId : 'bar-chart-' + bar._id;
    if (!document.getElementById('bar-chart-' + bar._id))
        chartsId = 'svg' + bar._id

    let heightValue = document.getElementById(chartsId) && document.getElementById(chartsId).parentElement.clientHeight > 160 ? document.getElementById(chartsId).parentElement.clientHeight : 300;
    let widthValue = document.getElementById(chartsId) && document.getElementById(chartsId).parentElement.clientWidth;
    console.log("bar", bar)
    var width = 350
    height = 350
    margin = 40;
    
    if(fullscreen){
        heightValue = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); //fullscreen view port height is taken
        widthValue  = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); ////fullscreen view port width is taken
    }

    let radWidth = widthValue < heightValue? widthValue : heightValue + 70;
    let radHeight = heightValue > 330 ? (widthValue < heightValue? widthValue : heightValue ) : heightValue + 70;
    let viewHeight = heightValue > 330 ? heightValue + 70 : heightValue;
    let viewWidth = heightValue > 330 ? widthValue + 70 : widthValue;
    let originx = heightValue > 330 ? -30 : 0;
    
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(radWidth, radHeight) / 2 - margin
    // append the svg object to the div called 'my_dataviz'
    let svgId = chartId ? chartId : "svg" + bar._id;
    var svg = d3.select("#" + svgId)
        .append("svg")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("id", 'drawSvg' + bar._id)
        .attr("width", widthValue)
        .attr("height", heightValue)
        .attr("viewBox", `${originx} 0 ${viewWidth} ${viewHeight}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", "translate(" + widthValue / 2 + "," + heightValue / 2 + ")");




    //     var margin = {top: 20, right: 10, bottom: 100, left: 60},pad =20,

    // //This is to get width and height from parentdiv.So graph will be placed inside parent div
    //     	width = document.getElementById(svgId).offsetWidth - margin.left - margin.right,
    //     	height = document.getElementById(svgId).offsetHeight - margin.top - margin.bottom,

    // 	radius = Math.min(height / 2,width/3.5) - 5;
    // 	console.log(radius);
    // d3.select("#"+svgId+ " svg").remove();
    // 	var svg = d3.select("#"+svgId).append("svg")
    //     	.attr("width", width + margin.left + margin.right)
    //    	.attr("height", height + margin.top + margin.bottom)
    //     	.append("g")
    //    	.attr("transform",
    //           "translate(" + (radius+margin.right)+ "," + height/2 + ")");
    // var textFontSize = screen.width < 1400 ? "calc(0em + 0.55vw)" : "calc(0em + 0.65vw)"
    // var textFontSize = screen.width < 1500 ? "calc(0.9em)" : "calc(0.6em)"
    // var textFontSize = screen.width < 1500 ? "calc(0.9em)" : "calc(0.9em)"
    var textFontSize = "0.75em"
    // var textFontFamily = 'Oxygen, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    var textFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif'"
    lineHeight = '4',
    
    drawLayerPie(svg, bar, radius, textFontSize);
    if (secondaryData && secondaryData.length)
        drawLayerPie(svg, {}, radius, textFontSize, secondaryData);


    //callwrap is used to break the line of label
    setTimeout(() => {
        snapShotPie(textFontSize, bar, heightValue, widthValue, textFontFamily, lineHeight);
    }, 1000)
}

function drawLayerPie(svg, bar = {}, radius, textFontSize, secondaryData = []) {
    var linePoints = [];
    var textPoints = [];
    console.log("secondary", secondaryData, bar)
    var data = {};
    var domainData = [];
    var backgroundColor = {};
    var colorOverAll = [
        '#61c478',
        '#4da337',
        '#8a8a33',
        '#ee7c3b',
        '#cf4f84',
        '#ba6dcd',
        '#9469cd',
        '#ee7c3b',
        '#cf4f84',
        '#ba6dcd',
        '#9469cd',
        '#8b79eb',
        '#3a82d2',
        '#75b6d2',
        '#8b79eb'
    ]
    var total = 0;
    let isNoData = true;
    if (bar.graph_data && bar.graph_data.data && bar.graph_data.data.length)
        for (let item of bar.graph_data.data) {
            data = { ...data, [item.name]: item['count'] }
            domainData.push(item.name);
            backgroundColor = { ...backgroundColor, [item.name]: item['color'] }
            if (item['count']) {
                total += item['count']
                isNoData = false;
            }

        }
    let colorIndex = 0;
    if (secondaryData && secondaryData.length)
        for (let item of secondaryData) {
            data = { ...data, [item.name]: item['count'] }
            domainData.push(item.name);
            backgroundColor = { ...backgroundColor, [item.name]: colorOverAll[colorIndex] }
            if (item['count']) {
                total += item['count']
                isNoData = false;
            }
            colorIndex++;
        }
    if (isNoData) {
        let pieLabel = svg.append("svg:text")
            .attr("dy", ".35em").attr("class", "noDataPie")
            .attr("text-anchor", "middle")
            .text('No Data Found');
    }
    // Create dummy data
    // var data = {a: 9, b: 20, c:30, d:8, e:12, f:3, g:7, h:14}

    // set the color scale
    // var color = d3.scaleOrdinal()
    //     .domain(domainData)
    //     .range(d3.schemeDark2);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .sort(null) // Do not sort group by size
        .value(function (d) { return d.value; })
    var data_ready = pie(d3.entries(data))

    // The arc generator
    // var arc = d3.arc()
    //   .innerRadius(radius * 0.5)         // This is the size of the donut hole
    //   .outerRadius(radius * 0.8)

    if (secondaryData && secondaryData.length) {
        var arc = d3.arc()
            .innerRadius(radius * 01)         // This is the size of the donut hole
            .outerRadius(radius * 0.8)
    } else {
        var arc = d3.arc()
            .innerRadius(radius * 0.5)         // This is the size of the donut hole
            .outerRadius(radius * 0.8)
    }

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('allSlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d) { console.log("backgroundColor", backgroundColor, d.data.key, backgroundColor[d.data.key]); return backgroundColor[d.data.key] })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

    // Add the polylines between chart and labels:
    svg
        .selectAll('allPolylines')
        .data(data_ready)
        .enter()
        .append('polyline')
        .attr("stroke", function (d) { return backgroundColor[d.data.key] })
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function (d) {
            var posA = arc.centroid(d) // line insertion in the slice
            var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
            var posC = outerArc.centroid(d); // Label position = almost the same as posB
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = (secondaryData && secondaryData.length) ? radius * 1.1 * (midangle < Math.PI ? 1 : -1) : radius * 0.95 * (midangle < Math.PI ? 1 : -1);

            posC[1] = (secondaryData && secondaryData.length) ? posC[1] + 20 * (midangle < Math.PI ? -1 : 1) : posC[1]

            linePoints.forEach(item => {
                let lineDiff = Math.abs(item) - Math.abs(posC[1])
                lineDiff = lineDiff.toFixed(3)
                if ((lineDiff < 0.5) && (lineDiff > -2.5) && (lineDiff != 0)) {
                    console.log("points", lineDiff, linePoints)
                    posC[1] = posC[1] + (midangle < Math.PI ? -12 : 12)
                }
            })
            linePoints.push(posC[1]);

            if (d.data.value > 0) // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
        })
    var pos = d3.svg.arc().innerRadius(radius + 2).outerRadius(radius + 2);

    var getAngle = function (d) {
        return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 + 45);
    };


    // Add the polylines between chart and labels:
    svg
        .selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function (d) { console.log(d.data.value); let percentage = d.data.value == 0 || total == 0 ? "0%" : ((d.data.value / total) * 100).toFixed(2) + "%"; let overAllLabel = "(" + d.data.value + ") (" + percentage + ") (OverAll)"; let showLabel = (secondaryData && secondaryData.length) ? overAllLabel : d.data.key + " (" + d.data.value + ") (" + percentage + ")"; console.log(showLabel, overAllLabel); if (d.data.value > 0) return showLabel })
        .attr('transform', function (d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            pos[0] = midangle < Math.PI ? pos[0] - 5 : pos[0];
            pos[1] = (secondaryData && secondaryData.length) ? pos[1] + 20 * (midangle < Math.PI ? -1 : 1) : pos[1];
            textPoints.forEach(item => {
                let textDiff = Math.abs(item) - Math.abs(pos[1])
                textDiff = textDiff.toFixed(3)
                if ((textDiff < 0.5) && (textDiff > -2.5) && (textDiff != 0)) {
                    console.log("text", textDiff, textPoints)
                    pos[1] = pos[1] + (midangle < Math.PI ? -12 : 12)
                }
            })
            textPoints.push(pos[1]);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function (d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
            // return (midangle < Math.PI ? 'start' : 'middle')

        })
        // var textColor = screen.width < 1400 ? "#666666" : "#000000"
        // console.log("textColor",textColor)
        .style('text-shadow', 'unset !important')
        .style('box-shadow', 'unset !important')
        // .style('fill','#666666')
        .style('fill',window.screenTop ? 'rgb(102 102 102 / 61%)' : '#666666')
        .style('font-style', 'normal')
        .style('font-family','"Helvetica Neue", "Helvetica", "Arial", "sans-serif"')
        .style('letter-spacing','-0.1px')
        .style('font-size', textFontSize)
        .attr('class', 'svgText')
        .attr('class', 'svgText2')
        .attr("dy", ".35em")
        .attr("dx", ".35em")
        .call(wrap, 100);

    arrangeLabels(svg, ".label");
}

function snapShotPie(textFontSize, bar, heightValue, widthValue, textFontFamily, lineHeight) {
    // var iamgeFontSize = screen.width < 1400 ? "calc(0em + 2.0vw)" : "calc(0em + 2.5vw)";
    // var iamgeFontSize = screen.width < 1400 ? "calc(0.8em)" : "calc(1em)";
    // var iamgeFontSize = '10px';
    var iamgeFontSize = '0.75em'

    var svgText = Array.from(document.getElementsByClassName('svgText'))
    svgText.forEach(item => {
        item.style.fontSize = iamgeFontSize
        item.style.fontFamily = textFontFamily
        item.style.lineHeight = lineHeight
        item.style.boxShadow = 'unset !important'
        item.style.textShadow = 'unset !important'
    })
    let svgDiv = document.getElementById('drawSvg' + bar._id)

    var canvas = document.getElementById('imagePie-' + bar._id);
    canvas.height = heightValue;
    canvas.width = widthValue;
    svgDiv.setAttribute('width', widthValue);
    svgDiv.setAttribute('height', heightValue);
    console.log(canvas)
    console.log(svgDiv)
    const ctx = canvas.getContext('2d')
    let imageId = '#svg' + bar._id + ' > svg';
    let htmlSvg = $(imageId)[0].outerHTML
    const tempImg = document.createElement('img')
    tempImg.crossOrigin = 'Anonymous';
    tempImg.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(htmlSvg)))
    svgDiv.removeAttribute('width');
    svgDiv.removeAttribute('height');
    svgText.forEach(item => {
        item.style.fontSize = textFontSize
        item.style.boxShadow = 'unset !important'
        item.style.textShadow = 'unset !important'
        // item.style.fontSize = '7px'
    })
    const targetImg = document.createElement('img')
    tempImg.addEventListener('load', function onTempImageLoad(e) {
        ctx.drawImage(e.target, 0, 0)
        targetImg.src = canvas.toDataURL()
    })
}

function getTransformation(transform) {
    /*
     * This code comes from a StackOverflow answer to a question looking
     * to replace the d3.transform() functionality from v3.
     * http://stackoverflow.com/questions/38224875/replacing-d3-transform-in-d3-v4
     */
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    g.setAttributeNS(null, "transform", transform);
    var matrix = g.transform.baseVal.consolidate()
        .matrix;

    var {
        a,
        b,
        c,
        d,
        e,
        f
    } = matrix;
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
        translateX: e,
        translateY: f,
        rotate: Math.atan2(b, a) * Math.PI / 180,
        skewX: Math.atan(skewX) * Math.PI / 180,
        scaleX: scaleX,
        scaleY: scaleY
    };
}
function arrangeLabels(selection, label_class) {
    var move = 1;
    while (move > 0) {
        move = 0;
        selection.selectAll(label_class)
            .each(function () {
                var that = this;
                var a = this.getBoundingClientRect();
                selection.selectAll(label_class)
                    .each(function () {
                        if (this != that) {
                            var b = this.getBoundingClientRect();
                            if ((Math.abs(a.left - b.left) * 2 < (a.width + b.width)) && (Math.abs(a.top - b.top) * 2 < (a.height + b.height))) {
                                var dx = (Math.max(0, a.right - b.left) + Math.min(0, a.left - b.right)) * 0.01;
                                var dy = (Math.max(0, a.bottom - b.top) + Math.min(0, a.top - b.bottom)) * 2;
                                var tt = getTransformation(d3.select(this)
                                    .attr("transform"));
                                var to = getTransformation(d3.select(that)
                                    .attr("transform"));
                                move += Math.abs(dx) + Math.abs(dy);

                                to.translate = [to.translateX + dx, to.translateY + dy];
                                tt.translate = [tt.translateX - dx, tt.translateY - dy];
                                d3.select(this)
                                    .attr("transform", "translate(" + tt.translate + ")");
                                d3.select(that)
                                    .attr("transform", "translate(" + to.translate + ")");
                                a = this.getBoundingClientRect();
                            }
                        }
                    });
            });
    }
}
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this);
        var words = text.text()
            .split(/\s+/)
            .reverse();
        var word;
        var line = [];
        var lineHeight = 1.2;
        var y = 0 //text.attr("y");
        var x = 0;
        var dy = parseFloat(text.attr("dy"));
        var dx = parseFloat(text.attr("dx"));
        var tspan = text.text(null)
            .append("tspan")
            .attr("x", x)
            .attr("y", y);
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node()
                .getComputedTextLength() > width - x) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", x)
                    .attr("dy", lineHeight + "em")
                    .attr("dx", dx + "em")
                    .text(word);
            }
        }
    });
}


function responsive(bar) {
    // Fake data
    const data = [
        {
            year: 2000,
            popularity: 50
        },
        {
            year: 2001,
            popularity: 150
        },
        {
            year: 2002,
            popularity: 200
        },
        {
            year: 2003,
            popularity: 130
        },
        {
            year: 2004,
            popularity: 240
        },
        {
            year: 2005,
            popularity: 380
        },
        {
            year: 2006,
            popularity: 420
        }
    ];

    const heightValue = 300;
    const widthValue = 600;

    // Create SVG and padding for the chart
    const svg = d3
        .select("#svg" + bar._id)
        .append("svg")
        .attr("viewBox", `0 0 ${widthValue} ${heightValue}`)
        ;

    const strokeWidth = 1.5;
    const margin = { top: 0, bottom: 20, left: 30, right: 20 };
    const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);
    const width = 600 - margin.left - margin.right - (strokeWidth * 2);
    const height = 300 - margin.top - margin.bottom;
    const grp = chart
        .append("g")
        .attr("transform", `translate(-${margin.left - strokeWidth},-${margin.top})`);

    // Create scales
    const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, dataPoint => dataPoint.popularity)]);
    const xScale = d3
        .scaleLinear()
        .range([0, width])
        .domain(d3.extent(data, dataPoint => dataPoint.year));

    const area = d3
        .area()
        .x(dataPoint => xScale(dataPoint.year))
        .y0(height)
        .y1(dataPoint => yScale(dataPoint.popularity));

    // Add area
    grp

}

function pie3(bar) {
    testPie(bar);
    return true;
    let id = "svg" + bar._id
    var contentData = [];
    for (let item of bar.graph_data.data) {
        contentData.push({ label: item.name, value: item.count, color: item.color })
    }

    let height = document.getElementById('bar-chart-' + bar._id).parentElement.clientHeight;
    let width = document.getElementById('bar-chart-' + bar._id).parentElement.clientWidth;
    console.log("pieChart", contentData)
    var pie = new d3pie(id, {
        // "header": {
        //     "title": {
        //         "text": "Top 15 Fears",
        //         "fontSize": 34,
        //         "font": "courier"
        //     },
        //     "subtitle": {
        //         "text": "What strikes the most terror in people?",
        //         "color": "#999999",
        //         "fontSize": 10,
        //         "font": "courier"
        //     },
        //     "location": "pie-center",
        //     "titleSubtitlePadding": 10
        // },
        // "footer": {
        //     "text": "* This was curious. We're not sure why several people regard Winnipeg as a Top 15 Fear.",
        //     "color": "#999999",
        //     "fontSize": 10,
        //     "font": "open sans",
        //     "location": "bottom-left"
        // },
        "size": {
            "canvasHeight": height,
            "canvasWidth": width,
            "pieInnerRadius": "49%",
            "pieOuterRadius": "59%"
        },
        "data": {
            "sortOrder": "label-desc",
            "content": contentData
        },
        "labels": {
            "outer": {
                "format": "label-value2",
                "pieDistance": 20
            },
            "inner": {
                "hideWhenLessThanPercentage": 10
            },
            "mainLabel": {
                "fontSize": 11
            },
            "percentage": {
                "color": "#999999",
                "fontSize": 11,
                "decimalPlaces": 0
            },
            "value": {
                "color": "#cccc43",
                "fontSize": 11
            },
            "lines": {
                "enabled": true,
                "color": "#777777"
            },
            "truncation": {
                "enabled": true
            }
        },
        "tooltips": {
            "enabled": true,
            "type": "placeholder",
            "string": "{label}: {value}, {percentage}%"
        },
        "effects": {
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 400,
                "size": 8
            }
        },
        "misc": {
            "colors": {
                "segmentStroke": "#000000"
            },
            "gradient": {
                "enabled": true
            }
        }
    });
}

function indiaMap() {
    console.log('india map called', document.getElementById('india'))
    // return
            var bubble_map = new Datamap({
                element: document.getElementById('india'),
                scope: 'india',
                responsive: true,
                geographyConfig: {
                    popupOnHover: true,
                    highlightOnHover: true,
                    borderColor: '#444',
                    borderWidth: 0.5,
                    dataUrl: 'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json'
                    // dataJson: stateJSON
                },
                fills: {
                    'MAJOR': '#306596',
                    'MEDIUM': '#0fa0fa',
                    'MINOR': '#bada55',
                    defaultFill: '#dddddd'
                },
                data: {
                    'JH': { fillKey: 'MINOR' },
                    'MH': { fillKey: 'MINOR' }
                },
                setProjection: function (element) {
                    var projection = d3.geo.mercator()
                        .center([78.9629, 23.5937]) // always in [East Latitude, North Longitude]
                        .scale(1000);
                    var path = d3.geo.path().projection(projection);
                    return { path: path, projection: projection };
                }
            });
    
            let bubbles = [
                {
                    centered: "MH",
                    fillKey: "MAJOR",
                    radius: 20,
                    state: "Maharastra"
                },
                {
                    centered: "AP",
                    fillKey: "MAJOR",
                    radius: 22,
                    state: "Andhra Pradesh"
                },
                {
                    centered: "TN",
                    fillKey: "MAJOR",
                    radius: 16,
                    state: "Tamil Nadu"
                },
                {
                    centered: "WB",
                    fillKey: "MEDIUM",
                    radius: 15,
                    state: "West Bengal"
                },
                {
                    centered: "MP",
                    fillKey: "MEDIUM",
                    radius: 15,
                    state: "Madhya Pradesh"
                },
                {
                    centered: "UP",
                    fillKey: "MINOR",
                    radius: 8,
                    state: "Uttar Pradesh"
                },
                {
                    centered: "RJ",
                    fillKey: "MINOR",
                    radius: 7,
                    state: "Rajasthan"
                }
    
            ]
            // // ISO ID code for city or <state></state>
            setTimeout(() => { // only start drawing bubbles on the map when map has rendered completely.
                bubble_map.bubbles(bubbles, {
                    popupTemplate: function (geo, data) {
                        return `<div class="hoverinfo">city: ${data.state}, Slums: ${data.radius}%</div>`;
                    }
                });
            }, 1000);
}