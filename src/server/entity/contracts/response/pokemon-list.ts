export interface PokemonList {
  page: number;
  count: number;
  totalPages: number;
  results: PokemonItem[];
}

export interface PokemonItem {
  name: string;
  id: number;
}
