import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider day availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 8, 0, 0), // The months starts with zero 4 = May
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 10, 0, 0), // The months starts with zero 4 = May
    });

    const availability = listProviderDayAvailability.execute({
      provider_id: 'provider 1',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, availabe: false },
        { hour: 9, availabe: true },
        { hour: 10, availabe: false },
        { hour: 11, availabe: true },
      ]),
    );
  });
});
