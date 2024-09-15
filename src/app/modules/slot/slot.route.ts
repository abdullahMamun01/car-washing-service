import express from 'express';
import { SlotController } from './slot.controlle';
import { validateRequest } from '../../middleware/validateRequest';
import { updateSlotStatusSchema } from './solot.validation';
import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from '../user/user.constants';


const router = express.Router();

router.get('/availability' , SlotController.getAvailableSlots )
router.patch('/:slotId/updateStatus' , validateRequest(updateSlotStatusSchema) , authoRization(USER_ROLE.admin) , SlotController.updateSlotStatus )


export const slotRoutes = router;
