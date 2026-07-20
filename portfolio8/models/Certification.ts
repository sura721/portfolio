import mongoose, { Schema, model, models } from "mongoose";

const certificationSchema = new Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  verificationUrl: { type: String, default: "" },
}, { timestamps: true });

export default models.Certification || model("Certification", certificationSchema);
