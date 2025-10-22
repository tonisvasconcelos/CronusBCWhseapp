/**
 * Environments routes
 */

import { Router } from 'express';
import { bcClient } from '../bcClient';

const router: Router = Router();

/**
 * GET /environments
 * Get list of available Business Central environments
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await bcClient.getEnvironments();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
