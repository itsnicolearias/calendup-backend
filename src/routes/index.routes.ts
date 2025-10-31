import { Router } from 'express';
import AuthRouter from './auth.routes';
import AppointmentRouter from './appointment.routes';
import SettingRouter from './settings.routes';
import ProfessionalRouter from './professional.routes';
import SubscriptionRouter from './subscription.route';
import { getSignedUrl } from '../modules/base/file-upload';

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  public async config() {
    this.router.use('/auth', AuthRouter);
    this.router.use('/appointments', AppointmentRouter); 
    this.router.use('/settings', SettingRouter); 
    this.router.use('/professionals', ProfessionalRouter); 
    this.router.get('/get-signed-url', getSignedUrl)
    this.router.use('/subscriptions', SubscriptionRouter)
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;