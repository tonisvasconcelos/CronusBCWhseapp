/**
 * Vendors routes
 */

import { Router } from 'express';
import { bcClient } from '../bcClient';
import type { Vendor } from '@cronusapp/shared';

const router: Router = Router();

/**
 * GET /vendors
 * Get list of vendors with optional filtering and pagination
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await bcClient.get<Vendor>('vendors', req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
