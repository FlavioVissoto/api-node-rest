export interface PokemonListAxios {
  count: number;
  next: string;
  previous: string;
  results: PokemonItemAxios[];
}

export interface PokemonItemAxios {
  name: string;
  url: string;
}
