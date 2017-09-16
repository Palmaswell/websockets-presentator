function trainedLion () {
  const socket = io();
  const root = document.querySelector(':root');

  const orientation = {
    x: 0,
    y: 0
  }

  const written = {
    x: 0,
    y: 0
  }

  const handleMotion = e => {
    orientation.x = Math.round(e.beta * 100) / 100;
    orientation.y = Math.round(e.gamma * 100) / 100;
  }

  const update = () => {
    if (orientation.x !== written.x) {
      const maxDegX = orientation.x < 0 ? -180 : 180;
      written.x = orientation.x;

      root.style.setProperty('--y', (orientation.x / maxDegX) * 2 - 1);
    }

    if (orientation.y !== written.y) {
      const maxDegY = orientation.y < 0 ? -90 : 90;

      root.style.setProperty('--x', (orientation.y / maxDegY) * 2 - 1);
    }

    if (orientation.x !== written.x
      || orientation.y !== written.y) {
      socket.emit('orientation', orientation);
    }

    requestAnimationFrame(update);
  }

  update();

  window.addEventListener('deviceorientation',
    handleMotion, { capture: true,  passive: true }
  );
  socket.on('orientation', (data) => {
    orientation.x = data.x;
    orientation.y = data.y;
  });

  window.addEventListener('mousemove', e => {
    const x = e.pageX / window.innerWidth * 2 - 1;
    const y = e.pageY / window.innerHeight * 2 - 1;
    root.style.setProperty('--x', x);
    root.style.setProperty('--y', y);
  },
  { capture: true,  passive: true });
};

trainedLion();
