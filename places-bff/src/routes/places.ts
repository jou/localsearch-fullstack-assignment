import express from 'express';
import { defaultPlacesService } from '../services/places';

const router = express.Router();

router.get('/list', async (_req, res, next) => {
    const placesService = defaultPlacesService();
    try {
        const places = await placesService.listPlaces();
        res.json(places);
        next();
    } catch (e) {
        next(e);
    }
});

router.get('/search', async (req, res, next) => {
    const searchQuery = req.query.q;
    if (typeof searchQuery !== 'string') {
        res.status(401).send('Missing query');
        next();
        return;
    }

    try {
        const placesService = defaultPlacesService();
        const searchResults = await placesService.searchPlaces(searchQuery);

        res.json(searchResults);
        next();
    } catch (e) {
        next(e);
    }
});

router.get('/:placeId', async (req, res, next) => {
    try {
        const placesService = defaultPlacesService();
        const result = await placesService.getPlaceDetails(req.params.placeId);

        if (result) {
            res.json(result);
        } else {
            res.status(404);
            res.send('Not found');
        }
        next();
    } catch (e) {
        next(e);
    }
});

export default router;
