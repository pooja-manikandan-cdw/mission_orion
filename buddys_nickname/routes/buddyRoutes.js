const express = require('express');
const { BUDDY_ENDPOINT, BUDDY_EMPLOYEE_ID_ENDPOINT } = require('../constants/path.contants')

const {getAllBuddiesController, getBuddyController, addBuddyController, updateBuddyController,  deleteBuddyController }  = require('../controllers/buddyController')

const router = express.Router();

router.get(BUDDY_ENDPOINT, getAllBuddiesController);

router.get(BUDDY_EMPLOYEE_ID_ENDPOINT, getBuddyController);

router.post(BUDDY_ENDPOINT, addBuddyController);

router.patch(BUDDY_EMPLOYEE_ID_ENDPOINT, updateBuddyController)

router.delete(BUDDY_EMPLOYEE_ID_ENDPOINT, deleteBuddyController);

module.exports = router;