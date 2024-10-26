import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from '../user/user.constants';
import { analyticController } from './analytic.controller';

const router = express.Router();

 


router.get(
  '/service-overview',
  authoRization(USER_ROLE.admin) ,
  analyticController.serviceAnalyticOverView
);

router.get(
  '/revenue',
  authoRization(USER_ROLE.admin) ,
  analyticController.profitAnalytic
);
export const analyticRoutes = router;
