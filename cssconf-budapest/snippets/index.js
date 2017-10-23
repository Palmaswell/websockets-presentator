

const update = () => {

  root.style.setProperty('--cx', lerp.x);

  root.style.setProperty('--cy', lerp.y);

  requestAnimationFrame(update);
};
update();


const zAxisList = stars.map(el => {
  return window
    .getComputedStyle(el)
    .getPropertyValue('transform');
});



const update = () => {
  stars.forEach((el, i) => {
    el.style.setProperty('transform',
      `
        translate3d(
          ${motion.sine * 10}vw,
          0,
          ${motion.cosine * 100}vw)
          ${zAxisList[i]}
      `);
  });
  requestAnimationFrame(update);
};


const update = () => {
  root.style.setProperty('--sin',
    Math.round(Math.sin(time * Math.PI * 2) * 1000) / 1000);

  root.style.setProperty('--cos',
    Math.round(Math.cos(time * Math.PI * 2) * 1000) / 1000);

  requestAnimationFrame(update);
};




