import { Router } from 'express';
import * as RegionController from '../controllers/region.controller';
import { validateBody } from '../middlewares/validateBody';
import { regionSchema } from '../validators/region.validator';
import { validateObjectId } from '../middlewares/validateObjectId';

const router = Router();

router.post('/', validateBody(regionSchema), RegionController.create);

router.get('/', RegionController.getAll);

router.get('/:id', validateObjectId, RegionController.getById);

router.put('/:id', validateObjectId, RegionController.update);

router.delete('/:id', validateObjectId, RegionController.remove);


export default router;