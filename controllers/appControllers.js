const App = require("../models/appModel");

const getApp = async (req, res) => {
  const app = await App.find();
  res.status(200).json(app);
};

const addApp = async (req, res, next) => {
  try {
    const { app, start = 0, end = 24 } = req.body;

    const appExist = await App.findOne({ app });

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

    if (!app) {
      throw new Error("App field is required");
    }

    if (app === "keepawakeheroku") {
      throw new Error("You can't delete this app");
    }

    const deleteApp = await App.findOne({ app });

    if (!deleteApp) {
      throw new Error("App not found");
    }

    await deleteApp.deleteOne();

    res
      .status(200)
      .json({ message: `${deleteApp.app} app deleted successfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = { getApp, addApp, deleteApp };
