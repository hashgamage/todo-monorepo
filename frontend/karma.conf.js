reporters: ['progress', 'coverage'],
preprocessors: {
  'src/**/*.ts': ['coverage']
},
coverageReporter: {
  type: 'html',
  dir: 'coverage/'
}