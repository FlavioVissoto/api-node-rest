import * as get from './get';
import * as getAll from './get-all';

export const PokemonController = {
  ...getAll,
  ...get,
};
