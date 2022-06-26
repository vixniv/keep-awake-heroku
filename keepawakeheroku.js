const axios = require("axios").default;
const App = require("./models/appModel");

const keepAwakeHeroku = (urls) => {
  const timerID = setInterval(async () => {
    try {
      urls = await App.find();

      urls.forEach((url) => {
        const timeNow = new Date();
        let timeNowJakarta = timeNow.toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "numeric",
          hour12: false,
        });

        !url.start ? (url.start = 00) : url.start;
        !url.end ? (url.end = 24) : url.end;

        // handle if time range is minus, e.g. 18-06
        if (url.end - url.start < 0) {
          url.end += 24;
          if (timeNowJakarta < url.start) {
            timeNowJakarta += 24;
            // if (timeNowJakarta < url.end) {
            //   timeNowJakarta -= 24;
            // }
          }
        }

        if (url.start <= timeNowJakarta && url.end > timeNowJakarta) {
          // console.log(`Wake up https://${url.app}.herokuapp.com/`);
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

      // keepAwakeHeroku(urls);
    } catch (error) {
      console.log(error);
    }
  }, 29 * 60000); // ping every 29 minutes - 29 * 60000

  return timerID;
};

// const promises = urls.map((url) =>
//    axios.get(`https://${url.app}.herokuapp.com/`)
// );
// Promise.all(promises)

module.exports = keepAwakeHeroku;
