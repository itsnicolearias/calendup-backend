import { Router } from 'express';
import AuthRouter from './auth.routes';
import AppointmentRouter from './appointment.routes';
import SettingRouter from './settings.routes';
import ProfessionalRouter from './professional.routes';

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
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;