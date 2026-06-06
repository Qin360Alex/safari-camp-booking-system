/**
 * Drops all public tables so drizzle-kit push can apply a clean schema.
 * Run: pnpm exec tsx --env-file=.env.local scripts/reset-db.ts
 */
import { config } from 'dotenv'
import { Pool } from 'pg'

config({ path: '.env.local' })

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function main() {
  console.log('Resetting public schema (all tables will be dropped)...')
  await pool.query('DROP SCHEMA public CASCADE')
  await pool.query('CREATE SCHEMA public')
  await pool.query('GRANT ALL ON SCHEMA public TO public')
  console.log('Done. Run pnpm db:push next.')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => pool.end())
