
// // d3.json(url).then(function(data)
// d3.json("http://127.0.0.1:5000/data").then(function(data) {
//     console.log(data);
//     key = Object.keys(data);
//     console.log(data.Map_Data);
//     var node = document.createElement('p');
//     var textnode = document.createTextNode(data.Map_Data);
//     node.appendChild(textnode); 
//     document.getElementById("test").appendChild(node);  


 //get data pull, set up dropdown menu, and call the initial plot
 function setup() {
    d3.json("http://127.0.0.1:5000/data").then(function(data) {
        console.log(data);
        // key = Object.keys(data);
        var neighborhood_list = data.Map_Data.map(d=>d[0]);
        // console.log(data.Neighboorhood_Data);

   var innerContainer = document.querySelector('.well'),
   // plotEl = innerContainer.querySelector('#bar'),
   userSelector = innerContainer.querySelector('#selDataset');
 
   function assignOptions(neighborhood, selector) {
   for (var i = 0; i < neighborhood.length;  i++) {
       if (neighborhood[i] !== null) {
            var currentOption = document.createElement('option');
            currentOption.text = neighborhood[i];
            selector.appendChild(currentOption);
       } else {
           console.log("skipped neighborhood")
       }
     }
   }
 
   assignOptions(neighborhood_list, userSelector);
//    initPlot(samples, metadata);
   });
 };
 
 //call the set up function
 setup();

// update All plots and data when dropdown menu is changed
function updatePlotly() {
   
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      console.log(dataset);

  };
  
  //event listener for menu, run plot update when there is a change
  d3.selectAll("#selDataset").on("change", updatePlotly);