import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { geocodeAddress } from '../../services/geolocation.service';

describe('Unit - Geolocation Service - geocodeAddress', () => {
  afterEach(() => sinon.restore());

  it('must return coordinates from a valid address', async () => {
    const mockData = [{
      lat: '12.34',
      lon: '56.78'
    }];

    sinon.stub(axios, 'get').resolves({ data: mockData } as any);

    const coords = await geocodeAddress('Rua Exemplo, 123');
    expect(coords).to.deep.equal({ lat: 12.34, lng: 56.78 });
  });

  it('should throw error if address is not found', async () => {
    sinon.stub(axios, 'get').resolves({ data: [] } as any);

    try {
      await geocodeAddress('endereço inválido');
    } catch (err: any) {
      expect(err.message).to.equal('Address not found');
    }
  });
});
