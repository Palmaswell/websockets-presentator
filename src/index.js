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
      const motion = {
        x: orientation.x,
        y: orientation.y,
        targetY: 90
      }

      if(motion.y < -1) {
        motion.targetY = -90
      }

      root.style.setProperty('--x', motion.x);
      root.style.setProperty('--y', motion.y);
      root.style.setProperty('--targetY', motion.targetY);

      console.log(motion);

      ticking = false;
    });
    socket.emit('orientation', orientation);
  }

  window.addEventListener('deviceorientation',
    handleMotion, { passive: true }
  );
};

trainedPup();
