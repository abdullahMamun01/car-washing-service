import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import userRegisterValidationSchema, {
  updateUserValidateSchema,
  userRoleSchema,
} from './user.validation';
import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from './user.constants';
import feedbackSchema from '../feedback/feedback.validation';
import { feedbackController } from '../feedback/feedback.controller';

const router = express.Router();
router.get(
  '/users',

  authoRization(USER_ROLE.admin),
  userController.getAllUserController,
);

router.get(
  '/me',
  authoRization(USER_ROLE.user),
  userController.getSingleUserController,
);
router.get('/users/feedback', feedbackController.getAllFeedback);
router.post(
  '/signup',
  validateRequest(userRegisterValidationSchema),
  userController.signupController,
);
router.post(
  '/users/feedback',
  validateRequest(feedbackSchema),
  authoRization(USER_ROLE.user),
  feedbackController.createFeedback,
);
router.put(
  '/users/:userId/role',
  validateRequest(userRoleSchema),
  authoRization(USER_ROLE.admin),
  userController.updateUserRoleController,
);

router.put(
  '/me/update-profile',
  validateRequest(updateUserValidateSchema),
  authoRization(USER_ROLE.user),
  userController.updateProfileController,
);

export const userRoutes = router;
