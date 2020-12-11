var width = 800;
var height = 500;
var margin = { top : 50, bottom : 50, left : 50, right : 50 };


// Retrieve the data from MongoDB.
// We wrap this around the entire thing to use the data value throughout the rest of the code.
d3.json("http://localhost:3000/getCountryCountRelative").then(data => {;
//Select the html-element, and set size of it
console.log(data)
var svg = d3.select('#countriesPopulation')
  .attr('height', height - margin.top - margin.bottom)
  .attr('width', width - margin.left - margin.right)
  .attr('viewBox', [0, 0, width, height])
  .attr('class', 'chart');

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//axis
var x, y;

x = d3.scaleBand()
  .domain(data.map(d => d.country)) // number of columns = pr lang (number of objects)
  .rangeRound([margin.left, width - margin.right]) // visually stretches in between the margins of the element
  .padding(0.1);  // padding between elements

y = d3.scaleLinear()
  .domain(([0, (d3.max(data, function(element) { return element.count + 0.000005}))])) //set height of Y-axis to max value of elements
  .range([height - margin.bottom, margin.top]); //how tall is the graph


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Set the bars in plot
svg.selectAll("rect")
  .data(data.sort((a, b) => d3.descending(a.count, b.count))) //sort by descending
  .join('rect') //Selection of elements from '.data'
    .attr('x', element => x(element.country)) //where to place each element (on its own lang)
    .attr('y', (element) => y(element.count)) //show height of each element by element.count
    .attr('height', element => y(0) - y(element.count))
    .attr('width', x.bandwidth()) // set width of each band (column)
    .attr('fill', 'green'); //color of columns


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//numbers on top of elements

svg.selectAll("text.count") //class text.count
  .data(data)
  .join("text") // for each element
    .attr('x', (element) => x(element.country)) //where to place each element (on its own lang)
    .attr('y', (element) => y(element.count)) //show height of each element by element.count
    .attr("dx", 3) //x placering i forhold til enkelte bar
    .attr("dy", -5)  //y placering af text i forhold til enkelt bar
    .attr("text-anchor", "start") // anchor at start of bar
    .style("font-size", "10px")
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
  .style("font-size", "13px")
  .text("# of Tweets");

   // text label for the x axis
   svg.append("text")
   .attr("class", "x-axis-label")
   .attr("text-anchor", "middle")
   .attr("x", width/2)
   .attr("y", height - 6)
   .style("font-size", "18px")
   .text("Tweet country origin");

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//APPEND is to append to the html object
//append information to chart

//draw y-axis
svg.append("g")
  .attr("transform", "translate("+ margin.left +",0 )")
  .call(d3.axisLeft(y));

//draw x-axis
svg.append("g")
  .attr("transform", "translate(0," + (height - margin.bottom) + ")")
  .call(d3.axisBottom(x));
})