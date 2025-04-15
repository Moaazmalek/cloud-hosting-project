import {drizzle} from 'drizzle-orm/postgres-js'
import {migrate} from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import dotenv from 'dotenv'
dotenv.config({path:'.env'})
if(!process.env.DATABASE_URL) {
    console.log('🔴 no database URL')
}
    const migrationClient=postgres(process.env.DATABASE_URL as string,{max:1})
async function main() {

await migrate(drizzle(migrationClient),{
    migrationsFolder:'migrations'
})
 migrationClient.end()
}
main();