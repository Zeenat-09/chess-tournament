import pg from 'pg';
import {env} from '$env/dynamic/private';
const { Pool } = pg;
const pool = new Pool({connectionString:env.DATABASE_URL});
export const dbPool = pool;
