import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllFromProviderInMonthDTO from '@modules/appointments/dtos/IFindAllFromProviderInMonthDTO';
import IFindAllFromProviderInDayDTO from '@modules/appointments/dtos/IFindAllFromProviderInDayDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment;
  }

  public async findAllFromProviderInMonth({
    provider_id,
    month,
    year,
  }: IFindAllFromProviderInMonthDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}`,
        ),
      },
    });

    return appointments;
  }

  public async findAllFromProviderInDay({
    provider_id,
    day,
    month,
    year,
  }: IFindAllFromProviderInDayDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}`,
        ),
      },
    });

    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const newAppointment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(newAppointment);
    return newAppointment;
  }
}

export default AppointmentsRepository;
