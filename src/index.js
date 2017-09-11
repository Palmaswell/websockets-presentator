function trainedLion () {
  const socket = io();
  const root = document.querySelector(':root');

  const handleMotion = e => {
    const position = {
      x: e.beta,
      y: e.gamma,
      ticking: false
    }
    handleTick(position);
  }

  const handleTick = (position) => {
    if (!position.ticking) {
      position.ticking = true;
      requestAnimationFrame(() => {
        update(position);
      });
    }
  };

  const update = (position) => {
    socket.on('position', position => {
      const maxDegX = position.x < 0 ? -180 : 180;
      const maxDegY = position.y < 0 ? -90 : 90;

      position.x = (position.x / maxDegX) * 2 - 1;
      position.y = (position.y / maxDegY) * 2 - 1;

      root.style.setProperty('--x', position.y);
      root.style.setProperty('--y', position.x);

      position.ticking = false;
    });
    socket.emit('position', position);
  }

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
