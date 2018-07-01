/* eslint-disable import/no-extraneous-dependencies, no-console */

// native
const fs = require('fs');
const path = require('path');
// external
const YAML = require('yamljs');
const handlebars = require('handlebars');
const glob = require('glob');
// scope
const coco = path.resolve(process.cwd(), 'coco.yml');
const { templates } = YAML.load(coco);
const context = {
  scope: 'coco-template',
  repo: 'nodejs-tsc',
  package: 'nodejs-tsc',
  author: 'huang.jian',
  email: 'hjj491229492@hotmail.com',
  provider: 'github.com',
};

describe('template', () => {
  it('should render standard workflow', () => {
    const reflection = templates
      .reduce(
        (acc, template) =>
          glob.hasMagic(template)
            ? [...acc, ...glob.sync(template)]
            : [...acc, template],
        []
      )
      .map((template) => {
        const hbs = path.resolve(process.cwd(), `${template}.hbs`);
        const code = path.resolve(process.cwd(), template);
        const options = { encoding: 'utf-8' };

        return {
          hbs: fs.readFileSync(hbs, options),
          code: fs.readFileSync(code, options),
        };
      });

    reflection.forEach(({ hbs, code }) => {
      expect(handlebars.compile(hbs)(context)).toEqual(code);
    });
  });
});
