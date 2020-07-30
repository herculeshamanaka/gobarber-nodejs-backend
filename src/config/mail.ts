interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'hercules@rocketseat.com.br',
      name: 'Hercules da Rocketseat',
    },
  },
} as IMailConfig;
