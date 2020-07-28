import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider appointments on a specific day', async () => {
    const appointment_1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      user_id: 'user 1',
      date: new Date(2020, 4, 20, 14, 0, 0), // The months starts with zero 4 = May
    });

    const appointment_2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider 1',
      user_id: 'user 1',
      date: new Date(2020, 4, 20, 15, 0, 0), // The months starts with zero 4 = May
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider 1',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment_1, appointment_2]),
    );
  });
});
