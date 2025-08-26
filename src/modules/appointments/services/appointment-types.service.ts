import { AppointmentType } from "../../../models/appointment_type";
import BaseService from "../../base/base.service";

class AppointmentTypeService extends BaseService<AppointmentType> {
  constructor() {
    super(AppointmentType);
  }
}

export default new AppointmentTypeService();