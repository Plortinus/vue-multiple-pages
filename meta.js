module.exports = {
  'prompts': {
    'name': {
      'type': 'string',
      'required': true,
      'message': 'Project name'
    },
    'description': {
      'type': 'string',
      'required': false,
      'message': 'Project description',
      'default': 'A Vue.js project'
    },
    'author': {
      'type': 'string',
      'message': 'Author'
    },
    'less': {
      'type': 'confirm',
      'message': 'Use Less to write css ?'
    },
    'sass': {
      'type': 'confirm',
      'message': 'Use Sass to write css ?'
    }
  },
  'completeMessage': 'To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/Plortinus/vue-multiple-pages'
}
