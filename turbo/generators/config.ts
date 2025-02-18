import type { PlopTypes } from '@turbo/gen'

export default function generator(plop: PlopTypes.NodePlopAPI) {
  plop.setGenerator('package', {
    description: 'Add a new package to the project',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the package?',
      },
    ],
    actions: [
      (answers) => {
        if (
          'name' in answers &&
          typeof answers.name === 'string' &&
          answers.name.startsWith('@repo/')
        ) {
          answers.name = answers.name.replace('@repo/', '')
        }
        return 'Config sanitized'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/package.json',
        templateFile: 'templates/package.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/tsconfig.json',
        templateFile: 'templates/tsconfig.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/eslint.config.js',
        templateFile: 'templates/eslint.config.js.hbs',
      },
    ],
  })
}
