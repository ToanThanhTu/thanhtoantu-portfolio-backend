import { Router } from 'express';
import { getAllTexts, createText } from '../controllers/textControllers';

const textRouter = Router();

textRouter.get('/', getAllTexts);
textRouter.post('/', createText);

export default textRouter;