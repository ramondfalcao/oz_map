import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import app from '../../app';
import { Region } from '../../models/region.model';

describe('Integration - GET /api/regions/contains-point', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/oz_map_db');
  });

  beforeEach(async () => {
    await Region.deleteMany({});

    // Região A - Area Maior
    await Region.create({
      name: 'Região A',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-50, -10],
          [-40, -10],
          [-40, 0],
          [-50, 0],
          [-50, -10]
        ]]
      }
    });

    // Região B - Área menor dentro da região B
    await Region.create({
      name: 'Região B',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-45, -5],
          [-44, -5],
          [-44, -4],
          [-45, -4],
          [-45, -5]
        ]]
      }
    });
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should only return Region A to point outside B', async () => {
    const res = await request(app).get('/api/regions/contains-point?lat=-1&lng=-49');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
    expect(res.body[0].name).to.equal('Região A');
  });

  it('must return Region A and B to point within the two', async () => {
    const res = await request(app).get('/api/regions/contains-point?lat=-4.5&lng=-44.5');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    const names = res.body.map((r: any) => r.name);
    expect(names).to.include('Região A');
    expect(names).to.include('Região B');
  });

  it('should return 400 for invalid coordinates', async () => {
    const res = await request(app).get('/api/regions/contains-point?lat=abc&lng=123');
    expect(res.status).to.equal(400);
  });
});
