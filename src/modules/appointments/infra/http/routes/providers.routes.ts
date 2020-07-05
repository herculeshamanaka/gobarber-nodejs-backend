import { Router } from 'express';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

// Middleware
import ensureUserAuthenticated from '@modules/users/infra/http/middlewares/ensureUserAuthenticated';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureUserAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
