import axios, { AxiosResponse } from 'axios';

import { GetRequest } from '../../controllers/pokemon/request/get.request';
import { PokemonDetailsAxios } from '../../entity/axios/pokemon-details';
import { PokemonSpritesAxios } from '../../entity/axios/pokemon-sprites';

export const getSprites = async (req: GetRequest): Promise<PokemonSpritesAxios> => {
  const axiosResponse: AxiosResponse<PokemonDetailsAxios> = await axios.get(` https://pokeapi.co/api/v2/pokemon/${req.id}`, {
    params: req,
  });

  return axiosResponse.data.sprites;
};
