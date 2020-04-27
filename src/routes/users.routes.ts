import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatar';

import ensureUserAuthenticated from '../middlewares/ensureUserAuthenticated';

const usersRouter = Router();
const uploadAvatar = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

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
    const UpdateUserAvatar = new UpdateUserAvatarService();

    const user = await UpdateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
