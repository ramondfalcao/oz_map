import { expect } from 'chai';
import sinon from 'sinon';
import * as RegionService from '../../services/region.service';
import { Region } from '../../models/region.model';

describe('Unit - Region Service - CRUD', () => {
  afterEach(() => sinon.restore());

  it('must create a region', async () => {
    const fakeData = { name: 'Test', geometry: { type: 'Polygon', coordinates: [] } };
    const stub = sinon.stub(Region, 'create').resolves(fakeData as any);

    const result = await RegionService.createRegion(fakeData);
    expect(result.name).to.equal('Test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should return all regions', async () => {
    const stub = sinon.stub(Region, 'find').resolves([{ name: 'R1' }] as any);

    const result = await RegionService.getAllRegions();
    expect(result).to.be.an('array');
    expect(stub.calledOnce).to.be.true;
  });
});

describe(' Unit - Region Service - findRegionsNearPoint', () => {
  afterEach(() => sinon.restore());

  it('should return nearby regions based on coordinates and distance', async () => {
    const mockRegions = [{ name: 'Região A' }, { name: 'Região B' }];
    const stub = sinon.stub(Region, 'find').resolves(mockRegions as any);

    const result = await RegionService.findRegionNearPoint(-3, -60, 1000);

    expect(stub.calledOnce).to.be.true;
    expect(result).to.deep.equal(mockRegions);
  });
});

describe('Unit - Region Service - findRegionsContainingPoint', () => {
  afterEach(() => sinon.restore());

  it('should return regions that contain the point', async () => {
    const mockRegions = [
      { name: 'Região 1' },
      { name: 'Região 2' }
    ];

    const stub = sinon.stub(Region, 'find').resolves(mockRegions as any);

    const result = await RegionService.findRegionsContainingPoint(2, 1);
    expect(result).to.deep.equal(mockRegions);
    expect(stub.calledOnce).to.be.true;
  });

  it('should return an empty array if no region is found', async () => {
    sinon.stub(Region, 'find').resolves([] as any);
    const result = await RegionService.findRegionsContainingPoint(0, 0);
    expect(result).to.deep.equal([]);
  });
});
