import handlebars from 'handlebars';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const parsedTemplate = handlebars.compile(template);

    return parsedTemplate(variables);
  }
}

export default FakeMailTemplateProvider;
