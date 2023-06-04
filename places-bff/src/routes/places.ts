import express from 'express';
import { defaultPlacesService } from '../services/places';

const router = express.Router();

router.get('/list', async (_req, res) => {
    const placesService = defaultPlacesService();
    const places = await placesService.listPlaces();

    res.json(places);
});

export default router;
