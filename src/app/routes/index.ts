import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { servicesRoutes } from '../modules/carWashService/carWashService.route';
import { slotRoutes } from '../modules/slot/slot.route';
import { bookingRoutes } from '../modules/booking/booking.route';
import { myBookingRoute } from '../modules/myBooking/my-booking.route';
import { paymentRoutes } from '../modules/payment/payment.route';
import { analyticRoutes } from '../modules/analytics/analytic.route';

const router = Router();

const routes = [
  {
    path: '/',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/services',
    route: servicesRoutes,
  },
  {
    path: '/slots',
    route: slotRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
  {
    path: '/my-bookings',
    route: myBookingRoute,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
  {
    path: '/analytics',
    route: analyticRoutes,
  },

];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});
export default router;
