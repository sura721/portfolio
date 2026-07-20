import { Schema, model, models } from "mongoose";

const testimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  quote: { type: String, required: true },
  initials: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

export default models.Testimonial || model("Testimonial", testimonialSchema);
