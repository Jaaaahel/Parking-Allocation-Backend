import { config as dotEnv } from 'dotenv';
import { join } from 'path';

import getConfig from '../config';

dotEnv();
const { database } = getConfig();

export default {
  ...database,

  migrations: [join('src', 'database', 'migrations', '*.ts')],
  entities: [join('src', '**', '*.entity.ts')],
  seeders: [join('src', 'database', 'seeders', '*.ts')],

  defaultSeeder: 'RootSeeder',

  cli: {
    migrationsDir: join('src', 'database', 'migrations'),
  },
};
