import { Router } from 'express';
import { PokemonController } from './../controllers';

const router = Router();

//router.get('/pokemon', PokemonController.GetValidation, PokemonController.get);
router.get('/pokemon/sprites', PokemonController.GetSpritesValidation, PokemonController.getSprites);
router.get('/pokemon/getall', PokemonController.GetAllValidation, PokemonController.getAll);

export { router };
