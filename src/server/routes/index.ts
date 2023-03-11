import { Router } from 'express';
import { PlatformController } from '../controllers/platform';
import { HotsiteController } from './../controllers';

const router = Router();

router.get('/platform', PlatformController.Get);
router.get('/hotsite', HotsiteController.GetValidation, HotsiteController.Get);

export { router };
