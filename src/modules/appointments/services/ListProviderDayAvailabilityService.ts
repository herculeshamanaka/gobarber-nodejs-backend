import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponseDTO = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequestDTO): Promise<IResponseDTO> {
    const appointments = this.appointmentsRepository.findAllFromProviderInDay({
      provider_id,
      day,
      month,
      year,
    });
    return [{ hour: 8, available: true }];
  }
}

export default ListProviderDayAvailabilityService;
