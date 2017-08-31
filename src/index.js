function trainedPup () {
  const socket = io();

  const root = document.querySelector(':root');
  const vpWidth = root.getClientRects()[0].width;
  const vpheight = root.getClientRects()[0].height;

  const coordinate = {
    z: 0,
    x: 0,
    y: 0
  }
  let ticking = false;

  console.log(vpWidth, vpheight, coordinate, '#####');

  const handleOrientation = e => {
    coordinate.z = e.alpha;
    coordinate.x = e.beta;
    coordinate.y = e.gamma;

    handleTick();
  }

  const handleTick = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  const update = () => {
    socket.on('orientation', coordinate => {
        console.log(coordinate);
    });
    socket.emit('orientation', coordinate);
    ticking = false;
  }

  window.addEventListener('deviceorientation', 
    handleOrientation,
    { passive: true }
  );
};

trainedPup();