import axios, { AxiosResponse } from 'axios';
import { PokemonItemAxios, PokemonListAxios } from '../../entity/axios/pokemon-list';
import { PokemonItem, PokemonList } from '../../entity/contracts/response/pokemon-list';

import { GetAllRequest } from '../../controllers/pokemon/request/get-all.request';

export const getList = async (req: GetAllRequest): Promise<PokemonList> => {
  const axiosResponse: AxiosResponse<PokemonListAxios> = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
    params: req,
  });

  const result: PokemonList = {
    count: axiosResponse.data.count,
    page: Number.parseInt(req.offset ? req.offset.toString() : '1', 10),
    totalPages: getTotalPages(axiosResponse.data.count, req.limit ?? 1),
    results: convertResult(axiosResponse.data.results),
  };
  return result;
};

const getTotalPages = (totalRecords: number, qtdPage: number): number => {
  return Math.floor(totalRecords / qtdPage);
};

const convertResult = (itens: PokemonItemAxios[]): PokemonItem[] => {
  return itens.map((x: PokemonItemAxios) => {
    const _t = x.url.split('/');
    return {
      id: parseInt(_t[_t.length - 2], 0),
      name: x.name,
    } as PokemonItem;
  });
};
