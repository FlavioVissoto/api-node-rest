import { Router } from 'express';
import { PokemonController } from './../controllers/index';

const router = Router();

router.get('/', PokemonController.get);
router.get('/getall', PokemonController.getAll);

export { router };
