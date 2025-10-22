/**
 * Locations routes
 */

import { Router } from 'express';
import { bcClient } from '../bcClient';
import type { Location } from '@cronusapp/shared';

const router: Router = Router();

/**
 * GET /locations
 * Get list of locations with optional filtering and pagination
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await bcClient.get<Location>('locations', req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
