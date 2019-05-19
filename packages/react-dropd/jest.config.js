module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    '\\\\node_modules\\\\',
    '<rootDir>/__tests__/mocks/*',
  ],

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['./node_modules/'],

  // Indicates whether each individual test should be reported during the run
  verbose: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/mocks/fileMock.js',
    '^.+\\.(css|scss)$': '<rootDir>/__tests__/mocks/styleMock.js',
  },
}
