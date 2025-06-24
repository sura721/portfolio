import mongoose, { Schema, model, models } from "mongoose";

const skillSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

export default models.Skill || model("Skill", skillSchema);
