import express from 'express';
import {
  createTour,
  getAllTours,
  getTourById,
  updateTourIdByPatch,
  deleteTour,
} from '../controllers/tourController';

const router = express.Router();

router.post('/', createTour);

router.get('/', getAllTours);

router.get('/:id', getTourById);

router.patch('/:id', updateTourIdByPatch);

router.delete('/:id', deleteTour);

export { router as tourRouter };
