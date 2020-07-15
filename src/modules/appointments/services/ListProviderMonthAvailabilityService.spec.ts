import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider month availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 3, 20, 8, 0, 0), // The months starts with zero 4 = May
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 8, 0, 0), // The months starts with zero 4 = May
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = listProviderMonthAvailability.execute({
      provider_id: 'provider 1',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, availabe: true },
        { day: 20, availabe: false },
        { day: 21, availabe: true },
        { day: 22, availabe: true },
      ]),
    );
  });
});
