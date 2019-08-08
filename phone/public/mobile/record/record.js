// const socket = io.connect('http://localhost:3000', { transports: ['websocket'] });
const socket = io();
let interval;
let phoneData = [];

let rotation = {
    x: '',
    y: '',
    z: ''
}

let acceleration = {
    x: '',
    y: '',
    z: ''
}

let counter = 0;

window.onload = function() {
    socket.emit('connected')

    function handleOrientation(e) {
        rotation.x = e.beta;
        rotation.y = e.gamma;
        rotation.z = e.alpha;
    }

    function handleMotion(e){
        acceleration.x = e.accelerationIncludingGravity.x;
        acceleration.y = e.accelerationIncludingGravity.y;
        acceleration.z = e.accelerationIncludingGravity.z;
    }
    
    window.addEventListener("deviceorientation", handleOrientation, true);
    window.addEventListener("devicemotion", handleMotion, true);

    document.body.addEventListener('touchstart', (e) => {
        interval = setInterval(function() {
            socket.emit('motion data', `START ${acceleration.x} ${acceleration.y} ${acceleration.z} ${rotation.x} ${rotation.y} ${rotation.z} END`)
        }, 10);
    })
}

document.body.addEventListener('touchend', (e) => {
    socket.emit('end motion data')
    clearInterval(interval);
});
