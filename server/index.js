import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import {} from "dotenv/config";
import Price from "./models/prices.js";

// Port
const PORT = 5555;

// Here is database URL and API URL
const mongoString = process.env.DATABASE_URL;
const url = process.env.API_URL;

// Here I connect to my database on mongoDB
mongoose
  .connect(mongoString)
  .then(() => {
    console.log("DB OK");
  })
  .catch((error) => console.log("DB error", error));

const app = express();

// fetching data from APi and pushing it into database
axios
  .get(url)
  .then((response) => {
    onSuccess(response.data.prices);
  })
  .catch(function (error) {
    console.log(error);
  });

const onSuccess = (response) => {
  for (let i = 0; i < response.length; i++) {
    var price = response[i].price;
    var startDate = response[i].startDate;
    var endDate = response[i].endDate;

    assingDataValue(price, startDate, endDate);
  }
};

const assingDataValue = async (price, startDate, endDate) => {
  const isRowExists = await Price.isStartDateAlreadyExists(startDate);
  if (!isRowExists) {
    return;
  }
  var newPrice = new Price();
  newPrice.price = price;
  newPrice.startDate = startDate;
  newPrice.endDate = endDate;

  newPrice.save();
};

// getting all data from MongoDB
app.get("/allprices", (request, response) => {
  Price.find()
    .sort({ startDate: 1 })
    .then((prices) => response.json(prices))
    .catch((err) => response.json(err));
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Server OK");
});
