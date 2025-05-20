import { Schema, model } from 'mongoose';

const RegionSchema = new Schema({
  name: { type: String, required: true },
  geometry: {
    type: {
      type: String,
      enum: ['Polygon'],
      required: true,
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
    }
  }
});

RegionSchema.index({ geometry: '2dsphere' });

export const Region = model('Region', RegionSchema);