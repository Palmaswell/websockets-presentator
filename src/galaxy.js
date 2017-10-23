function galaxy () {
  const socket = io();

  const root = document.querySelector(':root');
  const vpWidth = root.getClientRects()[0].width;
  const vpHeight = root.getClientRects()[0].height;

  const motion = {
    x: 0,
    y: 0
  };
  const written = {
    x: 0,
    y: 0
  };

  let time = 0;

  const handleMouseMove = e => {
    motion.x = ~~(((e.clientX / vpWidth) * 2 - 1) * 100) / 100;
    motion.y = ~~(((e.clientY / vpHeight) * 2 - 1) * 100) / 100;
  }

  const handleOrientation = e => {
    motion.x = ~~(((e.alpha / 360) * 2 - 1) * 100) / 100;
    motion.y = ~~(((e.beta / 180) * 2 - 1) * 100) / 100;

  }

  const update = () => {
    //-- Stars Rotation
    time = (time + 0.001) % 1;
    root.style.setProperty('--sin',
      Math.round(Math.sin(time * Math.PI * 2) * 1000) / 1000
    );
    root.style.setProperty('--cos',
      Math.round(Math.cos(time * Math.PI * 2) * 1000) / 1000
    );

    //-- Handle Motion
    root.style.setProperty('--x', motion.x);
    root.style.setProperty('--y', motion.y);
    socket.emit('motion', motion);

    requestAnimationFrame(update);
  };

  update();

  root.addEventListener('mousemove',
    handleMouseMove,
    { capture: true, passive: true });

  socket.on('motion', data => {
    motion.x = data.x;
    motion.y = data.y;
  });

  window.addEventListener('deviceorientation',
    handleOrientation,
    { passive: true });
};

galaxy();
