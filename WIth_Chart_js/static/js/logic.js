// START JENNA ADDITIONS FOR POPULAITNG MENU  1 of 2//
function setup() {
    d3.json("http://127.0.0.1:5000/data").then(function(data) {
        // console.log(data);
        // key = Object.keys(data);
        var neighborhood_list = data.Map_Data.map(d=>d[0]);
        var initial_labels = data.N_CountbyYear["Minneapolis"][0];
        var initial_values = data.N_CountbyYear["Minneapolis"][1];
        CreateTimeSeries(initial_labels,initial_values);
        console.log(my3rdChart.data.datasets);
        
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
// END JENNA ADDITIONS FOR POPULATING MENU 1 of 2///




var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
});

var ctx = document.getElementById('myOtherChart').getContext('2d');
var myOtherChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// var ctx = document.getElementById('my3rdChart').getContext('2d');

//     var my3rdChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: "Number of Incidents",
//                 data: values,
//                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                 borderColor: 'rgb(54, 162, 235)',
//                 borderWidth: 1
//             }]
//         }   
//     });

function CreateTimeSeries(labels, values)   {
    var ctx = document.getElementById('my3rdChart').getContext('2d');
    var config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: "Number of Incidents",
                    data: values,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                }]
            }
        }
        
    var my3rdChart = new Chart(ctx, config);

    return my3rdChart
    
}


// START JENNA ADDITIONS FOR POPULAITNG MENU  2 of 2//

// update All plots and data when dropdown menu is changed
function updatePlotly(my3rdChart) {

    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    console.log(dataset);
    d3.json("http://127.0.0.1:5000/data").then(function(data, my3rdChart) {
    
        // var labels = data.N_CountbyYear[dataset][0];
        var values = data.N_CountbyYear[dataset][1];
        console.log(my3rdChart.data.datasets[1]);
        my3rdChart.data.datasets[1] = values;
        my3rdChart.update();
    });
};

//event listener for menu, run plot update when there is a change
d3.selectAll("#selDataset").on("change", updatePlotly); 

// END JENNA ADDITIONS FOR POPULAITNG MENU  2 of 2//