// START JENNA ADDITIONS FOR POPULAITNG MENU  1 of 2//
function setup() {
    d3.json("http://127.0.0.1:5000/data").then(function(data) {

        All_Data = data;

        var neighborhood_list = data.Map_Data.map(d=>d[0]);
        var initial_labels = data.N_CountbyYear["Minneapolis"][0];
        var initial_values = data.N_CountbyYear["Minneapolis"][1];

        Initial_Charts()
            myBestChart = CreateTimeSeries(initial_labels, initial_values);
            console.log(myBestChart)
            CreateChart1();
            CreateChart2();
            Drop_DOwn()


        Updates_Charts()



    })

    
}

var All_Data;

var myChart;
var myBestChart;
var myOtherChart;
setup();
console.log(myBestChart);
myBestChart.destroy();


function CreateChart1() {
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
    // console.log(myChart);
    return myChart
}

function CreateChart2() {
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

    return myOtherChart
}

function CreateTimeSeries(labels, values)   {
    var ctx = document.getElementById('myBestChart').getContext('2d');
    const config = {
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
        
    return new Chart(ctx, config);

}




// // START JENNA ADDITIONS FOR POPULAITNG MENU  2 of 2//

// // update All plots and data when dropdown menu is changed
// function updatePlotly() {

//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
//     console.log(dataset);
//     d3.json("http://127.0.0.1:5000/data").then(function(data) {
    
//         // var labels = data.N_CountbyYear[dataset][0];
//         var labels = data.N_CountbyYear[dataset][0];
//         var values = data.N_CountbyYear[dataset][1];
//         myOtherChart.destroy();
//         myBestChart.destroy();
//         // updateTimeSeries(labels, values);
//     });
// };

// //event listener for menu, run plot update when there is a change
// d3.selectAll("#selDataset").on("change", updatePlotly); 

// // END JENNA ADDITIONS FOR POPULAITNG MENU  2 of 2//