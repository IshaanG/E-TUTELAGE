function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


var ctx = document.getElementById('myPieChart1').getContext('2d');
var ctx1 = document.getElementById('myPieChart2').getContext('2d');
var ctx2 = document.getElementById('myPieChart3').getContext('2d');
var ctx3 = document.getElementById('myPieChart4').getContext('2d');

let userdata;
let username;
let userroom;
xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:5500/getdata", true)
xhr.responseType = "json";
xhr.send();
xhr.onload = function () {
    if (this.status == 200) {
        userdata = this.response['data'];
        userdata = JSON.parse(userdata);
        username = localStorage.getItem("$person$$$");
        userroom = this.response['room'];
        console.log(userdata['class&']['ClassEndTime']);
        console.log(userdata['class&']['ClassEndTime']);
        chart.data.datasets[0].data = [userdata[username]['avgdrow'] * 100, 100 - userdata[username]['avgdrow'] * 100]
        chart1.data.datasets[0].data = [userdata[username]['avgyawn'] * 100, 100 - userdata[username]['avgyawn'] * 100]
        chart2.data.datasets[0].data = [userdata[username]['avgpos'] * 100, 100 - userdata[username]['avgpos'] * 100]
        chart3.data.datasets[0].data = [userdata[username]['avgdocopen'] * 100, 100 - userdata[username]['avgdocopen'] * 100]
        chart.update();
        chart1.update();
        chart2.update();
        chart3.update();
        var z = document.getElementById("mydata");
        time=userdata['class&']['ClassEndTime']-userdata['class&']['ClassStartTime']
        z.innerHTML = "<li>Lecture Time "+time/60.0+" minutes</li>"
    }
}

var chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Feeling Drow', 'Not drowsy'],
        datasets: [{
            backgroundColor: ['rgb(105, 99, 132)', 'rgb(255,0,0)'],
            data: [50, 50]
        }
        ]
    },
    options: {
        animation:{
            easing: 'easeInCirc',
            duration: 2200
        }
    }
});
var chart1 = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: ['Yawning', 'Not Yawning'],
        datasets: [{
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(0,0,0)'],
            data: [10, 90]
        }
        ]
    },
    options: {
        animation:{
            easing: 'easeInCirc',
            duration: 2200
        }
    }
});
var chart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Not Looking at Screen', 'Looking at Screen'],
        datasets: [{
            backgroundColor: ['rgb(90, 99, 90)', 'rgb(10,50,80)'],
            data: [10, 90]
        }
        ]
    },
    options: {
        animation:{
            easing: 'easeInCirc',
            duration: 2200
        }
    }
});
var chart3 = new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: ['Not Active on tab', 'Active on Tab'],
        datasets: [{
            backgroundColor: ['rgb(80, 80, 132)', 'rgb(0,160,160)'],
            data: [10, 90]
        }
        ]
    },
    options: {
        animation:{
            easing: 'easeInCirc',
            duration: 2200
        }
    }
});