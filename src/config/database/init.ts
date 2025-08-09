/**
 * Database configuration with safe settings for serverless (Vercel) + NeonDB
 */
require('dotenv').config({
  path: `${__dirname}/../../../.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
});

import type { Knex } from 'knex';

const isProduction = process.env.NODE_ENV === 'production';

const config: Knex.Config = {
  client: process.env.DATABASE_DRIVER || 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : undefined
  },
  searchPath: process.env.DATABASE_SCHEMA?.split(',') || ['public'],
  migrations: {
    directory: __dirname + '/../../database/migrations',
  },
  seeds: {
    directory: __dirname + '/../../database/seeders',
  },
  // Pool setting penting untuk serverless
  pool: {
    min: 0,
    max: isProduction ? 1 : 10, // Vercel sebaiknya max 1 koneksi per instance
    idleTimeoutMillis: 500,     // cepat lepas koneksi kalau idle
    createTimeoutMillis: 3000,  // fail cepat kalau koneksi gagal
    acquireTimeoutMillis: 3000, // jangan tunggu terlalu lama
  },
};

module.exports = config;
