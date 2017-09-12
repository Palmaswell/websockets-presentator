function confetti () {
  const socket = io();
  const root = document.querySelector(':root');

  const position = {
    x: 0,
    y: 0,
  };

  const written = {
    x: 0,
    y: 0
  };

  const handleMotion = e => {
    position.x = Math.round(e.beta * 100) / 100;
    position.y = Math.round(e.gamma * 100) / 100;
  }


  const update = () => {
    if (position.x !== written.x) {
      const maxDegX = position.x < 0 ? -180 : 180;
      written.x = position.x;

      root.style.setProperty('--x', (position.x / maxDegX) * 2 - 1);
    }

    if (position.y !== written.y) {
      const maxDegY = position.y < 0 ? -90 : 90;
      written.y = position.y + .1;

      root.style.setProperty('--y', (position.y / maxDegY) * 2 - 1);
    }

    if (position.x !== written.x
      || position.y !== written.y) {
      socket.emit('position', position);
    }

    requestAnimationFrame(update);
  };

  update();

  socket.on('position', data => {
    position.x = data.x;
    position.y = data.y;
  });

  window.addEventListener('deviceorientation',
    handleMotion, { capture: true,  passive: true }
  );
};

confetti();
