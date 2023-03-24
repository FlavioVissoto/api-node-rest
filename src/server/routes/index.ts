import { HotsiteController } from './../controllers';
import { PlatformController } from '../controllers/platform';
import { Router } from 'express';
import { UserController } from '../controllers/user';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/platform', ensureAuthenticated, PlatformController.Get);

router.get('/hotsite', ensureAuthenticated, HotsiteController.GetValidation, HotsiteController.Get);

router.post('/user/signup', UserController.getAllValidationSignUp, UserController.signUp);
router.post('/user/signin', UserController.getAllValidationSignIn, UserController.signIn);

export { router };
