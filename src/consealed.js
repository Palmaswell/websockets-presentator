function reveal () {
  const root = document.querySelector(':root');
  const svg = document.querySelector('.js_svg');
  const styles = window.getComputedStyle(root);
  const hexPaleRobin = styles.getPropertyValue('--hex-pale-robin');

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
      lerp.x += ((position.x - lerp.x) * 0.4);

      root.style.setProperty('--cx', lerp.x);
    }

    if (position.y !== written.y) {
      written.y = position.y;
      lerp.y += ((position.y - lerp.y) * 0.4);

      root.style.setProperty('--cy', lerp.y);
    }
    requestAnimationFrame(update);
  };
  update();

  const toggleColor = () => {
    if (styles.getPropertyValue('--hex-headline') === hexPaleRobin) {
      root.style.setProperty('--hex-headline', '#0F0D11');
      return;
    };
    root.style.setProperty('--hex-headline', hexPaleRobin);
  };

  const handleResize = () => {
    vp.width = root.getClientRects()[0].width;
    vp.height = root.getClientRects()[0].height;
    console.log(vp);
  }

  root.addEventListener('mousemove', handleMove,
    { passive: true });
  root.addEventListener('click', toggleColor);
  window.addEventListener('resize', handleResize);
};

reveal();
