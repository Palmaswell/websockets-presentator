function galaxy () {
  const root = document.querySelector(':root');
  const motion = {
    time: 0,
    step: 0.01
  };
  const angle = {
    sin: 0,
    cos: 0
  };

  const update = () => {
    motion.time = (motion.time + 0.001) % 1;
    angle.sin = Math.sin(motion.time * Math.PI * 2);
    angle.cos = Math.cos(motion.time * Math.PI * 2);

    root.style.setProperty('--sin', angle.sin);
    root.style.setProperty('--cos', angle.cos);
    requestAnimationFrame(update);
  };

  update();
};

galaxy();
