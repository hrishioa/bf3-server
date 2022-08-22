import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
const result = dotenv.config({ path: __dirname + '/../../.env' });

if(result.error)
  console.error('ENVIRONMENT FILE LOADING FAILED');

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.BF3_DB_HOST,
  port: parseInt(process.env.BF3_DB_PORT || '5432'),
  username: process.env.BF3_DB_USER_NAME,
  password: process.env.BF3_DB_USER_PW,
  database: process.env.BF3_DB_NAME,
  synchronize: false,
  migrationsRun: true,
  // logging: ['query', 'error'],
  // logger: 'advanced-console',
  entities: [__dirname + '/entities/**/*{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/{*.ts,.js}'],
};

const BF3DataSource = new DataSource(config);

export default BF3DataSource;
