function confetti () {
  const socket = io();
  const root = document.querySelector(':root');
  const vpWidth = root.getClientRects()[0].width;
  const vpHeight = root.getClientRects()[0].height;

  let ticking = false;

  const handleMotion = e => {
    const position = {
      x: e.beta,
      y: e.gamma
    }
    handleTick(position);
  }

  const handleTick = (position) => {
    if (!ticking) {
      ticking = true;
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

      console.log(position);
      console.log(maxDegX, 'maxDegX');

      ticking = false;
    });
    socket.emit('position', position);
  }

  window.addEventListener('deviceorientation',
    handleMotion, { capture: true,  passive: true }
  );
};

confetti();
