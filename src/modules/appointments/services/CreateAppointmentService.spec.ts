import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const newAppointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12222222',
    });

    expect(newAppointment).toHaveProperty('id');
  });

  it('should NOT be able to create two appointments at the same date/time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12222222',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12222222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});