/**
 * Items routes
 */

import { Router } from 'express';
import { bcClient } from '../bcClient.js';
import type { Item, ItemCategory, ItemVariant, ItemLedgerEntry } from '@cronusapp/shared';

const router = Router();

/**
 * GET /items
 * Get list of items with optional filtering and pagination
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await bcClient.get<Item>('items', req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /itemCategories
 * Get list of item categories
 */
router.get('/categories', async (req, res, next) => {
  try {
    const result = await bcClient.get<ItemCategory>('itemCategories', req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /itemVariants
 * Get list of item variants
 */
router.get('/variants', async (req, res, next) => {
  try {
    const result = await bcClient.get<ItemVariant>('itemVariants', req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /itemLedgerEntries
 * Get list of item ledger entries
 */
router.get('/ledger-entries', async (req, res, next) => {
  try {
    const result = await bcClient.get<ItemLedgerEntry>('itemLedgerEntries', req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
