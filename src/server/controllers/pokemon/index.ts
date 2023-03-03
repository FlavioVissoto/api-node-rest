import * as get from './get';
import * as getAll from './get-all';
import * as getSprites from './get-sprites';
import * as getAllValidation from './validation/get-all.validation';
import * as getValidation from './validation/sprites.validation';

export const PokemonController = {
  ...getAll,
  ...get,
  ...getSprites,
  ...getValidation,
  ...getAllValidation,
};
