import { Router } from 'express';
import * as RegionController from '../controllers/region.controller';
import { validateBody } from '../middlewares/validateBody';
import { regionSchema } from '../validators/region.validator';

const router = Router();

router.post('/', validateBody(regionSchema), RegionController.create);

export default router;