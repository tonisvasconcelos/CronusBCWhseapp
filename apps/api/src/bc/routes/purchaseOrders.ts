/**
 * Purchase Orders routes
 */

import { Router } from 'express';
import { bcClient } from '../bcClient.js';
import type { PurchaseOrder, PurchaseOrderLine } from '@cronusapp/shared';

const router = Router();

/**
 * GET /purchaseOrders
 * Get list of purchase orders with optional filtering and pagination
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await bcClient.get<PurchaseOrder>('purchaseOrders', req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /purchaseOrderLines
 * Get list of purchase order lines with optional filtering and pagination
 */
router.get('/lines', async (req, res, next) => {
  try {
    const result = await bcClient.get<PurchaseOrderLine>('purchaseOrderLines', req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
