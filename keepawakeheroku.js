const axios = require("axios").default;

const keepAwakeHeroku = (urls) => {
  setTimeout(() => {
    const timeNow = new Date();
    const timeNowJakarta = timeNow.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "numeric",
      hour12: false,
    });

    urls.forEach((url) => {
      !url.start ? (url.start = 00) : url.start;
      !url.end ? (url.end = 24) : url.end;

      if (url.start <= timeNowJakarta && url.end > timeNowJakarta) {
        axios
          .get(`https://${url.app}.herokuapp.com/`)
          .then(() => {
            console.log(`Wake up https://${url.app}.herokuapp.com/`);
          })
          .catch(() => {
            console.log(`Error waking up https://${url.app}.herokuapp.com/`);
          });
      } else {
        console.log(`Still dreaming https://${url.app}.herokuapp.com/`);
      }
    });

    keepAwakeHeroku(urls);
  }, 29 * 60000); // ping every 29 minutes - 29 * 60000
};

// const promises = urls.map((url) =>
//    axios.get(`https://${url.app}.herokuapp.com/`)
// );
// Promise.all(promises)

module.exports = keepAwakeHeroku;
