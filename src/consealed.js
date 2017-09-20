function reveal () {
  const root = document.querySelector(':root');
  const svg = document.querySelector('.js_svg');

  const vp = {
    width: root.getClientRects()[0].width,
    height: root.getClientRects()[0].height
  }

  const box = {
    width: svg.viewBox.baseVal.width,
    height: svg.viewBox.baseVal.height
  };

  const position = {
    x: 0,
    y: 0,
  };

  const written = {
    x: 0,
    y: 0
  };

  const lerp = {
    x: 0,
    y: 0
  }

  const handleMove = e => {
    position.x = (e.clientX / vp.width) * box.width;
    position.y = (e.clientY / vp.height) * box.height;
  };

  const update = () => {
    if (position.x !== written.x) {
      written.x = position.x;
      lerp.x += ((position.x - lerp.x) * 0.06);

      root.style.setProperty('--cx', lerp.x);
    }

    if (position.y !== written.y) {
      written.y = position.y;
      lerp.y += ((position.y - lerp.y) * 0.06);

      root.style.setProperty('--cy', lerp.y);
    }
    requestAnimationFrame(update);
  };
  update();

  root.addEventListener('mousemove', handleMove,
    { passive: true });
};

reveal();
