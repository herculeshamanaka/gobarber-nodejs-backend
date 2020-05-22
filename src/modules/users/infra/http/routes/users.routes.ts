import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar';

import ensureUserAuthenticated from '@modules/users/infra/http/middlewares/ensureUserAuthenticated';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();
const uploadAvatar = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const usersRepository = new UsersRepository();

  const createUser = new CreateUserService(usersRepository);

  const newUser = await createUser.execute({
    name,
    email,
    password,
  });

  delete newUser.password;

  return response.json(newUser);
});

usersRouter.patch(
  '/avatar',
  ensureUserAuthenticated,
  uploadAvatar.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();

    const UpdateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await UpdateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
