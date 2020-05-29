//Get camera video
const constraints = {
    audio: false,
    video: {
        width: { min: 400, ideal: 400, max: 400 },
        height: { min: 400, ideal: 400, max: 400 }
    }
};

navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        document.getElementById("myVideo").srcObject = stream;
        console.log("Got local user video");

    })
    .catch(err => {
        console.log('navigator.getUserMedia error: ', err)
    });