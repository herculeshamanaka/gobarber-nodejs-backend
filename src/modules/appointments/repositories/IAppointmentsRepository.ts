import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllFromProviderInMonthDTO from '@modules/appointments/dtos/IFindAllFromProviderInMonthDTO';
import IFindAllFromProviderInDayDTO from '@modules/appointments/dtos/IFindAllFromProviderInDayDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllFromProviderInMonth(
    data: IFindAllFromProviderInMonthDTO,
  ): Promise<Appointment[]>;
  findAllFromProviderInDay(
    data: IFindAllFromProviderInDayDTO,
  ): Promise<Appointment[]>;
}
