const als = require('ambient-light-sensor');

main();

const QUEUE = [];

function main() {
  setInterval(() => {
    if (QUEUE.length === 0) {
      const task = measure();
      QUEUE.push(task);
      task
        .then(data => data /* do something async here */)
        .then(data => {
          console.log(data);
          QUEUE.splice(QUEUE.indexOf(task), 1);
        });
    }
  }, 1000 / 60);
}

function measure() {
  return new Promise((resolve, reject) => {
    als((err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};
