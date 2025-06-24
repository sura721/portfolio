import mongoose, { Schema, model, models } from 'mongoose'

const projectSchema = new Schema({
  title: String,
  description: String,
  image: String,
  technologies: [String],
  liveUrl: String,
  githubUrl: String,
}, { timestamps: true })

export default models.Project || model('Project', projectSchema)
