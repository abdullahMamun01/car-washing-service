import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import userRegisterValidationSchema from './user.validation';
import { z } from 'zod';

const router = express.Router();

// router.get('/')

router.post(
  '/signup',
  validateRequest(userRegisterValidationSchema),
  userController.signupController,
);

export const userRoutes = router;