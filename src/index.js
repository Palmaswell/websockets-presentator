function trainedPup () {
  const socket = io();
  const root = document.querySelector(':root');
  const vpWidth = root.getClientRects()[0].width;
  const vpHeight = root.getClientRects()[0].height;

  let ticking = false;

  const handleMotion = e => {
    const acceleration = {
      z: e.acceleration.x,
      x: e.acceleration.y,
      y: e.acceleration.z
    }
    handleTick(acceleration);
  }

  const handleTick = (acceleration) => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        update(acceleration);
      });
    }
  };

  const update = (acceleration) => {
    socket.on('orientation', acceleration => {
      const motion = {
        z: acceleration.z,
        x: acceleration.x,
        y: acceleration.y,
      }
      root.style.setProperty('--z', motion.z);
      root.style.setProperty('--x', motion.x);
      root.style.setProperty('--y', motion.y);

      console.log(acceleration);

      ticking = false;
    });
    socket.emit('orientation', acceleration);
  }

  window.addEventListener('devicemotion',
    handleMotion, { passive: true }
  );
  // window.addEventListener('deviceorientation',
  //   handleMotion,
  //   { passive: true }
  // );
};

trainedPup();
