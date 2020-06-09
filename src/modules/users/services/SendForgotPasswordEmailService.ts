import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('User does not exists.');
    }

    await this.userTokensRepository.generate(userExists.id);

    this.mailProvider.sendMail(email, 'Password request test');
  }
}

export default SendForgotPasswordEmailService;
