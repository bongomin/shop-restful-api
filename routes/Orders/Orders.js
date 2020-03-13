const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../../models/Oder');
const product = require('../../models/Products')

/****importing controllers***/
const { get_all_Orders,
   add_Order_Post,
   fetch_Order_By_Order_id,
   delete_Order_by_id
} = require('../../controllers/Orders');

// Routes that fetches all the orders 
router.get('/', get_all_Orders);
//Route that handles post orders
router.post('/', add_Order_Post);
// Route thatfetches a single order 
router.get('/:id', fetch_Order_By_Order_id);
// Route that Handles delete of  order
router.delete('/:id', delete_Order_by_id);
module.exports = router;