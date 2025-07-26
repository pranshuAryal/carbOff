import Emission from "../models/Emission.js";

export const createEmission = async (req, res) => {
  try {
    const { method, date, location, amount, result } = req.body;
    const emission = new Emission({ method, date, location, amount, result });
    await emission.save();
    res.status(201).json({ message: 'Emission saved', emission });
  } catch (error) {
    res.status(500).json({ message: 'Error saving emission', error });
  }
};
