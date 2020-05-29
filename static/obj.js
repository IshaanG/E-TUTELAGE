
var person;
Swal.fire({
    input: 'text',
    inputPlaceholder: 'Enter your name here',
}).then(function (res) {
  if (res) {
    const sourceVideo = document.getElementById("myVideo");
    end = 0;
    const uploadWidth = 450;
    window.onbeforeunload = function () {
      return "Data will be lost if you leave the page, are you sure?";
    };

    person = res.value; console.log(person)
    var room = document.getElementById("conference-name").value;
    // var person = prompt("Please Enter your name");
    localStorage.setItem("$person$$$", person);
    console.log(localStorage.getItem("$person$$$"));
    const apiServer = "http://localhost:5000" + "/image";
    v = sourceVideo;
    console.log(v);
    let isPlaying = false,
      gotMetadata = false;

    let imageCanvas = document.createElement("canvas");
    let imageCtx = imageCanvas.getContext("2d");
    const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    let frameCount = 0;
    function colorGiver(val) {
      let r = 0,
        g = 255,
        b = 0;
      if (val < 0.5) {
        r = (255 / 0.5) * val;
        g = 255;
        b = 0;
      } else if (val >= 0.5) {
        r = 255;
        g = (255 / 0.5) * (1 - val);
        b = 0;
      }
      let arr = [r, g, b];
      return arr;
    }
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Drow",
            borderColor: "rgb(255, 99, 132)",
            data: []
          },
          {
            label: "Yawn",
            borderColor: "rgb(155, 199, 132)",
            data: []
          },
          {
            label: "Pos",
            borderColor: "rgb(155, 99, 232)",
            data: []
          }
        ]
      },
      options: {
        responsive: false
      }
    });
    var ct = 0;
    var test = 0;
    document.getElementById("close").onclick = function () { end = 1; }
    function postFile(file) {
      let docOpen = document.hidden;
      let formdata = new FormData();
      formdata.append("image", file);
      formdata.append("name", person);
      formdata.append("room", room);
      formdata.append("docopen", docOpen);
      formdata.append("teacher", teacher);
      formdata.append("end", end);
      if (end == 1) { console.log("Sending end with value 1"); }
      let xhr = new XMLHttpRequest();
      xhr.open("POST", apiServer, true);
      xhr.responseType = "json";
      xhr.send(formdata);
      xhr.onload = function () {
        console.log(this.status);
        if (this.status === 200) {
          var s = this.response.Dictionary;
          console.log(s);
          s = s[room];
          if (teacher == true) {
            //Teacher Code
            console.log("I am a teacher");
            var change1 = document.createElement("div");
            for (var key in s) {
              if (key != "class&") {
                var node = document.createElement("li");
                var c1, c2, c3;
                c1 = colorGiver(s[key]["lastavgdrow"]);
                c2 = colorGiver(s[key]["lastavgyawn"]);
                c3 = colorGiver(s[key]["lastavgpos"]);
                let color1 = `rgb(${c1[0]},${c1[1]},${c1[2]})`;
                let color2 = `rgb(${c2[0]},${c2[1]},${c2[2]})`;
                let color3 = `rgb(${c3[0]},${c3[1]},${c3[2]})`;
                var txt = document.createElement("label");
                txt.appendChild(document.createTextNode(key));
                var bt1 = document.createElement("button");
                bt1.setAttribute("id", "sbuttons");
                bt1.style.backgroundColor = color1;
                bt1.appendChild(document.createTextNode("Drow"));
                var bt2 = document.createElement("button");
                bt2.setAttribute("id", "sbuttons");
                bt2.style.backgroundColor = color2;
                bt2.appendChild(document.createTextNode("Yawn"));
                var bt3 = document.createElement("button");
                bt3.setAttribute("id", "sbuttons");
                bt3.style.backgroundColor = color3;
                bt3.appendChild(document.createTextNode("Pos"));
                node.appendChild(txt);
                node.appendChild(bt1);
                node.appendChild(bt2);
                node.appendChild(bt3);
                change1.appendChild(node);
              }
            }
            if (s[person]["update"] == 1) {
              chart.data.labels.push(ct);
              chart.data.datasets[0].data.push(s["class&"]["Cdrow"]);
              chart.data.datasets[1].data.push(s["class&"]["Cyawn"]);
              chart.data.datasets[2].data.push(s["class&"]["Cpos"]);
              chart.update();
              ct = ct + 5;
            }
          } else {
            console.log("I am a student");
            var change1 = document.createElement("div");
            var node = document.createElement("li");
            var c1, c2, c3;
            c1 = colorGiver(s[person]["lastavgdrow"]);
            c2 = colorGiver(s[person]["lastavgyawn"]);
            c3 = colorGiver(s[person]["lastavgpos"]);
            let color1 = `rgb(${c1[0]},${c1[1]},${c1[2]})`;
            let color2 = `rgb(${c2[0]},${c2[1]},${c2[2]})`;
            let color3 = `rgb(${c3[0]},${c3[1]},${c3[2]})`;
            var txt = document.createElement("label");
            txt.appendChild(document.createTextNode(person));
            var bt1 = document.createElement("button");
            bt1.setAttribute("id", "sbuttons");
            bt1.style.backgroundColor = color1;
            bt1.appendChild(document.createTextNode("Drow"));
            var bt2 = document.createElement("button");
            bt2.setAttribute("id", "sbuttons");
            bt2.style.backgroundColor = color2;
            bt2.appendChild(document.createTextNode("Yawn"));
            var bt3 = document.createElement("button");
            bt3.setAttribute("id", "sbuttons");
            bt3.style.backgroundColor = color3;
            bt3.appendChild(document.createTextNode("Pos"));
            //console.log(text);
            node.appendChild(txt);
            node.appendChild(bt1);
            node.appendChild(bt2);
            node.appendChild(bt3);
            change1.appendChild(node);
            if (s[person]["update"] == 1) {
              chart.data.labels.push(ct);
              chart.data.datasets[0].data.push(s[person]["lastavgdrow"]);
              chart.data.datasets[1].data.push(s[person]["lastavgyawn"]);
              chart.data.datasets[2].data.push(s[person]["lastavgpos"]);
              chart.update();
              ct = ct + 5;
            }
            //Now We Will be Adding Live Status code for students
            var live = document.getElementById("livestatus");
            var x1 = document.createElement("li");
            var x2 = document.createElement("li");
            var x3 = document.createElement("li");
            var x4 = document.createElement("li");
            var x5 = document.createElement("li");
            if (s[person]["drow"] == 1) {
              x1.appendChild(document.createTextNode("Drow: " + "Drowing"));
            } else {
              x1.appendChild(document.createTextNode("Drow: " + "Not Drowing"));
            }
            if (s[person]["yawn"] == 1) {
              x2.appendChild(document.createTextNode("Yawn: " + "Yawning"));
            } else {
              x2.appendChild(document.createTextNode("Yawn: " + "Not Yawning"));
            }
            if (s[person]["pos"] == 0) {
              x3.appendChild(
                document.createTextNode("Pos: " + "Looking at Screen")
              );
            } else {
              x3.appendChild(
                document.createTextNode("Pos: " + "Not Looking at Screen")
              );
            }
            x4.appendChild(
              document.createTextNode("Number: " + s[person]["number"])
            );
            x5.appendChild(
              document.createTextNode("Paused: " + s[person]["paused"])
            );
            // console.log(x);
            live.innerHTML = "";
            live.appendChild(x1);
            live.appendChild(x2);
            live.appendChild(x3);
            live.appendChild(x4);
            live.appendChild(x5);
          }
          // console.log(change1);
          document.getElementById("students").innerHTML = "";
          document.getElementById("students").appendChild(change1);
          imageCtx.drawImage(
            v,
            0,
            0,
            v.videoWidth,
            v.videoHeight,
            0,
            0,
            uploadWidth,
            uploadWidth * (v.videoHeight / v.videoWidth)
          );
          setTimeout(function () {
            if (s['class&']['ClassEndTime'] == 0) {
              imageCanvas.toBlob(postFile, "image/jpeg");
            }
            else {
              let xhr = new XMLHttpRequest();
              xhr.open("POST", "http://localhost:5500/result", true);
              let formdata = new FormData();
              formdata.append("name", person);
              formdata.append("room", room);
              formdata.append("data", JSON.stringify(s));
              xhr.responseType = "json";
              xhr.send(formdata);
              console.log(xhr.status);
              xhr.onload = function () {
                console.log(this.status);
                if (this.status == 200) {
                  console.log("working");
                  window.location.href = "http://localhost:5500/new"
                }
              }
              console.log("Session Ended by Teacher");
            }
          }, 50);
        } else {
          console.error(xhr);
          rooms[room][name]["number"] = number;
        }
      };
    }

    function startObjectDetection() {
      console.log("starting object detection");
      imageCanvas.width = uploadWidth;
      imageCanvas.height = uploadWidth * (v.videoHeight / v.videoWidth);
      imageCtx.drawImage(
        v,
        0,
        0,
        v.videoWidth,
        v.videoHeight,
        0,
        0,
        uploadWidth,
        uploadWidth * (v.videoHeight / v.videoWidth)
      );
      imageCanvas.toBlob(postFile, "image/jpeg");
    }

    v.onloadedmetadata = () => {
      console.log("video metadata ready");
      gotMetadata = true;
      if (isPlaying) startObjectDetection();
    };
    console.log(isPlaying);
    console.log(gotMetadata);
    startObjectDetection();
    v.onplaying = () => {
      console.log("video playing");
      isPlaying = true;
      if (gotMetadata) {
        startObjectDetection();
      }
    };

    console.log("Confirmed");
  }
})
//person = prompt("Enter your name here");
