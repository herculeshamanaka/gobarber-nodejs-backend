import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    try {
      const message = await this.client.sendMail({
        from: 'GoBarber Team <team@gobarber.com>',
        to,
        subject: 'Password Recovery',
        text: body,
      });
      console.log('Message sent: %s', message.messagedId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    } catch (error) {
      console.log(error);
    }
  }
}
