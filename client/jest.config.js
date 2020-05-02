module.exports = {
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['./src/setupTests.js'],
  globals: { __DEV__: false },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!src/**/*.test.{js,jsx}',
    '!src/**/test/**',
    '!src/index.jsx',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.js?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).js?(x)',
  ],
  transform: { '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest' },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^src(.*)$': '<rootDir>/src$1', // parent routes should be places after child routes
  },
};
