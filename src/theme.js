function handleAmbientLight () {
  const sensor = new AmbientLightSensor();
  const theme = document.querySelector('.withTheme');
  sensor.start();

  sensor.onreading = e => {

    switch(e.currentTarget.activated) {
      case e.currentTarget.illuminance <= 8:
        console.log(e.currentTarget.illuminance <= 8, 'e.currentTarget.illuminance <= 8')
        theme.style.setProperty('--theme-invert', '1');
        break;
      case e.currentTarget.illuminance >= 9:
      default:
        console.log(e.currentTarget.illuminance >= 9, 'e.currentTarget.illuminance >= 9')
        theme.style.setProperty('--theme-invert', 'unset');
        break;
    }
  }
}
handleAmbientLight();
