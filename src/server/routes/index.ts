import { Router } from 'express';
import { PlatformController } from '../controllers/platform';
import { UserController } from '../controllers/user';
import { HotsiteController } from './../controllers';

const router = Router();

router.get('/platform', PlatformController.Get);

router.get('/hotsite', HotsiteController.GetValidation, HotsiteController.Get);

router.post('/user/signup', UserController.getAllValidationSignUp, UserController.signUp);
router.post('/user/signin', UserController.getAllValidationSignIn, UserController.signIn);

export { router };
