import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/singlestore/driver';

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);