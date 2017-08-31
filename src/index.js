function trainedPup () {
  const socket = io();
  const root = document.querySelector(':root');
  const vpWidth = root.getClientRects()[0].width;
  const vpHeight = root.getClientRects()[0].height;

  let ticking = false;

  const handleCoordinate = e => {
    const coordinate = {
      z: e.alpha,
      x: e.beta,
      y: e.gamma
    }
    handleTick(coordinate);
  }

  const handleTick = (coordinate) => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        update(coordinate);
      });
    }
  };

  const update = (coordinate) => {
    socket.on('orientation', coordinate => {
      const motion = {
        z: coordinate.z / vpHeight,
        x: coordinate.x / vpHeight,
        y: coordinate.y / vpHeight,
      }
      root.style.setProperty('--z', motion.z);
      root.style.setProperty('--x', motion.x);
      root.style.setProperty('--y', motion.y);

      ticking = false;
    });
    socket.emit('orientation', coordinate);
  }

  window.addEventListener('deviceorientation',
    handleCoordinate,
    { passive: true }
  );
  window.addEventListener('devicemotion',
  (e) => {
    console.log('device motion', e.acceleration.x)
  }, { passive: true }
);
};

trainedPup();
