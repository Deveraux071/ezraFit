/** @type {import('jest').Config} */
const config = {
    verbose: true,
    coverageReporters: [['lcov', {projectRoot: '..'}]]
  };
  
module.exports = config;