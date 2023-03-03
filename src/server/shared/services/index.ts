import * as getList from './pokemon-list';
import * as getSprites from './pokemon-sprites';

export const PokemonServices = {
  ...getList,
  ...getSprites,
};
