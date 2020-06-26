import ISendMailtDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailtDTO): Promise<void>;
}
