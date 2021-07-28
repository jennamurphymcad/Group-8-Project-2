
var myChart;
var myBestChart;
var myOtherChart;

setup();



function setup() {
    d3.json("http://127.0.0.1:5000/data").then(function(data) {

        

        // Create initial dashboard view
        var neighborhood_list = data.Map_Data.map(d=>d[0]);
        var TS_initial_labels = data.N_CountbyYear["Minneapolis"][0];
        var TS_initial_values = data.N_CountbyYear["Minneapolis"][1];
        var P_initial_labels = data.N_CountbyProblem["Minneapolis"][0];
        var P_initial_values = data.N_CountbyProblem["Minneapolis"][1];
        var FT_initial_labels = data.N_CountbyForceType["Minneapolis"][0];
        var FT_initial_values = data.N_CountbyForceType["Minneapolis"][1];
        
        
        console.log(data.N_CountbyProblem["Minneapolis"]);
        

        myBestChart = CreateTimeSeries(TS_initial_labels, TS_initial_values);
        console.log(myBestChart.config.data.datasets.data);
        myOtherChart = CreateProblemChart(P_initial_labels,P_initial_values);
        myChart = CreateForceTypeChart(FT_initial_labels, FT_initial_values);
        
        
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

        function updatePlotly() {

            var dropdownMenu = d3.select("#selDataset");
            // Assign the value of the dropdown menu option to a variable
            var dataset = dropdownMenu.property("value");
            // Push selection to console
            console.log(dataset);
            
            
            // Select new data for time series plot
            var labels = data.N_CountbyYear[dataset][0];
            var values = data.N_CountbyYear[dataset][1];
            // Destroy old chart per chart.js   
            myBestChart.destroy();
            // Call function to create new chart and pass new data
            myBestChart = CreateTimeSeries(labels, values);

            // Select new data for time series plot
            var P_labels = data.N_CountbyProblem[dataset][0];
            var P_values = data.N_CountbyProblem[dataset][1];
            // Destroy old chart per chart.js   
            myOtherChart.destroy();
            // Call function to create new chart and pass new data
            myOtherChart = CreateProblemChart(P_labels, P_values);
                
            // Select new data for time series plot
            var FT_labels = data.N_CountbyForceType[dataset][0];
            var FT_values = data.N_CountbyForceType[dataset][1];
            // Destroy old chart per chart.js   
            myChart.destroy();
            // Call function to create new chart and pass new data
            myChart = CreateForceTypeChart(FT_labels, FT_values);
            
        };

        d3.selectAll("#selDataset").on("change", updatePlotly);





    })

    
}






function CreateForceTypeChart(labels, values) {
    var ctx = document.getElementById('myChart').getContext('2d');
    
    var data = {
            labels: labels,
            datasets: [{
            label: "Number of Incidents",
            axis: 'y',
            data: values,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
    }]};
    
    var config = {
        type: 'doughnut', data,
        options: {
            plugins: {
                    legend: {
                        display: true,
                        position: "left",
                        align: "left",
                        labels: {
                            color: 'rgb(255, 99, 132)'
                        }
                    }
            },
            maintainAspectRatio: false,
            indexAxis: 'y',
            // scales: {
            //     y: [{
            //         stacked: false, 
            //         beginAtZero: true, 
            //         ticks: {stepSize: 0, min: 0, autoSkip: false}
                    
            //     }]
            // }
        }         
    };
        
    return new Chart(ctx, config);

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
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(255, 159, 64, 1)',
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
        }
        
    return new Chart(ctx, config);

}

function CreateProblemChart(labels, values)   {
    var ctx = document.getElementById('myOtherChart').getContext('2d');
    
    var data = {
            labels: labels,
            datasets: [{
            label: "Number of Incidents",
            axis: 'y',
            data: values,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
    }]};
    
    var config = {
        type: 'bar', data,
        options: {
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                y: [{
                    stacked: false, 
                    beginAtZero: true, 
                    ticks: {stepSize: 0, min: 0, autoSkip: false}
                    
                }]
            }
        }         
    };
        
    return new Chart(ctx, config);

}


