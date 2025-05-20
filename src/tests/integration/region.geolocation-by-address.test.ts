import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import app from '../../app';
import { Region } from '../../models/region.model';

describe('GET /api/regions/geolocation-by-address', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/oz_map_db');
  });

  beforeEach(async () => {
    await Region.deleteMany({});

    await Region.create({
      name: 'Região Teste',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-46.7, -23.6],
          [-46.6, -23.6],
          [-46.6, -23.5],
          [-46.7, -23.5],
          [-46.7, -23.6]
        ]]
      }
    });
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should return the region containing the address', async () => {
    const res = await request(app)
      .get('/api/regions/geolocation-by-address')
      .query({ address: 'maceio' });

    expect(res.status).to.equal(200);
  });

  it('should return error 400 if address parameter is missing', async () => {
    const res = await request(app).get('/api/regions/geolocation-by-address');
    expect(res.status).to.equal(400);
  });
});
