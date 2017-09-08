function handleAmbientLight () {
  const sensor = new AmbientLightSensor();
  sensor.start();

  sensor.onreading = e => console.log(e);
};

handleAmbientLight();
