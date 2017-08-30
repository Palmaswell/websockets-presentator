const socket = io();

const handleOrientation = e => {
    const coordinate = {
      z: e.alpha,
      x: e.beta,
      y: e.gamma
    }

    socket.emit('orientation', coordinate);
}

socket.on('orientation', coordinate => {
    console.log('yeaa', coordinate);
})


window.addEventListener('deviceorientation', handleOrientation, true);