import mongoose, { Schema, model, models } from "mongoose";

const experienceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateRange: { type: String },
  type: { type: String, required: true },
  icon: { type: String, required: true },
}, { timestamps: true });

export default models.Experience || model("Experience", experienceSchema);