import mongoose, { Schema, model, models } from "mongoose";

const educationSchema = new Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, required: true },
}, { timestamps: true });

export default models.Education || model("Education", educationSchema);
