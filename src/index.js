function trainedLion () {
  const socket = io();
  const root = document.querySelector(':root');

  const position = {
    x: 0,
    y: 0
  }

  const written = {
    x: 0,
    y: 0
  }

  const handleMotion = e => {
    position.x = e.beta;
    position.y = e.gamma;
  }

  const update = () => {
    if (position.x !== written.x) {
      const maxDegX = position.x < 0 ? -180 : 180;
      written.x = position.x;

      root.style.setProperty('--y', (position.x / maxDegX) * 2 - 1);
    }
    if (position.y !== written.y) {
      const maxDegY = position.y < 0 ? -90 : 90;

      root.style.setProperty('--x', (position.y / maxDegY) * 2 - 1);
    }

    requestAnimationFrame(update);
    socket.emit('position', position);
  }

  update();

  window.addEventListener('deviceorientation',
    handleMotion, { capture: true,  passive: true }
  );

  window.addEventListener('mousemove', e => {
    const x = e.pageX / window.innerWidth * 2 - 1;
    const y = e.pageY / window.innerHeight * 2 - 1;
    root.style.setProperty('--x', x);
    root.style.setProperty('--y', y);
  },
  { capture: true,  passive: true });
};

trainedLion();
