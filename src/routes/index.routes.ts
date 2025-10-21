import { Router } from 'express';
import AuthRouter from './auth.routes';
import AppointmentRouter from './appointment.routes';
import SettingRouter from './settings.routes';
import ProfessionalRouter from './professional.routes';
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

    this.router.get("/health", (_req, res) => {
      res.json({ status: "ok" })
    })

  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;