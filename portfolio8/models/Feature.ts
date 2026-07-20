import mongoose, { Schema, model, models } from "mongoose";

const featureSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, default: "In Research" },
  },
  { timestamps: true }
);

export default models.Feature || model("Feature", featureSchema);
