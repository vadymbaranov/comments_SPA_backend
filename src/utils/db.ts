// /* eslint-disable max-len */
// import * as dotenv from 'dotenv';
// import * as pg from 'pg';
// import { Sequelize } from 'sequelize';
// // import { createClient } from '@supabase/supabase-js';

// dotenv.config();

// const { SUPABASE_HOST, SUPABASE_PASSWORD } = process.env;

// // const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// // export default supabase;

// const dbName: string = process.env.DB_NAME || '';
// const dbUsername: string = process.env.DB_USERNAME || '';

// // // export const sequelize = new Sequelize(URI);

// if (!SUPABASE_HOST || !SUPABASE_PASSWORD) {
//   throw new Error('Missing Database config');
// }

// eslint-disable-next-line max-len
// export const sequelize = new Sequelize(dbUsername, dbName, SUPABASE_PASSWORD, {
//   host: SUPABASE_HOST,
//   dialect: 'postgres',
//   dialectModule: pg,
// });
