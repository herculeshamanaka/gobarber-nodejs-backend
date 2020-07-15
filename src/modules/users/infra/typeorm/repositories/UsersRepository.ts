import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { id },
    });
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });
    return findUser;
  }

  public async findAllProviders({
    ignored_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (ignored_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(ignored_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const newAppointment = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(newAppointment);
    return newAppointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
