

window.addEventListener('deviceorientation',
  handleMotion, { passive: true }
);

const orientation = {
  z: e.alpha, //-- 0 to 360deg
  x: e.beta, //-- -180 to 180deg
  y: e.gamma //-- -90 to 90 deg
 }


