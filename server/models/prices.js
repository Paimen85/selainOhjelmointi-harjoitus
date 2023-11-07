import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
  price: Number,
  startDate: Date,
  endDate: Date,
});

PriceSchema.statics.isStartDateAlreadyExists = async function(startDate)  {
  try {
    const price = await this.findOne({startDate:startDate});
    if (price) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("error inside isStartDateAlreadyExists method", error);
    return false;
  }
};

export default mongoose.model("Price", PriceSchema);
