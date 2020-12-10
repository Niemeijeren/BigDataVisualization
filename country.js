const data = [
  { lang: 'en', count: 1039517 },
  { lang: 'es', count: 290771 },
  { lang: 'de', count: 188789 },
  { lang: 'fr', count: 107169 },
  { lang: 'tr', count: 102150 },
  { lang: 'und', count: 98638 },
  { lang: 'in', count: 94981 },
  { lang: 'pt', count: 80230 },
  { lang: 'th', count: 47093 },
  { lang: 'nl', count: 42642 },
  { lang: 'it', count: 30693 },
  { lang: 'ja', count: 29401 },
  { lang: 'hi', count: 26915 },
  { lang: 'ca', count: 11613 },
  { lang: 'tl', count: 7548 },
];

var width = 900;
var height = 600;
var margin = { top : 50, bottom : 50, left : 50, right : 50 };

//Select the html-element, and set size of it
var svg = d3.select('#countries')
  .attr('height', height - margin.top - margin.bottom)
  .attr('width', width - margin.left - margin.right)
  .attr('viewBox', [0, 0, width, height])
  .attr('class', 'chart');


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//axis
var x, y;

x = d3.scaleBand()
  .domain(data.map(d => d.lang)) // number of columns = pr lang (number of objects)
  .rangeRound([margin.left, width - margin.right]) // visually stretches in between the margins of the element
  .padding(0.1);  // padding between elements

y = d3.scaleLinear()
  .domain(([0, (d3.max(data, function(element) { return element.count + 63000 ;}))])) //set height of Y-axis to max value of elements
  .range([height - margin.bottom, margin.top]); //how tall is the graph


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Set the bars in plot
svg.selectAll("rect")
  .data(data.sort((a, b) => d3.descending(a.count, b.count))) //sort by descending
  .join('rect') //Selection of elements from '.data'
    .attr('x', element => x(element.lang)) //where to place each element (on its own lang)
    .attr('y', (element) => y(element.count)) //show height of each element by element.count
    .attr('height', element => y(0) - y(element.count))
    .attr('width', x.bandwidth()) // set width of each band (column)
    .attr('fill', 'royalblue'); //color of columns


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//numbers on top of elements

svg.selectAll("text.count") //class text.count
  .data(data)
  .join("text") // for each element
    .attr('x', (element) => x(element.lang)) //where to place each element (on its own lang)
    .attr('y', (element) => y(element.count)) //show height of each element by element.count
    .attr("dx", 3) //x placering i forhold til enkelte bar
    .attr("dy", -5)  //y placering af text i forhold til enkelt bar
    .attr("text-anchor", "start") // anchor at start of bar
    .attr('class', 'score') //class count
    .text(function(element) { return element.count ;}); //brug count som text


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//LABELS FOR AXIS

// text label for the y axis
svg.append("text")
  .attr("class", "y-axis-label") //giv den en klasse for overskuelighed og debugging
  .attr("transform", "rotate(-90)") //Text vertikalt
  .attr("y", - margin.left + (0.015*width) ) //placering på x-aksen
  .attr("x",0 - (height / 2)) //placering på y-aksen
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .style("font-size", "18px")
  .text("# of Tweets");

   // text label for the x axis
   svg.append("text")
   .attr("class", "x-axis-label")
   .attr("text-anchor", "middle")
   .attr("x", width/2)
   .attr("y", height - 6)
   .style("font-size", "18px")
   .text("Language used in tweet");

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//APPEND is to append to the html object
//append information to chart

svg.append("g")
  .attr("transform", "translate("+ margin.left +",0 )")
  .call(d3.axisLeft(y));

svg.append("g")
  .attr("transform", "translate(0," + (height - margin.bottom) + ")")
  .call(d3.axisBottom(x).tickSizeOuter(0));

svg
  .append('g')
  .attr('fill', 'royalblue')

svg.node();
