// from data.js
var tableData = data;

const shapevalue = Array.from(new Set(tableData.map(entry => entry.shape)));
shapevalue.sort().unshift("0")

const statevalue = Array.from(new Set(tableData.map(entry => entry.state)));
statevalue.sort().unshift("0")

const countryvalue = Array.from(new Set(tableData.map(entry => entry.country)));
countryvalue.sort().unshift("0")

var inputdates = d3.select("#datetime");
var outputdates = d3.select("#ufo-table");
var submission = d3.select("#filter-btn")

outputdates.select("tbody")
    .selectAll("tr")
    .data(tableData)
    .enter()
    .append("tr")
    .html(function(d)
        {
        return `<td>${d.datetime}</d>
                <td>${d.city}</d>
                <td>${d.state}</d>
                <td>${d.country}</d>
                <td>${d.shape}</d>
                <td>${d.durationMinutes}</d>
                <td>${d.comments}</d>`;    
        });

d3.select("#shapedrop")
    .selectAll("option")
    .data(shapevalue)
    .enter()
    .append("option")
    .html(function(d)
        {
        return `<option value=${d}>${d}</option>`; 
        });

d3.select("#statedrop")
    .selectAll("option")
    .data(statevalue)
    .enter()
    .append("option")
    .html(function(d)
        {
        return `<option value=${d}>${d}</option>`; 
        });

d3.select("#countrydrop")
    .selectAll("option")
    .data(countryvalue)
    .enter()
    .append("option")
    .html(function(d)
        {
        return `<option value=${d}>${d}</option>`; 
        });

function dateFilter(){
    d3.event.preventDefault();
    var DateValues = inputDate.node().value.trim();
    var CityValues = d3.select("#city").node().value.trim().toLowerCase();
    var ShapeValues = d3.select("#shapedrop").node().value;
    var StateValues= d3.select("#statedrop").node().value;
    var CountryValues = d3.select("#countrydrop").node().value;

    var filterData = tableData;

    if (DateValues != ""){filterData=filterData.filter(entry=> {return entry.datetime==DateValues});}
    if (CityValues != ""){filterData=filterData.filter(entry=> {return entry.city==CityValues});}
    if (ShapeValues != "0"){filterData=filterData.filter(entry=>{return entry.shape==ShapeValues});}
    if (StateValues != "0"){filterData=filterData.filter(entry=>{return entry.state==StateValues});}
    if (CountryValues != "0"){filterData=filterData.filter(entry=>{return entry.country==CountryValues});}

    outputdates.select("tbody").html("")

    outputdates.select("tbody")
        .selectAll("tr")
        .data(filterData)
        .enter()
        .append("tr")
        .html(function(d)
            {
            return `<td>${d.datetime}</d>
                    <td>${d.city}</d>
                    <td>${d.state}</d>
                    <td>${d.country}</d>
                    <td>${d.shape}</d>
                    <td>${d.durationMinutes}</d>
                    <td>${d.comments}</d>`;    
            });

};

function dateReset(){
    d3.event.preventDefault();
    inputdates.node().value = ''
    d3.select("#city").node().value = ''
    document.getElementById('shapedrop').selectedIndex=0;
    document.getElementById('statedrop').selectedIndex=0;
    document.getElementById('countrydrop').selectedIndex=0;
}


submission.on("click", dateFilter);
d3.select("#reset-btn").on("click", dateReset);