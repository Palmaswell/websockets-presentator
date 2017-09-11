function confetti () {
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

      root.style.setProperty('--x', position.x);
      root.style.setProperty('--y', position.y);

      position.ticking = false;
    });
    socket.emit('position', position);
  }

  window.addEventListener('deviceorientation',
    handleMotion, { capture: true,  passive: true }
  );
};

confetti();
