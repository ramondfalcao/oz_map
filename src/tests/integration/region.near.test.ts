import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import app from '../../app';
import { Region } from '../../models/region.model';

describe('GET /api/regions/near', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/oz_map_db');
  });

  beforeEach(async () => {
    await Region.deleteMany({});

    await Region.create({
      name: 'Região Distancia 1',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-60.1, -3.1],
          [-59.9, -3.1],
          [-59.9, -3.0],
          [-60.1, -3.0],
          [-60.1, -3.1]
        ]]
      }
    });

    await Region.create({
      name: 'Região Distancia 2 ( Longe )',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-50.0, -10.0],
          [-49.0, -10.0],
          [-49.0, -9.0],
          [-50.0, -9.0],
          [-50.0, -10.0]
        ]]
      }
    });
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should only return the region close to the informed point', async () => {
    const res = await request(app).get('/api/regions/near?lat=-3.05&lng=-60.0&distance=5000');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
    expect(res.body[0].name).to.equal('Região Distancia 1');
});

it('should return 400 if parameters are missing or invalid', async () => {
  const res = await request(app).get('/api/regions/near?lat=-3.05&lng=-60.0');
  expect(res.status).to.equal(400);
});
});
