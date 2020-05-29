let teacher = true;
var config = {
    openSocket: function (config) {
        var SIGNALING_SERVER = 'https://socketio-over-nodejs2.herokuapp.com:443/';

        config.channel = config.channel || location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
        var sender = Math.round(Math.random() * 999999999) + 999999999;

        io.connect(SIGNALING_SERVER).emit('new-channel', {
            channel: config.channel,
            sender: sender
        });

        var socket = io.connect(SIGNALING_SERVER + config.channel);
        socket.channel = config.channel;
        socket.on('connect', function () {
            if (config.callback) config.callback(socket);
        });

        socket.send = function (message) {
            socket.emit('message', {
                sender: sender,
                data: message
            });
        };

        socket.on('message', config.onmessage);
    },
    onRemoteStream: function (media) {
        var video = media.video;
        video.setAttribute('controls', true);
        console.log("onRemote");

        participants.insertBefore(video, participants.firstChild);

        video.play();
        //rotateVideo(video);
    },
    onRoomFound: function (room) {
        var alreadyExist = document.getElementById(room.broadcaster);
        if (alreadyExist) return;

        if (typeof roomsList === 'undefined') roomsList = document.body;

        var tr = document.createElement('tr');
        tr.setAttribute('id', room.broadcaster);
        tr.innerHTML = '<td><button class="join" id="' + room.roomToken + '">'+room.roomName+'</button></td>';
        roomsList.insertBefore(tr, roomsList.firstChild);

        tr.onclick = function () {
            tr = this;
            //console.log("Button Pressed");
            document.getElementById('conference-name').value = room.roomName;
            teacher = false;
            captureUserMedia(function () {
                broadcastUI.joinRoom({
                    roomToken: tr.querySelector('.join').id,
                    joinUser: tr.id
                });
            });
            hideUnnecessaryStuff();
        };

    }
};

function createButtonClickHandler() {
    captureUserMedia(function () {
        broadcastUI.createRoom({
            roomName: (document.getElementById('conference-name') || {}).value || 'Anonymous'
        });
    });
    hideUnnecessaryStuff();
}

function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
function captureUserMedia(callback) {
    var video = document.createElement('video');
    video.setAttribute('autoplay', true);
    video.setAttribute('controls', true);
    video.setAttribute('id', 'myVideo');
    //video.setAttribute('')
    participants.insertBefore(video, participants.firstChild);
    dynamicallyLoadScript('static/obj.js');

    getUserMedia({
        video: video,
        onsuccess: function (stream) {
            console.log("usermedia");
            config.attachStream = stream;
            callback && callback();
            video.setAttribute('muted', true);
            //rotateVideo(video);
        },
        onerror: function () {
            alert('unable to get access to your webcam.');
            callback && callback();
        }
    });
}

/* on page load: get public rooms */
var broadcastUI = broadcast(config);

/* UI specific */
var participants = document.getElementById("participants") || document.body;
var startConferencing = document.getElementById('start-conferencing');
var roomsList = document.getElementById('rooms-list');
if (startConferencing) startConferencing.onclick = createButtonClickHandler;
var inp = document.getElementById('conference-name');
inp.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        startConferencing.click();
    }
})
function hideUnnecessaryStuff() {
    document.body.style.background = "black";
    if (teacher == false) {
        document.getElementById('livestatus').style.display = "block";
    }
    else
    {
        document.getElementById('close').style.display = "block";
    }
    document.getElementById('participants').style.display = "block";
    document.body.style.overflow = "auto";
    var visibleElements = document.getElementsByClassName('visible'),
        length = visibleElements.length;
    for (var i = 0; i < length; i++) {
        visibleElements[i].style.display = 'none';
    }
}

// function rotateVideo(video) {
//     video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
//     setTimeout(function () {
//         video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
//     }, 1000);
// }

(function () {
    var uniqueToken = document.getElementById('unique-token');
    if (uniqueToken)
        if (location.hash.length > 2) uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;"><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
        else uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace(/\./g, '-');
})();
