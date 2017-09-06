function trainedPup () {
  const socket = io();
  const root = document.querySelector(':root');
  const vpWidth = root.getClientRects()[0].width;
  const vpHeight = root.getClientRects()[0].height;

  let ticking = false;

  const handleMotion = e => {
    const orientation = {
      x: e.beta,
      y: e.gamma
    }
    handleTick(orientation);
  }

  const handleTick = (orientation) => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        update(orientation);
      });
    }
  };

  const update = (orientation) => {
    socket.on('orientation', orientation => {

      root.style.setProperty('--x', orientation.x / 2);
      root.style.setProperty('--y', orientation.y);

      console.log(orientation);

      ticking = false;
    });
    socket.emit('orientation', orientation);
  }

  window.addEventListener('deviceorientation',
    handleMotion, { passive: true }
  );
};

trainedPup();
