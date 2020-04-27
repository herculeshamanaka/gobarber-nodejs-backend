import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

// Middleware
import ensureUserAuthenticated from '../middlewares/ensureUserAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureUserAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const newAppointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(newAppointment);
});

export default appointmentsRouter;
