var ctx = document.getElementById('myPieChart1').getContext('2d');
var ctx1 = document.getElementById('myPieChart2').getContext('2d');
var ctx2 = document.getElementById('myPieChart3').getContext('2d');
var ctx3 = document.getElementById('myPieChart4').getContext('2d');
var chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Drowing','Not Drowing'],
        datasets: [{
             backgroundColor: ['rgb(105, 99, 132)','rgb(255,0,0)'],
            data: [40,60]
        }
        ]
    },
    options: {}
});
var chart1 = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: ['Yawning','Not Yawning'],
        datasets: [{
             backgroundColor: ['rgb(255, 99, 132)','rgb(0,0,0)'],
            data: [30,70]
        }
        ]
    },
    options: {}
});
var chart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Looking at Screen','Not Screen'],
        datasets: [{
             backgroundColor: ['rgb(90, 99, 90)','rgb(10,50,80)'],
            data: [80,20]
        }
        ]
    },
    options: {}
});
var chart3 = new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: ['Time spent on tab','Not Active on Tab'],
        datasets: [{
             backgroundColor: ['rgb(80, 80, 132)','rgb(0,160,160)'],
            data: [10,90]
        }
        ]
    },
    options: {}
});