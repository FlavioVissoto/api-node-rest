import * as userSignIn from './signin';
import * as userSignUp from './signup';

export const UserController = {
  ...userSignUp,
  ...userSignIn,
};
