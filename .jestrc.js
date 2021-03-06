module.exports = {
  testRegex: '\\.test\\.js$',
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__testMocks__/fileMock.js',
  },
}
