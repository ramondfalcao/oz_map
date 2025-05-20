import { Router } from 'express';
import * as RegionController from '../controllers/region.controller';
import * as GeolocationController from '../controllers/geolocation.controller';
import { validateBody } from '../middlewares/validateBody';
import { regionSchema } from '../validators/region.validator';
import { validateObjectId } from '../middlewares/validateObjectId';
import { validateQuery } from '../middlewares/validateQuery';
import { validateNearQuery } from '../middlewares/validateNearQuery';
import { getRegionsByAddress } from '../controllers/geolocation.controller';

const router = Router();

router.post('/', validateBody(regionSchema), RegionController.create);

router.get('/', RegionController.getAll);

router.get('/contains-point', validateQuery, RegionController.getRegionsByPoint);

router.get('/near', validateNearQuery, RegionController.getRegionsNearPoint);

router.get('/geolocation-by-address', GeolocationController.getRegionsByAddress);

router.get('/:id', validateObjectId, RegionController.getById);

router.put('/:id', validateObjectId, RegionController.update);

router.delete('/:id', validateObjectId, RegionController.remove);


export default router;