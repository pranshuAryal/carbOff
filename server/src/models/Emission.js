import mongoose from "mongoose";

const emissionSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  result: {
    type: Number,
    required: true
  }
});

const Emission = mongoose.model('Emission', emissionSchema);

export default Emission;
