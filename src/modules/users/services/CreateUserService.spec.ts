import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHasProvider from '@modules/users/providers/HashProvider/fakes/FakeHasProvider';

import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHasProvider();

    const createNewUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const newUser = await createNewUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(newUser).toHaveProperty('id');
  });

  it('should be able to create a new user with an existing email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHasProvider();

    const createNewUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createNewUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(
      createNewUser.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
