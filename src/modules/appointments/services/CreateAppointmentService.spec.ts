import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const newAppointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 12),
      provider_id: '12222222',
      user_id: 'user 1',
    });

    expect(newAppointment).toHaveProperty('id');
  });

  it('should NOT be able to create two appointments at the same date/time', async () => {
    const appointmentDate = new Date(2020, 6, 27, 23);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12222222',
      user_id: 'user 1',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12222222',
        user_id: 'user 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an appointment on a past date', async () => {
    // Setting the date in the past
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '12222222',
        user_id: 'user 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an appointment with same user as provider', async () => {
    // Setting the date in the past
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: 'provider 1',
        user_id: 'provider 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an appointment before 8am and after 5pm', async () => {
    // Setting the date in the past
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: 'provider 1',
        user_id: 'user 1',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: 'provider 1',
        user_id: 'user 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
