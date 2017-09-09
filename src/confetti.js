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

      root.style.setProperty('--x', position.x / 2);
      root.style.setProperty('--y', position.y);

      console.log(position);

      ticking = false;
    });
    socket.emit('position', position);
  }

  window.addEventListener('deviceorientation',
    handleMotion, { passive: true }
  );
};

confetti();
