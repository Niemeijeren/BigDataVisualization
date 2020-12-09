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

//axes
var x, y;

x = d3.scaleBand()
  .domain(d3.range(data.length)) // number of columns = length of array
  .range([margin.left, width - margin.right]) // visually stretches in between the margins of the element
  .padding(0.5);  // padding between elements

y = d3.scaleLinear()
  .domain(([0, (d3.max(data, function(element) { return element.count ;} ))])) //set height of Y-axis to max value of elements
  .range([height - margin.bottom, margin.top]); //how tall is the graph

// Set the bars in plot
svg.selectAll("rect")
  .data(data.sort((a, b) => d3.descending(a.count, b.count))) //sort by descending
  .join('rect') //Selection of elements from '.data'
    .attr('x', (element, i) => x(i)) //where to place each element (on its own number position)
    .attr('y', (element) => y(element.count)) //show height of each element by element.count
    .attr('height', element => y(0) - y(element.count))
    .attr('width', x.bandwidth()) // set width of each band (column)
    .attr('fill', 'royalblue'); //color of columns


//numbers on each elent top
svg.selectAll("text")
  .data(data)
  .join("text") // for each element
    .attr('x', (element, i) => x(i)) //where to place each element (on its own number position)
    .attr('y', (element) => y(element.count)) //show height of each element by element.count
    .attr("dx", -5) //x placering i forhold til enkelte bar
    .attr("dy", "-.3em")  //y placering af text i forhold til enkelt bar
    .attr("text-anchor", "start") // anchor at start of bar
    .text(function(element) { return element.count ;}); //brug count som text


//APPEND is to append to the html object
// text label for the x axis
svg.append("text")             
  .attr("y", - margin.left + (0.02*width) ) //placering på x-aksen
  .attr("x",0 - (height / 2)) //placering på y-aksen
  .attr("dx, "1em)
  .style("text-anchor", "middle")
  .text("# of Tweets");   
  .style("text-anchor", "middle")
  .text("Date");

// text label for the y axis
svg.append("text")
  .attr("transform", "rotate(-90)") //Text vertikalt
  .attr("y", - margin.left + (0.02*width) ) //placering på x-aksen
  .attr("x",0 - (height / 2)) //placering på y-aksen
  .attr("dy", "2em")
  .style("text-anchor", "middle")
  .text("# of Tweets");   

//append information to chart

svg.append("g")
  .attr("transform", "translate("+ margin.left +",0 )")
  .call(d3.axisLeft(y));

svg.append("g")
  .attr("transform", "translate(0," + (height - margin.bottom) + ")")
  .call(d3.axisBottom(x));

svg
  .append('g')
  .attr('fill', 'royalblue')

svg.node();