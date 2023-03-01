import * as get from './get';
import * as getAll from './get-all';
import * as getAllValidation from './validation/get-all.validation';

export const PokemonController = {
  ...getAll,
  ...get,
  ...getAllValidation,
};
