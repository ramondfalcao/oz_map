import request from 'supertest';
import { expect } from 'chai';
import app from '../../app';
import mongoose from 'mongoose';

let createdRegionId: string;

const regionPayloadMock = {
  name: 'Região Teste',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-60.0, -3.0],
        [-59.0, -3.0],
        [-59.0, -2.0],
        [-60.0, -2.0],
        [-60.0, -3.0]
      ]
    ]
  }
};

describe('Integration - Region API CRUD', () => {
  before((done) => {
    mongoose.connection.readyState === 1
      ? done()
      : mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/oz_map_db')
          .then(() => done())
          .catch(done);
  });

  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it('POST /api/regions - must create a new region', async () => {
    const res = await request(app)
      .post('/api/regions')
      .send(regionPayloadMock)
      .expect(201);

    expect(res.body).to.have.property('_id');
    expect(res.body.name).to.equal(regionPayloadMock.name);
    createdRegionId = res.body._id;
  });

  it('GET /api/regions - should return all regions', async () => {
    const res = await request(app)
      .get('/api/regions')
      .expect(200);

    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('geometry');
  });

  it('GET /api/regions/:id - must return a specific region', async () => {
    const res = await request(app)
      .get(`/api/regions/${createdRegionId}`)
      .expect(200);

    expect(res.body._id).to.equal(createdRegionId);
  });

  it('PUT /api/regions/:id - must update the region', async () => {
    const updated = { ...regionPayloadMock, name: 'Updated Region' };

    const res = await request(app)
      .put(`/api/regions/${createdRegionId}`)
      .send(updated)
      .expect(201);

    expect(res.body.name).to.equal('Updated Region');
  });

  it('DELETE /api/regions/:id - must delete the region', async () => {
    const res = await request(app)
      .delete(`/api/regions/${createdRegionId}`)
      .expect(200);

    expect(res.body).to.have.property('message', 'Deleted region!');
  });
});
