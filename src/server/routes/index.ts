import { Router } from 'express';
import { PlatformController } from '../controllers/platform';
import { UserController } from '../controllers/user';
import { ensureAuthenticated } from '../shared/middleware';
import { HotsiteController } from './../controllers';

const router = Router();

router.get('/platform', ensureAuthenticated, PlatformController.Get);

router.get('/hotsite', ensureAuthenticated, HotsiteController.GetValidation, HotsiteController.Get);

router.post('/user/signup', ensureAuthenticated, UserController.getAllValidationSignUp, UserController.signUp);
router.post('/user/signin', UserController.getAllValidationSignIn, UserController.signIn);

export { router };
