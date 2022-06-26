const App = require("../models/appModel");

const getApp = async (req, res) => {
  const app = await App.find();
  res.status(200).json(app);
};

const addApp = async (req, res, next) => {
  try {
    const { app, start = 0, end = 24 } = req.body;

    const appExist = await App.findOne({ app });
    // console.log(appExist);
    if (appExist) {
      throw new Error("App already exist");
    }

    if (!app) {
      throw new Error("App field is required");
    }

    const newApp = new App({ app, start, end });
    await newApp.save();

    res.status(200).json({
      message: `App added successfully`,
      app: newApp.app,
      start: newApp.start,
      end: newApp.end,
    });
  } catch (error) {
    next(error);
  }
};

const deleteApp = async (req, res, next) => {
  try {
    const { app } = req.body;
    const deleteApp = await App.findOne({ app });

    if (!app) {
      throw new Error("App field is required");
    }

    if (!deleteApp) {
      throw new Error("App not found");
    }

    // console.log(app);
    // console.log(deleteApp);

    await deleteApp.deleteOne();

    res
      .status(200)
      .json({ message: `${deleteApp.app} app deleted successfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = { getApp, addApp, deleteApp };
