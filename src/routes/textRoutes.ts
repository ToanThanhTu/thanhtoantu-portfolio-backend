import { Router } from 'express';
import { getAllTexts, createText } from '../controllers/textControllers';

const textRouter = Router();

textRouter.get('/texts', getAllTexts);
textRouter.post('/texts', createText);

export default textRouter;