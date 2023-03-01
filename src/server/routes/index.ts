import { Router } from 'express';
import { PokemonController } from './../controllers';

const router = Router();

router.get('/', PokemonController.get);
router.post('/getall', PokemonController.GetAllValidation, PokemonController.getAll);

export { router };
