// START JENNA ADDITIONS FOR POPULAITNG MENU  1 of 2//
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
// END JENNA ADDITIONS FOR POPULATING MENU 1 of 2///


// d3.json("http://127.0.0.1:5000/data").then(function(data) {
//     console.log(data);
// });

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
            y: {
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

var labels = ['2007-12',
'2008-01',
'2008-02',
'2008-03',
'2008-04',
'2008-05',
'2008-06',
'2008-07',
'2008-08',
'2008-09',
'2008-10',
'2008-11',
'2008-12',
'2009-01',
'2009-02',
'2009-03',
'2009-04',
'2009-05',
'2009-06',
'2009-07',
'2009-08',
'2009-09',
'2009-10',
'2009-11',
'2009-12',
'2010-01',
'2010-02',
'2010-03',
'2010-04',
'2010-05',
'2010-06',
'2010-07',
'2010-08',
'2010-09',
'2010-10',
'2010-11',
'2010-12',
'2011-01',
'2011-02',
'2011-03',
'2011-04',
'2011-05',
'2011-06',
'2011-07',
'2011-08',
'2011-09',
'2011-10',
'2011-11',
'2011-12',
'2012-01',
'2012-02',
'2012-03',
'2012-04',
'2012-05',
'2012-06',
'2012-07',
'2012-08',
'2012-09',
'2012-10',
'2012-11',
'2012-12',
'2013-01',
'2013-02',
'2013-03',
'2013-04',
'2013-05',
'2013-06',
'2013-07',
'2013-08',
'2013-09',
'2013-10',
'2013-11',
'2013-12',
'2014-01',
'2014-02',
'2014-03',
'2014-04',
'2014-05',
'2014-06',
'2014-07',
'2014-08',
'2014-09',
'2014-10',
'2014-11',
'2014-12',
'2015-01',
'2015-02',
'2015-03',
'2015-04',
'2015-05',
'2015-06',
'2015-07',
'2015-08',
'2015-09',
'2015-10',
'2015-11',
'2015-12',
'2016-01',
'2016-02',
'2016-03',
'2016-04',
'2016-05',
'2016-06',
'2016-07',
'2016-08',
'2016-09',
'2016-10',
'2016-11',
'2016-12',
'2017-01',
'2017-02',
'2017-03',
'2017-04',
'2017-05',
'2017-06',
'2017-07',
'2017-08',
'2017-09',
'2017-10',
'2017-11',
'2017-12',
'2018-01',
'2018-02',
'2018-03',
'2018-04',
'2018-05',
'2018-06',
'2018-07',
'2018-08',
'2018-09',
'2018-10',
'2018-11',
'2018-12',
'2019-01',
'2019-02',
'2019-03',
'2019-04',
'2019-05',
'2019-06',
'2019-07',
'2019-08',
'2019-09',
'2019-10',
'2019-11',
'2019-12',
'2020-01',
'2020-02',
'2020-03',
'2020-04',
'2020-05',
'2020-06',
'2020-07',
'2020-08',
'2020-09',
'2020-10',
'2020-11',
'2020-12',
'2021-01',
'2021-02',
'2021-03',
'2021-04',
'2021-05',
'2021-06',
'2021-07']

var data = [98,
    197,
    221,
    221,
    225,
    223,
    284,
    378,
    333,
    286,
    372,
    268,
    332,
    215,
    191,
    266,
    336,
    327,
    225,
    385,
    248,
    183,
    187,
    175,
    273,
    154,
    123,
    228,
    176,
    192,
    254,
    278,
    288,
    273,
    204,
    192,
    247,
    159,
    223,
    209,
    238,
    221,
    253,
    228,
    219,
    188,
    193,
    145,
    296,
    150,
    133,
    232,
    193,
    195,
    257,
    280,
    182,
    170,
    189,
    192,
    311,
    117,
    132,
    170,
    170,
    156,
    217,
    199,
    147,
    141,
    139,
    169,
    236,
    172,
    104,
    186,
    149,
    238,
    260,
    242,
    247,
    242,
    269,
    103,
    229,
    128,
    141,
    190,
    158,
    135,
    205,
    238,
    200,
    198,
    154,
    146,
    251,
    195,
    129,
    165,
    175,
    222,
    204,
    199,
    193,
    180,
    192,
    176,
    258,
    151,
    164,
    154,
    193,
    220,
    199,
    153,
    164,
    128,
    125,
    128,
    222,
    130,
    105,
    185,
    170,
    214,
    163,
    136,
    232,
    199,
    180,
    123,
    236,
    139,
    127,
    148,
    189,
    186,
    175,
    234,
    202,
    188,
    124,
    166,
    267,
    119,
    134,
    196,
    135,
    228,
    63,
    70,
    115,
    376,
    384,
    399,
    368,
    252,
    239,
    290,
    240,
    439,
    352,
    194]

var ctx = document.getElementById('my3rdChart').getContext('2d');

var my3rdChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: "Number of Incidents",
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
        }]
    }   
});



// START JENNA ADDITIONS FOR POPULAITNG MENU  2 of 2//

// update All plots and data when dropdown menu is changed
function updatePlotly() {

      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      console.log(dataset);
};

//event listener for menu, run plot update when there is a change
d3.selectAll("#selDataset").on("change", updatePlotly); 

// END JENNA ADDITIONS FOR POPULAITNG MENU  2 of 2//