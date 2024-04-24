import { tap } from 'node:test/reporters';
import { run } from 'node:test';
import process from 'node:process';
import app from '../../config/buildApp.mjs';
import populate from './populate.mjs';
import { startDatabaseConnection } from '../../sequelize/index.mjs';

let server = {};
const setup = async () => {
  await startDatabaseConnection();
  await populate();
  server = app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
};

const basePath = 'src/tests/';
const files = ['auth.e2e.test.mjs'].map((file) => `${basePath}${file}`);

run({ files, setup, concurrency: false })
  .on('test:fail', () => {
    process.exitCode = 1;
  })
  .on('test:stdout', () => {
    process.exitCode = 1;
  })
  .compose(tap)
  .on('end', () => {
    server.close();
  })
  .pipe(process.stdout);
